from app.models import db, PortfolioStock, environment, SCHEMA
from sqlalchemy.sql import text


# seed portfolio_stocks table
def seed_portfolio_stocks():
    portfolio_stocks = [
        {'portfolio_id': 1, 'stock_id': 3, 'quantity': 30, },
        {'portfolio_id': 1, 'stock_id': 1, 'quantity': 20, },
        {'portfolio_id': 1, 'stock_id': 2, 'quantity': 10, },
        {'portfolio_id': 1, 'stock_id': 1, 'quantity': -5, },
        {'portfolio_id': 1, 'stock_id': 4, 'quantity': 5, },
        {'portfolio_id': 4, 'stock_id': 24, 'quantity': 18,},
        {'portfolio_id': 4, 'stock_id': 9, 'quantity': 15,},
        {'portfolio_id': 4, 'stock_id': 24, 'quantity': -10},
        {'portfolio_id': 4, 'stock_id': 9, 'quantity': -5,},
    ]

    for portfolio_stock in portfolio_stocks:
        db.session.add(PortfolioStock(
            portfolio_id=portfolio_stock['portfolio_id'],
            stock_id=portfolio_stock['stock_id'],
            quantity=portfolio_stock['quantity']
        ))
    db.session.add_all([])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the portfolio_stocks table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolio_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolio_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolio_stocks"))

    db.session.commit()
