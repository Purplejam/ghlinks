FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN ls

RUN npm install

COPY . .

RUN npm run build

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "build/run.js"]
