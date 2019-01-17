FROM node:10.13

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY ["server.js", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install nodemon -g

RUN npm install --silent

COPY . .

EXPOSE 3000 9229

CMD npm run dev
