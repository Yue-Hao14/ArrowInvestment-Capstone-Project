from flask import Blueprint
from app.models import User, db, Watchlist, Stock, Portfolio
from flask_login import current_user, login_required

portfolio_routes = Blueprint('portfolios', __name__)

@portfolio_routes.route('/')
@login_required
def get_portfolio():
    """
    return user's portoflio info
    """
    portfolio = Portfolio.query.filter(Portfolio.user_id==current_user.id).first()
    return portfolio.to_dict()


@portfolio_routes.route('/', methods=['POST'])
@login_required
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

    portfolio = Portfolio.query.filter(Portfolio.user_id==current_user.id).first()
    return portfolio.to_dict()
