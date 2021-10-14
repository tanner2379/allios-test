## Description

A simple CRUD app using NestJS and Mikro-ORM for the good folks at Allios to review

## Installation
use the equivalent npm commands if you wish, but for sake of brevity, this README will use yarn.
```bash
$ git clone https://github.com/tanner2379/allios-test
$ cd allios-test
$ yarn install
```

## Running the app
You will need docker, docker-compose, and whichever docker daemon start script your init system uses, eg: docker-openrc or docker-runit. This service will need to be running before the next step.

Start docker in detached mode. It will download and create a dockerized postgres database automatically.
```bash
$ yarn docker:start:dev:detached
```

Create a mikro-orm schema within the dockerized database. The docker image you started in the previous step might take a bit to spin up, so if you get a "MikroORM failed to connect to database" error, give the docker container a bit more time.
```bash
$ NODE_ENV=development yarn mikro-orm schema:create --run --fk-checks
```

Start the app
```bash
$ yarn start
```

## Test

```bash
$ yarn jest
```

## Use
In this example, I am using the curl utility to make http requests, but feel free to use any http request utility you are comfortable with.

Get all names
(Make a GET request to http://localhost:3000/api/v1/names)
```bash
$ curl -i -X GET http://localhost:3000/api/v1/names
```

Get paginated names. Change the limit and offset as you see fit.
(Make a POST request with the 'Content-Type: application/json' header and pass a JSON in the format {limit: number, offset: number} to http://localhost:3000/api/v1/names)
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"limit": 5, "offset": 0}' http://localhost:3000/api/v1/names
```

Get a name by id. Replace YOUR-ID with the id of the name you want to see.
(Make a GET request to http://localhost:3000/api/v1/names/YOUR-ID)
```bash
$ curl -i -X GET http://localhost:3000/api/v1/names/YOUR-ID
```

Create a name. Replace YOUR-NAME with whatever name you want to create.
(Make a POST request with the 'Content-Type: application/json' header and pass a JSON in the format {name: string} to http://localhost:3000/api/v1/names/new)
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "YOUR-NAME"}' http://localhost:3000/api/v1/names/new
```

Edit a name. Replace YOUR-ID with the id of the name you want to change, and NEW-NAME with the name you want to replace the old one.
(Make a POST request with the 'Content-Type: application/json' header and pass a JSON in the format {nameId: number, name: string} to http://localhost:3000/api/v1/names/YOUR-ID/edit)
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"nameId": "YOUR-ID", "name": "NEW-NAME"}' http://localhost:3000/api/v1/names/YOUR-ID/edit
```

Delete a name. Replace YOUR-ID with the id of the name you want to delete.
(Make a POST request to http://localhost:3000/api/v1/names/YOUR-ID)
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{}' http://localhost:3000/api/v1/names/YOUR-ID
```
