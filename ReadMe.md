# Minimal React JS Boilerplate

## Description
Isomorphic Node.js + Express + ReactJS boilerplate.

### Features
- Uses Node.js Express for serving the web application.
- Uses webpack for packing and transpiling all assets (js, sass, images, etc.).
- Uses `@babel/preset-env` syntax for client, server, and webpack configuration.
- Enable Hot Module Replacement (HMR) for all client assets (js, scss, and images).
- Automatic server reload when any server-related code is modified.
- Sourcemaps for client, server, and stylesheets for easier debugging.
- Fully-configured debugging environment for Visual Studio Code (vscode).
- Ensure consistent coding convention through eslint.
- Redux for global state management
- Built-in react-router configuration for single-page-application (SPA) navigation
- URL and text localization
- RTL stylesheet support without the need for mixins
- Server-side rendering (isomorphic JavaScript) of client website.

## Quick Start

Install Prerequisites
- Install Node.js (>= v8.14.0)
- Install Nodemon by executing `npm install nodemon -g`

Execute the following in the terminal/command line:
```
npm install
npm run dev
```

## How to start development server
`npm run dev`

This will clean the dist folder, run webpack, and start a web server at http://localhost:8080/. This will support Hot Replacement Module (HMR) for the react client application. This also automatically restarts the web server if any changes are made in the server source code.

## How to build files for production (with server)
`npm run prod`

This will clean the dist folder and create an optimized react and server builds inside /dist folder. The server files will be inside /dist/server.
Also a `prod-bundle-stats.html` file will be created in the project root, this file shows an analysis for what included in the bundle

## Visual Studio Code Debugging
The boilerplate has provisions for debugging the Node.js server using Visual Studio Code. Note that **Node Debug 2** extension must be installed from vscode marketplace.

1. Execute the following inside terminal:
`npm run debug`
1. Open debug view in vscode sidebar and choose **Nodemon** from the configuration dropdown.
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

## Issues
1. Redux's `connect(...)` HoC is preventing `react-router` from updating the view upon location change. To work around this issue, wrap the element using `withRouter(...)` to forcibly update the view. [Reference](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)

## Technologies
- Node.js
- Express
- SASS (SCSS)
- PostCSS
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


# Pending
- mixins vs postcss-rtl (issue with postcss rtl:ignore rule not functioning as expected sometimes)
