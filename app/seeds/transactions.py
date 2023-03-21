from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

# seed transactions data

def seed_transactions():
    transactions = [
        {'user_id': 1, 'stock_id': 3, 'quantity': 30, 'settled_price': 120.95, 'type': 'buy',},
        {'user_id': 1, 'stock_id': 1, 'quantity': 20, 'settled_price': 125.02, 'type': 'buy',},
        {'user_id': 1, 'stock_id': 2, 'quantity': 10, 'settled_price': 188.77, 'type': 'buy', },
        {'user_id': 1, 'stock_id': 1, 'quantity': -5, 'settled_price': 145.31, 'type': 'sell',},
        {'user_id': 1, 'stock_id': 4, 'quantity': 5, 'settled_price': 305.79, 'type': 'buy'},
        {'user_id': 4, 'stock_id': 24, 'quantity': 18, 'settled_price': 38.41, 'type': 'buy', },
        {'user_id': 4, 'stock_id': 9, 'quantity': 15, 'settled_price': 94.71, 'type': 'buy', },
        {'user_id': 4, 'stock_id': 24, 'quantity': -10, 'settled_price': 35.62, 'type': 'sell', },
        {'user_id': 4, 'stock_id': 9, 'quantity': -5, 'settled_price': 115.19, 'type': 'sell', },
    ]

    for transaction in transactions:
        db.session.add(Transaction(
            user_id = transaction['user_id'],
            stock_id = transaction['stock_id'],
            quantity = transaction['quantity'],
            settled_price = transaction['settled_price'],
            type = transaction['type'],
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
