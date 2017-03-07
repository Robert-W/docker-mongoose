Docker - Mongoose (Poc)
=======================
> A quick start setup for a docker based developer environment for an application using Mongoose, and optionally GraphQL as a proof of concept.

## OFFICIAL-REPO AVAILABLE AT [https://github.com/Robert-W/mern-kit](https://github.com/Robert-W/mern-kit)
The above URL will be the stable version of this repo as the Poc phase is coming to a close. It has better documentation, features, plus the latest versions of all the tools and nodejs itself.  It will be updated very soon with Jest tests and other enhancements, including some updated GraphQL code.  This repo will be docommissioned in the near future (End of March '17).

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
1. See [TODOS](https://github.com/Robert-W/docker-mongoose/issues/1)
