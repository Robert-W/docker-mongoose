Docker - Mongoose (WIP)
=======================
> A quick start setup for a docker based developer environment for an application using Mongoose, and optionally GraphQL.

### Getting Started
1. Make sure you have the latest version of [Docker](https://www.docker.com/products/docker) installed.
2. Copy `env/local.env.example` to `env/local.env` and fill in the appropriate fields. (This will come into play as this framework grows)
3. From root, run `docker-compose up`.
4. Visit `localhost:3000` and enjoy.

### Running tests
You currently have two options for running tests:

1. If container is already running(via `docker-compose up`), just run `docker-compose exec web npm test`.
2. If the container is not running, you can just run `docker-compose run web npm test`.

### Things still working on
1. Add some mock users to Mongoose, may need a friends property to demonstrate GraphQL
2. Add some client dependencies and modules (React and possibly React Router)
3. Integrate Webpack 2 and Hot Module Replacement
