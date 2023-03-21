from app.models import db, Portfolio, environment, SCHEMA
from sqlalchemy.sql import text

# seed watchlists data

def seed_portfolios():
    demo_portfolio = Portfolio(
        user_id = 1,
        portfolio_name = 'Overall',
        sub_portfolio=False,
    )
    john_portfolio = Portfolio(
        user_id = 2,
        portfolio_name = 'Overall',
        sub_portfolio=False,
    )
    jane_portfolio = Portfolio(
        user_id = 3,
        portfolio_name = 'Overall',
        sub_portfolio=False,
    )
    yue_portfolio = Portfolio(
        user_id = 4,
        portfolio_name = 'Overall',
        sub_portfolio=False,
    )

    db.session.add_all([demo_portfolio,john_portfolio,jane_portfolio, yue_portfolio])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_portfolios():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.portfolios RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM portfolios"))

    db.session.commit()
