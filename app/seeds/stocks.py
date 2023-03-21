from app.models import db, Stock, environment, SCHEMA
from sqlalchemy.sql import text

# seed stocks data

def seed_stocks():
    AAPL = Stock(ticker = 'AAPL', company_name = 'Apple Inc.')
    META = Stock(ticker = 'META', company_name = 'Meta Platforms, Inc.')
    AMZN = Stock(ticker = 'AMZN', company_name = 'Amazon.com, Inc.')
    NFLX = Stock(ticker = 'NFLX', company_name = 'Netflix, Inc.')
    GOOG = Stock(ticker = 'GOOG', company_name = 'Alphabet Inc.')
    TSLA = Stock(ticker = 'TSLA', company_name = 'Tesla, Inc')
    MSFT = Stock(ticker = 'MSFT', company_name = 'Microsoft Corporation')
    NVDA = Stock(ticker = 'NVDA', company_name = 'NVIDIA Corporation')
    BABA = Stock(ticker = 'BABA', company_name = 'Alibaba Group Holding Limited')
    CRM = Stock(ticker = 'CRM', company_name = 'Salesforce, Inc.')
    AMD = Stock(ticker = 'AMD', company_name = 'Advanced Micro Devices, Inc.')
    INTC = Stock(ticker = 'INTC', company_name = 'Intel Corporation')
    PYPL = Stock(ticker = 'PYPL', company_name = 'PayPal Holdings, Inc.')
    ZG = Stock(ticker = 'ZG', company_name = 'Zillow Group, Inc.')
    YELP = Stock(ticker = 'YELP', company_name = 'Yelp Inc.')

    GME = Stock(ticker = 'GME', company_name = 'GameStop Corp.')
    AMC = Stock(ticker = 'AMC', company_name = 'AMC Entertainment Holdings, Inc.')
    BBBY = Stock(ticker = 'BBBY', company_name = 'Bed Bath & Beyond Inc.')
    PLTR = Stock(ticker = 'PLTR', company_name = 'Palantir Technologies Inc.')
    BB = Stock(ticker = 'BB', company_name = 'BlackBerry Limited')
    NOK = Stock(ticker = 'NOK', company_name = 'Nokia Oyj')
    SPCE = Stock(ticker = 'SPCE', company_name = 'Virgin Galactic Holdings, Inc.')

    JPM = Stock(ticker = 'JPM', company_name = 'JPMorgan Chase & Co.')
    BAC = Stock(ticker = 'BAC', company_name = 'Bank of America Corporation')
    WFC_PQ = Stock(ticker = 'WFC-PQ', company_name = 'Wells Fargo & Company')
    MS = Stock(ticker = 'MS', company_name = 'Morgan Stanley')
    HSBC = Stock(ticker = 'HSBC', company_name = 'HSBC Holdings plc')
    RY = Stock(ticker = 'RY', company_name = 'Royal Bank of Canada')
    SCHW = Stock(ticker = 'SCHW', company_name = 'The Charles Schwab Corporation')
    GS = Stock(ticker = 'GS', company_name = 'The Goldman Sachs Group, Inc.')
    TD = Stock(ticker = 'TD', company_name = 'The Toronto-Dominion Bank	')
    UBS = Stock(ticker = 'UBS', company_name = 'UBS Group AG')
    BCS = Stock(ticker = 'BCS', company_name = 'Barclays PLC')
    CS = Stock(ticker = 'CS', company_name = 'Credit Suisse Group AG')
    AFRM = Stock(ticker = 'AFRM', company_name = 'Affirm Holdings, Inc.')

    db.session.add_all([AAPL,META,AMZN,NFLX,GOOG,TSLA,MSFT,NVDA,BABA,CRM,AMD,INTC,PYPL,ZG,YELP])
    db.session.add_all([GME,AMC, BBBY, PLTR, BB, NOK, SPCE])
    db.session.add_all([JPM,BAC,WFC_PQ,MS,HSBC,RY,SCHW,GS,TD,UBS,BCS,CS,AFRM])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stocks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stocks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stocks"))

    db.session.commit()
