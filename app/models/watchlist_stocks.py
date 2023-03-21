from .db import db, environment, SCHEMA, add_prefix_for_prod

watchlist_stocks = db.Table('watchlist_stocks',
  db.Column('watchlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod("watchlists.id"))),
  db.Column('stock_id', db.Integer, db.ForeignKey(add_prefix_for_prod("stocks.ticker")))
)

if environment == "production":
    watchlist_stocks.schema = SCHEMA
