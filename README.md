Docker - Mongoose (WIP)
=======================
> A quick start setup for a docker based developer environment for an application using Mongoose, and optionally GraphQL.

### Getting Started
1. Make sure you have the latest version of [Docker](https://www.docker.com/products/docker) installed.
2. Copy `env/local.env.example` to `env/local.env` and fill in the appropriate fields. (This will come into play as this framework grows)
3. From root, run `docker-compose up`.
4. Visit `localhost:3000` and enjoy.

### Things still working on
1. Framework in general, eventually one could drop a folder under app with a certain folder structure and it would just plug that service into the application.
2. Testing harness and automation for better CI and regression testing.
3. Extent??? This should be a simple example of how to setup an application and not include too much. GraphQL may not need to be a part of it but I would like to include it as an example. So I may need a simple index page as an example and one or two GraphQL routes.
