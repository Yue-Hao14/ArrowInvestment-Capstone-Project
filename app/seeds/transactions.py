from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

# seed transactions data

def seed_transactions():
    transaction_1 = Transaction(
        user_id = 1,
        stock_id = 1,
        quantity = 20,
        settled_price = 125.02
        date = '2023-01-05'
    )
    

    db.session.add_all([])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
