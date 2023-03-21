from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class PortfolioValue(db.Model):
    __tablename__ = 'portfolio_values'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    eod_balance = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, default=datetime.now(tz=None), nullable=False)

    portfolio = db.relationship('Portfolio', back_populates="values")

    def to_dict(self):
        return {
            'id': self.id,
            'portfolio_id': self.portfolio_id,
            'eod_balance': self.eod_balance,
            'date': self.date,
            'portfolio': self.portfolio.to_dict(),
        }
