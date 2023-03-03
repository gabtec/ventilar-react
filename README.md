# Ventilar React App

It will consume a backend API

## Local Deploy

Setup a '.env' file with this variable
that represents the api base url

```sh
VITE_API_URL=http://localhost:3002/api
```

## Build a docker image

```sh
$ npm run build

// internally the script uses ...
$ NODE_ENV=docker vite build
// like this vite will get the content of .env.docker instead of .env.production
```

The resulting docker image will receive the API URL as a parameter.
In order to setup that use case:

1. Setup a '.env.docker' file with this variable

```sh
VITE_API_URL=VITE_API_URL_PLACEHOLDER
```

Since a react app after build process, is a static webpage, it cannot recompile dynamic variables.

The solution was to prepare the docker image with a placehorder and a script.
The user defines a docker env variable, and when the container is build from image, the script will replace the static content of
"VITE_API_URL_PLACEHOLDER" with the API_URL variable value.

example:

```yaml
---
version: '3'

services:
  app:
    image: reg.gabtec.pt/xgeeks/ventilar-app:latest
    container_name: ventilar-app-react
    ports:
      - 8088:80
    environment:
      # do not use quotes like this - API_URL="some-api-url",
      - API_URL=some-api-url
      # if you prefer you can use
      #API_URL: "some-api-url"
```

Enjoy!
