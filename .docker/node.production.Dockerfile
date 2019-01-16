FROM node:10.13-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["server.js", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./dist/", "./"]

RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 3000

CMD npm start
