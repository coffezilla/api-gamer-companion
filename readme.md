# Boilerplate

This is a boilerplate for MongoDB + Nodejs api project. This is a simple structure to set everything organized in one single repository.

## Features

-   Docker
-   MongoDB (Docker)
-   NodeJS (Docker)
-   React Native
-   React JS

## Folder structure

-   api: Backend content. This is the root for the endpoint. It can be hosted.
-   react-app: Frontend React JS app.
-   app: Frontend React Native app.

## Dev notes

### Docker config

First of all, create a .env file in the root of the project. This is important if you wanna run the API locally inside the Docker container.

Fill the variables with data:

```dot
CONTAINER_PREFIX=mongo-api
MONGO_USER=admin
MONGO_PASS=admin
MONGO_PORT=27017
EXPRESS_PORT=8081
```

-   `CONTAINER_PREFIX`: The prefix of the container in the Docker
-   `MONGO_USER` / `MONGO_PASS`: Respectively the user and password of the mongo db inside the Docker container.
-   `MONGO_PORT`: The port of the mongoDB.
-   `EXPRESS_PORT`: The port of the Express.

Add another .env file inside the `/api/v1/` folder. This should contain important variables for the NodeJS API.

```dot
DB_CONNECTION=mongodb://admin:admin@localhost:27017
AUTH=123
```

-   `DB_CONNECTION`: The uri for the connection. By default your DB will be set to `test`.
-   `AUTH`: Just a simple token for authentication. For production you probably should implement this using another method.

### Heroku config

Inside the `/api` folder you will find a `Procfile`. This file is essencial for the Heroku in order to run a command inside de Heroku container.

### Running the Docker container

Everything set, go to the root and run `docker-compose up`. This will set your Docker container with MongoDB and NodeJS running locally.

**MAKE SURE YOU HAVE DOCKER INSTALLED!!!**

### Insomnia Rest

I recommend you to get the Insomnia rest app to fill your workflow. If you're running the insomnia, import the `insomnia_enpoints.json` inside de `support` folder to get all the endpoint samples.

### Showtime

Now you have a Docker container running, you can go to the `/api/v1/` folder and start coding your new API.

In order to run the api locally, just go to the terminal and run `npm start`.
The command will run your config file in the `package.json`.

```json
	...
	"scripts": {
		"start": "nodemon app.js"
	},
	...
```
