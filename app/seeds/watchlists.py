from app.models import db, Watchlist, environment, SCHEMA
from sqlalchemy.sql import text

# seed watchlists data

def seed_watchlists():
    demo_meme_stocks = Watchlist(
        list_name = 'Meme Stocks',
        user_id = 1
    )
    demo_faang_stocks = Watchlist(
        list_name = 'FAANG Stocks',
        user_id = 1
    )
    faang_stocks = Watchlist(
        list_name = 'FAANG Stocks',
        user_id = 2
    )
    bank_stocks = Watchlist(
        list_name = 'Banks',
        user_id = 3
    )
    tech_stocks = Watchlist(
        list_name = 'Tech',
        user_id = 4
    )

    db.session.add_all([demo_meme_stocks, demo_faang_stocks, faang_stocks, bank_stocks, tech_stocks])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlists"))

    db.session.commit()
