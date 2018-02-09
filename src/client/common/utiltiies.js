const Utilities = {
  getLabels: (labels, culture) => {
    const result = {};

    Object.keys(labels).forEach(key => {
      result[key] = labels[key][culture];
    });

    return result;
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
