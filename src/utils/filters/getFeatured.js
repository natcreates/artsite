const descriptions = require('../../site/_data/descriptions');

module.exports = (images) => {
  return images.filter((image) => descriptions[image.name].featured).sort((image1, image2) => {
      if (descriptions[image1.name].featuredOrder < descriptions[image2.name].featuredOrder) {
          return -1;
      }
      if (descriptions[image1.name].featuredOrder > descriptions[image2.name].featuredOrder) {
          return 1;
      }
      return 0;
  })
};

