/*
* Redirect rules
*/

const homepageRedirects = [
  '/some-unwanted-path',
  '/another-unwanted-path'
];

export default (app) => {
  app.get('*', (req, res, next) => {
    const redirectToHomepage = homepageRedirects.find(x => x.match(new RegExp(`^${req.path}$`)));
    if (redirectToHomepage) {
      res.redirect(301, '/');
    }
    else {
      next();
    }
  });
};
