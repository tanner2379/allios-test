## Description

A simple CRUD app using NestJS and Mikro-ORM for the good folks at Allios to review

## Installation
```bash
$ yarn install
```

## Running the app
You will need docker, docker-compose, and whichever docker daemon start script your init system uses, eg: docker-openrc or docker-runit.

Start docker in detached mode. It will download and create a dockerized postgres database automatically.
```bash
$ yarn docker:start:dev:detached
```

Create a mikro-orm schema within the dockerized database
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
Get all names
```bash
$ curl -i -X GET http://localhost:3000/api/v1/names
```

Get paginated names. Change the limit and offset as you see fit.
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"limit": 5, "offset": 0}' http://localhost:3000/api/v1/names
```

Get a name by id. Replace YOUR-ID with the id of the name you want to see
```bash
$ curl -i -X GET http://localhost:3000/api/v1/names/YOUR-ID
```

Create a name. Replace YOUR-NAME with whatever name you want to create.
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"name": "YOUR-NAME"}' http://localhost:3000/api/v1/names/new
```

Edit a name. Replace YOUR-ID with the id of the name you want to change, and NEW-NAME with the name you want to replace the old one
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{"nameId": "YOUR-ID", "name": "NEW-NAME"}' http://localhost:3000/api/v1/names/YOUR-ID/edit
```

Delete a name. Replace YOUR-ID with the id of the name you want to delete
```bash
$ curl -i -X POST -H 'Content-Type: application/json' -d '{}' http://localhost:3000/api/v1/names/YOUR-ID
```
