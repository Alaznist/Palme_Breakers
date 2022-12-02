# Build step #1: build the React front end
FROM node:lts-alpine as build-step
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json  ./
COPY package-lock.json ./
COPY ./src ./src
COPY ./assets ./assets
COPY tsconfig.json ./
COPY webpack.config.js ./
RUN npm install
RUN npm run build

# Build step #2: build an http-server
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN npm install -g http-server

COPY --from=build-step /app/dist /app
WORKDIR /app

CMD ["http-server", "-s"]