from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    stock_ticker = db.Column(db.String(40), db.ForeignKey(add_prefix_for_prod("stocks.ticker")), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    settled_price = db.Column(db.Float, nullable=False)
    type = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, default=datetime.now(tz=None), nullable=False)

    user = db.relationship("User", back_populates="transactions")
    stock = db.relationship("Stock", back_populates="transactions")
    portfolio = db.relationship("Portfolio", back_populates="transactions")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "stock_ticker": self.stock_ticker,
            "quantity": self.quantity,
            "settled_price": self.settled_price,
            "type":self.type,
            "date": self.date,
            # "user": self.user.to_dict(),
            # "stock": self.stock.to_dict(),
        }
