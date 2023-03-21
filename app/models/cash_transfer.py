from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class CashTransfer(db.Model):
    __tablename__ = 'cash_transfers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    type = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, default=datetime.now(tz=None), nullable=False)

    user = db.relationship("User", back_populates="cash_transfers")
    portfolio = db.relationship('Portfolio', back_populates="cash_transfers")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "portfolio_id": self.portfolio_id,
            "type": self.type,
            "amount": self.amount,
            "date": self.date,
        }
