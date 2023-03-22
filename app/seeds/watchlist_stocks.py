from app.models import db, Watchlist, Stock, environment, SCHEMA
from sqlalchemy.sql import text


# seed watchlist_stocks table
def seed_watchlist_stocks():
    demo_watchlist = Watchlist.query.filter(Watchlist.user_id == 1).first()
    john_watchlist = Watchlist.query.filter(Watchlist.user_id == 2).first()
    jane_watchlist = Watchlist.query.filter(Watchlist.user_id == 3).first()
    yue_watchlist = Watchlist.query.filter(Watchlist.user_id == 4).first()


    # meme stocks
    stock_16 = Stock.query.get(16)
    stock_17 = Stock.query.get(17)
    stock_18 = Stock.query.get(18)
    # FAANG
    stock_2 = Stock.query.get(2)
    stock_1 = Stock.query.get(1)
    stock_3 = Stock.query.get(3)
    stock_4 = Stock.query.get(4)
    stock_5 = Stock.query.get(5)
    # bank stocks
    stock_23 = Stock.query.get(23)
    stock_24 = Stock.query.get(24)
    stock_25 = Stock.query.get(25)
    # tech stocks
    stock_6 = Stock.query.get(6)
    stock_7 = Stock.query.get(7)
    stock_8 = Stock.query.get(8)
    stock_9 = Stock.query.get(9)

    demo_watchlist.stocks.extend([stock_16, stock_17, stock_18])
    john_watchlist.stocks.extend([stock_2, stock_1, stock_3,stock_4, stock_5])
    jane_watchlist.stocks.extend([stock_23, stock_24, stock_25])
    yue_watchlist.stocks.extend([stock_6,stock_7,stock_8, stock_9])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the watchlist_stocks table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_watchlist_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM watchlist_stocks"))

    db.session.commit()
