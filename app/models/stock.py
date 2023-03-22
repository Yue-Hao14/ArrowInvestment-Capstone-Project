from .db import db, environment, SCHEMA, add_prefix_for_prod
from .watchlist_stocks import watchlist_stocks

class Stock(db.Model):
    __tablename__ = 'stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    ticker = db.Column(db.String(40), primary_key=True, nullable=False, unique=True)
    company_name = db.Column(db.String(255), nullable=False)

    transactions = db.relationship("Transaction", back_populates="stock")
    # portfolios = db.relationship("PortfolioStock", back_populates="stock")
    watchlists = db.relationship("Watchlist", secondary=watchlist_stocks, back_populates="stocks")

    def to_dict(self):
        return {
            "ticker": self.ticker,
            "company_name": self.company_name
        }
