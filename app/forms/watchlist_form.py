from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class WatchlistForm(FlaskForm):
    listName = StringField("Watchlist Name", validators=[DataRequired()])
    userId = IntegerField("User", validators=[DataRequired()])



class WatchlistStockForm(FlaskForm):
    watchlistId = IntegerField("Watchlist ID", validators=[DataRequired()])
    ticker = StringField("Stock Ticker", validators=[DataRequired()])
