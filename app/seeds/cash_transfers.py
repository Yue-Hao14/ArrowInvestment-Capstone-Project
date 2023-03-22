from app.models import db, CashTransfer, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


# seed cash_transfers data
def seed_cash_transfers():
    cash_transfer_1 = CashTransfer(
        user_id = 1,
        portfolio_id = 1,
        type = 'deposit',
        amount = 10000,
        date = datetime(2022,5,1)
    )
    cash_transfer_2 = CashTransfer(
        user_id = 2,
        portfolio_id = 2,
        type = 'deposit',
        amount = 20000,
        date = datetime(2022,10,1)
    )
    cash_transfer_3 = CashTransfer(
        user_id = 3,
        portfolio_id = 3,
        type = 'deposit',
        amount = 50000,
        date = datetime(2022,12,1)
    )
    cash_transfer_4 = CashTransfer(
        user_id = 4,
        portfolio_id = 4,
        type = 'deposit',
        amount = 100000,
        date = datetime(2022,4,1)
    )
    cash_transfer_5 = CashTransfer(
        user_id = 1,
        portfolio_id = 1,
        type = 'withdraw',
        amount = -500,
        date = datetime(2023,3,1)
    )

    db.session.add_all([cash_transfer_1, cash_transfer_2, cash_transfer_3, cash_transfer_4, cash_transfer_5])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the cash_transfers table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_cash_transfers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cash_transfers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cash_transfers"))

    db.session.commit()
