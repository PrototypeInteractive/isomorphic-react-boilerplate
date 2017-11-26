# Minimal React JS Boilerplate

## Description
Unopinionated minimal ReactJS boilerplate.

## Features
- Output self-contained react application without server dependency.
- Alternately, allow serving the application through Node.js Express.
- Uses webpack for packing and transpiling all assets (js, sass, images, etc.).
- Use es2015 and stage 2 proposal syntax for client, server, and webpack configuration code.
- Enable Hot Module Replacement (HMR) for all client assets (js, scss, and images).
- Automatic server reload when any server-related code is modified.
- Sourcemaps for client and server code and stylesheets for easier debugging.
- Fully-configured debugging environment for Visual Studio Code (vscode).
- Ensure consistent coding convention through eslint.
- Isomorphic JavaScript (pending)

## Application contents
- React native application
- Node.js Express server

---

## How to start
How to build, run, or debug the application.

### Prerequisites
- Install Node.js
- Install Nodemon
- Execute `npm init` inside terminal.

### How to start development server
```shell
npm run server
```

This will clean the dist folder, run webpack, and start a web server at http://localhost:3000/. This will support Hot Replacement Module (HMR) for the react client application.

### How to start development server with nodemon
```shell
npm run watch
```
Then from another terminal window, execute:
```shell
npm run nodemon
```

This will clean the dist folder, run webpack, and starts a web server that automatically restarts with updated code if any changes are made. The react client application will also support Hot Replacement Module (HMR).

### How to build for production (with server)
```shell
npm run build:prod
```

This will clean the dist folder and create an optimized react and server builds inside /dist folder. The server files will be inside /dist/server.

### How to build static html files (without server)
```shell
npm run build:static
```

This will clean the dist folder and create an optimized react application inside the /dist/app folder. This build can be run on the browser directly from the file system. To do so, open /dist/app/index.html on the web browser.

---

## Visual Studio Code Debugging
The boilerplate has provisions for debugging the Node.js server using Visual Studio Code.

1. Install **Node Debug 2** from vscode marketplace.
1. Execute the following inside terminal:
```shell
npm run watch
```
2. Open debug view in vscode sidebar and choose **nodemon** from the configuration dropdown.
1. Press **F5** on the keyboard to start the debugging session.

In Visual Studio Code sidebar, open the Debug view and choose **nodemon** from the configuration dropdown. Press **F5** on the keyboard to start the debugging session.

This configuration will automatically restart the Node.js Express server when code changes are made in /src/server while still enabling breakpoints and debugging through Visual Studio Code. In addition to this, code changes made in /src/app will trigger Hot Module Reloading (HMR) updates in the client application.

---

## Deployment

### Amazon Web Services (AWS)
1. run `eb init`
1. pending...

Make sure the correct environment variables are set up
| Variable Name | Values                           | Purpose                                   |
| ------------- | -------------------------------- | ----------------------------------------- |
| NODE_ENV      | development, staging, production | Changes the behavior of the webserver     |
| AUTH_USER     | prototype, *                     | User name used when accessing the website |
| AUTH_PASS     | prototype, *                     | Password used when accessing the website  |

---

## Technologies
- Node.js
- Express
- SASS (SCSS)
- Bootstrap
- React
- React-Router
- JSX
- ES6
- Babel
- Webpack
- Nodemon
- Gulp???
