from app.models import db, CashTransfer, environment, SCHEMA
from sqlalchemy.sql import text


# seed cash_transfers data
def seed_cash_transfers():
    cash_transfer_1 = CashTransfer(
        user_id = ,
        portfolio_id = ,
        type = ,
        amount = ,
        date = 
    )

    db.session.add_all([demo, John_Smith,Jane_Doe,Yue_Hao])
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
