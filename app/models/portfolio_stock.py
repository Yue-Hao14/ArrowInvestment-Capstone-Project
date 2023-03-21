from .db import db, environment, SCHEMA, add_prefix_for_prod

class PortfolioStock(db.Model):
    __tablename__ = 'portfolio_stocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    portfolio_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("portfolios.id")), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.id")), nullable=False)
    quantity = db.Column(db.Float, nullable=False)

    portfolio = db.relationship('Portfolio', back_populates="stocks")
    stock = db.relationship('Stock', back_populates="portfolios")

    def to_dict(self):
        return {
            "id": self.id,
            "portfolio_id": self.portfolio_id,
            "stock_id": self.stock_id,
            "quantity": self.quantity,
        }
