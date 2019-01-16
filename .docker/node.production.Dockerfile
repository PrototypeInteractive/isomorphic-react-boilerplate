FROM node:10.13-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["server.js", "package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install -g pm2@latest
RUN mkdir -p /var/log/pm2

RUN npm install --production --silent && mv node_modules ../

COPY dist/ ./dist/

EXPOSE 3000

# CMD npm start
ENTRYPOINT ["pm2", "start", "server.js","--name","node","--log","/var/log/pm2/pm2.log","--no-daemon"]
