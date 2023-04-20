from flask import Blueprint, session, request
from app.models import User, db, Watchlist, Stock
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import WatchlistForm, WatchlistStockForm

watchlist_routes = Blueprint('watchlists', __name__)


@watchlist_routes.route('/')
@login_required
def get_all_watchlists_names():
    """
    return logged in users' watchlists
    and their corresponding stocks within each watchlist
    """
    return [watchlist.to_dict() for watchlist in current_user.watchlists]


@watchlist_routes.route('/', methods=['POST'])
@login_required
def add_watchlist():
    """
    validate watchlist info via WTForms, add a new watchlist in db,
    and return current user's entire watchlists
    """
    data = request.get_json()
    # print("-------------------data-------------------",data)
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_watchlist = Watchlist(
            list_name=data['listName'],
            user_id=data['userId']
        )

        db.session.add(new_watchlist)
        db.session.commit()
        return [watchlist.to_dict() for watchlist in current_user.watchlists]
    else:
        # return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@watchlist_routes.route('/stock', methods=['POST'])
@login_required
def add_stock_to_watchlist():
    """
    validate stock info via WTForms, add a new stock to watchlist(s) in db,
    and return current user's entire watchlists
    """
    data = request.get_json()
    form = WatchlistStockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    watchlist_id_list = data['watchlistId']
    ticker = data['ticker']

    all_stocks = Stock.query.all()
    # print("-------------------all stocks", all_stocks)


    # add stock to watchlist only if it doesn't already exists there
    for watchlist_id in watchlist_id_list:
        stock = Stock.query.get(ticker)
        print("-------------stock--------------", stock)
        if stock == None:
            new_stock = Stock(ticker = ticker, company_name="null")
            db.session.add(new_stock)
            db.session.commit()

        stock = Stock.query.get(ticker)
        stocks_in_watchlist = Watchlist.query.get(watchlist_id).stocks  # an array of stocks object
        # print("----------stocks_in_watchlist-----------------", stocks_in_watchlist)

        if stock not in stocks_in_watchlist and form.validate_on_submit():
            watchlist = Watchlist.query.get(watchlist_id)
            watchlist.stocks.append(stock)
            db.session.commit()

    return [watchlist.to_dict() for watchlist in current_user.watchlists]


@watchlist_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_watchlist_list_name(id):
    """
    update list_name of the watchlist in db,
    and return current user's entire watchlists
    """

    data = request.get_json()
    # query watchlist from db
    watchlist = Watchlist.query.get(id)
    # update list_name
    watchlist.list_name = data['listName']
    db.session.commit()
    return [watchlist.to_dict() for watchlist in current_user.watchlists]


@watchlist_routes.route('/<int:id>/stock/<ticker>', methods=['DELETE'])
@login_required
def remove_stock_from_watchlist(id, ticker):
    """
    remove a stock from a watchlist in db and return current user's entire watchlists
    """
    watchlist = Watchlist.query.get(id)
    stocks_in_watchlist = watchlist.stocks
    stock = Stock.query.get(ticker)

    # check stock exists in this watchlist
    if stock not in stocks_in_watchlist:
        return {'errors': ['Stock does not exist in this watchlist']}, 401
    else:
        watchlist.stocks.remove(stock)
        db.session.commit()
        return [watchlist.to_dict() for watchlist in current_user.watchlists]


@watchlist_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def remove_watchlist(id):
    """
    remove a watchlist in db and return current user's entire watchlists
    """
    watchlist = Watchlist.query.get(id)

    # check if watchlist exists
    if not watchlist:
        return {'errors': ['Watchlist could not be found']}, 404
    else:
        db.session.delete(watchlist)
        db.session.commit()
        return [watchlist.to_dict() for watchlist in current_user.watchlists]
