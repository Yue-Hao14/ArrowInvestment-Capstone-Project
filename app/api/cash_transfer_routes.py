from flask import Blueprint, session, request
from app.models import User, db, Watchlist, Stock, CashTransfer
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.forms import WatchlistForm, WatchlistStockForm

cash_transfer_routes = Blueprint('cash_transfers', __name__)

@cash_transfer_routes.route('/')
@login_required
def get_all_cash_transfers():
    """
    return all of logged in users' cash transfers
    """
    return [cash_transfer.to_dict() for cash_transfer in current_user.cash_transfers]


@cash_transfer_routes.route('/', methods=['POST'])
@login_required
def add_cash_transfer():
    """
    add a new cash_transfer in db and return all of current user's cash transfers
    """
    # get data from request
    data = request.get_json()
    # create a new instance of CashTransfer model
    new_cash_transfer = CashTransfer(
      user_id = data['userId'],
      portfolio_id = data['portfolioId'],
      type = data['type'],
      amount = data['amount'],
    )
    db.session.add(new_cash_transfer)
    db.session.commit()
    return [cash_transfer.to_dict() for cash_transfer in current_user.cash_transfers]
