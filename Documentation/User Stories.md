# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, first name, last name, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy way to find a clear button on `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on `/login` page:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a splash page displaying information about the application.
      * So that I can easily log out to keep my information secure.


## Watchlist

### Create a watchlist

* As a logged in user, I want to be able to create a watchlist on '/dashboard' page
  * When I'm on the '/dashboard' page:
    * I would like to be able to easily create a new watchlist with a "+" icon
    * I want to be able to name my new watchlist
    * Once the form is submitted, I should see a new watchlist

### Read a watchlist

* As a logged in user, I want to be able to see all my watchlists on '/dashboard' page
  * When I'm on the '/dashboard' page:
    * I would like to see all of my watchlist(s) and stocks in it
    * The stock will show its current price and daily % change

### Update Watchlist
#### Add a stock to watchlist

* As a logged in user, I want to be able to add stocks to any of my watchlist on '/stocks/:ticker' page
  * When I'm on the '/stocks/:ticker' page:
    * I would like to have a "Add to Lists" button
    * Once I click on the button, a modal with all of my watchlists will show up so I can select which watchlist to add this stock to. A "Save Changes" button will allow me to finish adding this stock to certain watchlist(s)
    * Once changes are saved, watchlist will properly reflect recent changes

#### Delete a stock to watchlist

* As a logged in user, I want to be able to remove stocks from any of my watchlist on '/watchlist/:watchlistId' page
  * When I'm on the '/watchlist/:watchlistId' page:
    * I would like to have a "x" button next to each stock
    * Once I click on the button, a modal will show up ask me to confirm if I want to delete this watchlist
    * Once confirmed, watchlist will properly reflect recent changes

### Delete a watchlist

* As a logged in user, I want to be able to delete a watchlist on '/dashboard' page
  * When I'm on the '/dashboard' page:
    * I can click on "..." button next to each watchlist and a drop down menu will show up with a "Delete List" button
    * When I click on "Delete List" button, a modal with confirmaiton message will show up and a "Delete" button
    * Once the delete is confirmed, watchlist section will reflect the change accordingly


## Asset/Stock

### Read a stock

* As a logged in user, I want to be able to view details of a stock on '/stocks/:ticker' page
  * When I'm on the '/stocks/:ticker' page:
    * I want to be able to see stock's current price, daily change in dollar and in percentage, a chart shows 1D, 1W, 1M, 3M, 1Y, 5Y price change views

### Buy a stock

* As a logged in user, I want to be able to buy the stock on '/stocks/:ticker' page
  * When I'm on the '/stocks/:ticker' page:
    * I want to be able to do a market order by inputting # of shares I want to purchase. An estimation of total cost will show up. Then I can buy stock by clicking on "purchase stock" button
    * Once the purchase is done, my portfolio will be updated accordingly

### Sell a stock

* As a logged in user, I want to be able to sell the stock on '/stocks/:ticker' page
  * When I'm on the '/stocks/:ticker' page:
    * I want to be able to do a market order by inputting # of shares I want to sell. An estimation of total cost will show up. Then I can sell stock by clicking on "sell stock" button
    * Once the sell is done, my portfolio will be updated accordingly
