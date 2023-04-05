# Arrow Investment Project

This is a clone of Robinhood trading website.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Landing Page
![Screenshot 2023-04-05 at 2 39 40 PM](https://user-images.githubusercontent.com/105403119/230188564-401c0d1c-07e0-4955-912a-cbcc70c5bdcf.png)

## Stock Details Page
![Screenshot 2023-04-05 at 2 50 50 PM](https://user-images.githubusercontent.com/105403119/230188666-de85e527-18b3-4548-a35d-30fb56344a2e.png)

## Future Implementation 
  * Portfolio value
  * Deposit/withdraw cash to and from portfolio
  * Financial news
  * Chatbot
