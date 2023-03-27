from flask import Blueprint, session, request
from app.models import User, db, Watchlist, Stock, Transaction
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

transaction_routes = Blueprint('transactions', __name__)


@transaction_routes.route('/', methods=['POST'])
@login_required
def create_transaction():
    """
    create a new transaction in db based on user, ticker, portfolio, price, type
    and return current user's transaction history on this ticker
    """
    data = request.get_json()

    new_transaction = Transaction(
        user_id=current_user.id,
        stock_ticker=data['ticker'],
        portfolio_id=data['portfolioId'],
        quantity=data['quantity'],
        settled_price=data['price'],
        type=data['type'],
    )

    db.session.add(new_transaction)
    db.session.commit()
    return [transaction.to_dict() for transaction in current_user.transactions]
