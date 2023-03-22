from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# seed transactions data

def seed_transactions():
    transactions = [
        {'user_id': 1, 'stock_id': 3, 'quantity': 30, 'settled_price': 120.95, 'type': 'buy', 'date': datetime(2022,5,17)},
        {'user_id': 1, 'stock_id': 1, 'quantity': 20, 'settled_price': 125.02, 'type': 'buy', 'date': datetime(2023,1,5)},
        {'user_id': 1, 'stock_id': 2, 'quantity': 10, 'settled_price': 188.77, 'type': 'buy', 'date': datetime(2023,2,2)},
        {'user_id': 1, 'stock_id': 1, 'quantity': -5, 'settled_price': 145.31, 'type': 'sell', 'date': datetime(2023,3,1)},
        {'user_id': 1, 'stock_id': 4, 'quantity': 5, 'settled_price': 305.79, 'type': 'buy', 'date': datetime(2023,3,21)},
        {'user_id': 4, 'stock_id': 24, 'quantity': 18, 'settled_price': 38.41, 'type': 'buy', 'date': datetime(2022,11,11)},
        {'user_id': 4, 'stock_id': 9, 'quantity': 15, 'settled_price': 94.71, 'type': 'buy', 'date': datetime(2022,4,18)},
        {'user_id': 4, 'stock_id': 24, 'quantity': -10, 'settled_price': 35.62, 'type': 'sell', 'date': datetime(2023,2,14)},
        {'user_id': 4, 'stock_id': 9, 'quantity': -5, 'settled_price': 115.19, 'type': 'sell', 'date': datetime(2023,1,17)},
    ]

    for transaction in transactions:
        db.session.add(Transaction(
            user_id = transaction['user_id'],
            stock_id = transaction['stock_id'],
            quantity = transaction['quantity'],
            settled_price = transaction['settled_price'],
            type = transaction['type'],
            date = transaction['date']
        ))

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
