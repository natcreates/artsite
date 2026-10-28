import sortBy from 'lodash/sortBy.js';
import fg from 'fast-glob';

const paintingImagePaths = fg.sync(['**/src/assets/images/paintings/*']);

/** Returns all blog posts as a collection. */
export const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return projects.reverse();
};

export const getPaintings = () => {
  let paintingImagesOutput = [];
  const sortedImagePaths = sortBy(paintingImagePaths);

  for (let path of sortedImagePaths) {
    const link = path.replace('src/assets/images/paintings/', '').replace(/@\dx\..*/, '');
    const name = link.replace(/\d+-/, '');
    paintingImagesOutput.push({path, name, link});
  }

  return paintingImagesOutput.reverse();
};
