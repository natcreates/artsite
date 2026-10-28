import crypto from 'node:crypto';
import fs from 'node:fs';
import fg from 'fast-glob';

/** Short hash of a set of source files, so an asset URL only changes when the asset does. */
const hashOf = pattern => {
  const hash = crypto.createHash('sha1');

  for (const file of fg.sync(pattern).sort()) {
    hash.update(fs.readFileSync(file));
  }

  return hash.digest('hex').slice(0, 8);
};

export default {
  cssHash: hashOf('src/assets/css/**/*.css'),
  jsHash: hashOf('src/assets/scripts/**/*.js')
};
