/**
 * Allows backend to be transpiled without packing modules from node_modules.
 */

import fs from 'fs';

const externals = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    externals[mod] = `commonjs ${mod}`;
  });

export default externals;
