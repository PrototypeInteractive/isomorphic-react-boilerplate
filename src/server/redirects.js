/*
* Redirect rules
*/

export default (app) => {
  [
    '/some-unwanted-path',
    '/another-unwanted-path'
  ]
    .forEach((url) => {
      app.get(url, (req, res) => {
        res.redirect(301, '/');
      });
    });
};
