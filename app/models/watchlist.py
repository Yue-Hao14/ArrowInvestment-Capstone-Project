from .db import db, environment, SCHEMA, add_prefix_for_prod

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    list_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("User", back_populates="watchlists")

    def to_dict(self):
        return {
            "id": self.id,
            "list_name": self.list_name,
            "user_id": self.user_id,
            "user": self.user.to_dict()
        }
