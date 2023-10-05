const sortBy = require('lodash/sortBy');
const fg = require('fast-glob');

const paintingImagePaths = fg.sync(['**/src/assets/images/paintings/*']);
/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return projects.reverse();
};

const getPaintings = collection => {
  let paintingImagesOutput = [];
  const sortedImagePaths = sortBy(paintingImagePaths);

  for (let path of sortedImagePaths) {
    const link = path.replace('src/assets/images/paintings/', '').replace(/@\dx\..*/, '');
    const name = link.replace(/\d+-/, '');
    paintingImagesOutput.push({ path, name, link });
  }
  
  return paintingImagesOutput.reverse();
}

module.exports = {
  getAllPosts,
  getPaintings,
};
