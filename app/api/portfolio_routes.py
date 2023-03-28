from flask import Blueprint, session, request
from app.models import User, db, Watchlist, Stock, Portfolio
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import WatchlistForm, WatchlistStockForm

portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('/', methods=['POST'])
def create_portfolio():
    """
    create a portfolio in db for each new user,
    return current user's portfolio info
    """
    new_portfolio = Portfolio (
        user_id=current_user.id,
        portfolio_name='Overall',
        sub_portfolio=False,
    )
    db.session.add(new_portfolio)
    db.session.commit()

    portfolio = Portfolio.query.filter(Portfolio.user_id==current_user.id)
    print("---------", portfolio)
    return portfolio
