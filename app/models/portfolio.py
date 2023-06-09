from .db import db, environment, SCHEMA, add_prefix_for_prod

class Portfolio(db.Model):
    __tablename__ = 'portfolios'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    portfolio_name = db.Column(db.String, nullable=False)
    sub_portfolio = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="portfolios")
    # values = db.relationship("PortfolioValue", back_populates="portfolio")
    # stocks = db.relationship("PortfolioStock", back_populates="portfolio")
    transactions = db.relationship("Transaction", back_populates="portfolio")
    cash_transfers = db.relationship("CashTransfer", back_populates="portfolio")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'portfolio_name': self.portfolio_name,
            'sub_portfolio': self.sub_portfolio,
        }
