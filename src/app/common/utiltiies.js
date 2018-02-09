const Utilities = {
  getLabels: culture => {
    const labels = {};

    Object.keys(Labels).forEach(key => {
      labels[key] = Labels[key][culture];
    });

    return labels;
  },
  getCultureInfo: () => ({
    lang: (document.documentElement.lang || '').trim() || 'en',
    dir: (document.documentElement.dir || '').trim() || 'ltr'
  }),
  cleanUrl: (url) => {
    let result = url;
    result = result.replace(/\/\//g, '/');
    result = result.replace(/\/+$/, '');

    return result;
  }
};

export default Utilities;
