# Backend Challenge 🏅 2022 - Covid Daily Cases
## This is a challenge by Coodesh

API created for processing covid cases data from [kaggle 'Omicron daily cases by country (COVID-19 variant)'](https://www.kaggle.com/datasets/yamqwe/omicron-covid19-variant-daily-cases). Downloaded in 01/04/2022.



## Utilized languages:
<div align="center"}>
  <img align="center" height="70px" src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" />
  <img align="center" height="70px" src="https://cdn.worldvectorlogo.com/logos/typescript.svg" />
  <img align="center" height="70px" src="https://cdn.worldvectorlogo.com/logos/nodejs-1.svg" />
  <img align="center" height="70px" src="https://cdn.worldvectorlogo.com/logos/heroku-1.svg" />
  <img align="center" height="70px" src="https://cdn.worldvectorlogo.com/logos/git.svg" />
</div>



## Prerequisites:
To run the project you will need to have installed the following tools: Gitbash, Node.js, Typescript e o VSCode(or similar IDE).



## How to run the project with Gitbash:

```bash
# Clone the repository:
$ git clone https://github.com/allan-gilber/backend-challenge-2022-covid-daily-cases.git

# Run gitbash on the folder that was created
$ cd ./covid-daily-cases

# Install the necessary dependencies with:
$ npm i

# Config your local variables in a .env file in the root directory of the project 
# so you can connect to your MYSQL database(more info below)
# After configuring the access, run the script to create and populate your DB:
$ npm run migrations

# To start the project as a dev without transpiling to JavaScript use the following command:
$ npm run dev-start

# OR if you want to transpile all files to JavaScript before running, use the following command:
$ npm start

# The server will start on the configured port in the .env file or the default "3003".
```



## .ENV - IMPORTANT
Don't forget to config the local variables in a ".env" file located in the root folder of the project. Just create a new file named ".env" and insert the following text, substituting with your information:
```
DB_HOST = (link to your host)
DB_USER = (user)
DB_PASSWORD = (password)
DB_SCHEMA = (database/schema)
```



## API documentation


All information on how to use the API can be found <a href="https://documenter.getpostman.com/view/17593079/UVyuTFeD" target="_blank">here</a>.
