FROM node:20-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

EXPOSE 8080

CMD ["npx", "webpack-cli", "serve", "--mode", "development"]
