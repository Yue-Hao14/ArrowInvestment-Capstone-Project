# Arrow Investment Project

This is a clone of Robinhood trading website.

Link: [Arrow Investment](https://arrowinvestment.onrender.com/)

## Wiki links:
  * [Database schema](https://github.com/Yue-Hao14/ArrowInvestment-Capstone-Project/blob/main/Documentation/DB%20Schema.png)
  * [Feature list](https://github.com/Yue-Hao14/ArrowInvestment-Capstone-Project/blob/main/Documentation/Feature%20List.md)
  * [User Stories](https://github.com/Yue-Hao14/ArrowInvestment-Capstone-Project/blob/main/Documentation/User%20Stories.md)

## Tech Stack
### Back-end:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Front-end:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Hosting:
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

## Landing Page
![Screenshot 2023-04-05 at 2 39 40 PM](https://user-images.githubusercontent.com/105403119/230188564-401c0d1c-07e0-4955-912a-cbcc70c5bdcf.png)

## Stock Details Page
![Screenshot 2023-04-05 at 2 17 13 PM](https://user-images.githubusercontent.com/105403119/230189396-9b43be84-2a2c-4f7f-805e-db50234758ae.png)

## Future Implementation 
  * Portfolio value
  * Chatbot
 
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
