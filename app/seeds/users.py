from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoDemo',
        first_name = 'Demo',
        last_name = 'Demo',
        email='demo@aa.io',
        password='password'
    )
    John_Smith = User(
        username='JohnSmith',
        first_name='John',
        last_name='Smith',
        email='johnsmith@aa.io',
        password='password'
    )
    Jane_Doe = User(
        username='JaneDoe',
        first_name='Jane',
        last_name='Doe',
        email='janedoe@aa.io',
        password='password',
    )
    Yue_Hao = User(
        username="YueHao",
        first_name='Yue',
        last_name='Hao',
        email='yuehao@aa.io',
        password='password',
    )

    db.session.add_all([demo, John_Smith,Jane_Doe,Yue_Hao])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
