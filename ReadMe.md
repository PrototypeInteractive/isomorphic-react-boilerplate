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
- Redux for global state management
- Built-in router for URL management
- URL and text localization
- Isomorphic JavaScript (pending)

## Application contents
- React native application
- Node.js Express server

## How to start
How to build, run, or debug the application.

### Prerequisites
- Install Node.js
- Install Nodemon by executing `npm install nodemon -g`

### Quick Start
Execute the following in the terminal/command line:
- `npm install`
- `npm run dev`

### How to start development server
`npm run dev`

This will clean the dist folder, run webpack, and start a web server at http://localhost:8080/. This will support Hot Replacement Module (HMR) for the react client application. This also automatically restarts the web server if any changes are made in the server source code.

### How to build files for production (with server)
`npm run prod`

This will clean the dist folder and create an optimized react and server builds inside /dist folder. The server files will be inside /dist/server.
Also a `prod-bundle-stats.html` file will be created in the project root, this file shows an analysis for what included in the bundle
### How to build static html files (without server)
`npm run static`

This will clean the dist folder and create an optimized react application inside the /dist/client folder. This build can be run on the browser directly from the file system. To do so, open /dist/client/index.html on the web browser.
Also a `static-bundle-stats.html` file will be created in the project root, this file shows an analysis for what included in the bundle

## Visual Studio Code Debugging
The boilerplate has provisions for debugging the Node.js server using Visual Studio Code. Note that **Node Debug 2** extension must be installed from vscode marketplace.

1. Execute the following inside terminal:
`npm run debug`
2. Open debug view in vscode sidebar and choose **Nodemon** from the configuration dropdown.
1. Press **F5** on the keyboard to start the debugging session

This configuration will attach the vscode debugger to the running node express server. Any changes to /src/server will automatically restart the web server and any breakpoints set in JavaScript files under this directory will cause vscode to pause execution. At the same time, any changes to /src/client files will automatically trigger the Hot Module Reloading (HMR) in ReactJS and update the relevant components in the client application.

Note though that in this approach, the debugger is attached after the server has already initailized once. If there are errors in the server initialization, the web application will crash before any breakpoints are hit. In scenarios like this, it is better to use Option 2.

## Deployment

### Amazon Web Services (AWS)
1. Run `eb init`
1. Choose the correct environment
1. Run `eb deploy`

Make sure the correct environment variables are set up

| Variable Name | Values                           | Purpose                                   |
| ------------- | -------------------------------- | ----------------------------------------- |
| NODE_ENV      | development, staging, production | Changes the behavior of the webserver     |
| AUTH_USER     | prototype                        | User name used when accessing the website |
| AUTH_PASS     | prototype                        | Password used when accessing the website  |



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
- Hot Module Replacement (HMR)
- Redux
- Router
- Helmet
