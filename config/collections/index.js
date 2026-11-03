import fg from 'fast-glob';

const paintingImagePaths = fg.sync(['**/src/assets/images/paintings/*']);

/** Returns all blog posts as a collection. */
export const getAllPosts = collection => {
  const projects = collection.getFilteredByGlob('./src/posts/*.md');
  return projects.reverse();
};

const sequence = link => parseInt(link, 10);

/** Paintings newest first. A new painting takes the next number up; gaps are fine. */
export const getPaintings = () => {
  const paintingImagesOutput = [];

  for (let path of paintingImagePaths) {
    const link = path.replace('src/assets/images/paintings/', '').replace(/@\dx\..*/, '');
    const name = link.replace(/\d+-/, '');
    paintingImagesOutput.push({path, name, link});
  }

  return paintingImagesOutput.sort((a, b) => sequence(b.link) - sequence(a.link));
};
