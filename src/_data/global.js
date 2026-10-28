const crypto = require('node:crypto');
const fs = require('node:fs');
const fg = require('fast-glob');

/** Short hash of a set of source files, so an asset URL only changes when the asset does. */
const hashOf = pattern => {
  const hash = crypto.createHash('sha1');

  for (const file of fg.sync(pattern).sort()) {
    hash.update(fs.readFileSync(file));
  }

  return hash.digest('hex').slice(0, 8);
};

module.exports = {
  cssHash: hashOf('src/assets/css/**/*.css'),
  jsHash: hashOf('src/assets/scripts/**/*.js')
};
