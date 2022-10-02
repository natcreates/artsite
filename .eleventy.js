const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fg = require('fast-glob');
const paintingImagePaths = fg.sync(['**/src/site/images/paintings/*']);
const easelImagePaths = fg.sync(['**/src/site/images/easel/*']);
const sortBy = require('lodash/sortBy');
let paintingImagesOutput = [];
let easelImagesOutput = [];

module.exports = function(config) {

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');
  const sortedImagePaths = sortBy(paintingImagePaths);
  console.log('sortedImagePaths', sortedImagePaths);

  for (let path of sortedImagePaths) {
    const name = path.replace('src/site/images/paintings/', '').replace(/@\dx\..*/, '').replace(/\d+-/, '');
    console.log('name', name);
    paintingImagesOutput.push({ path, name });
  }
  for (let path of easelImagePaths) {
    const name = path.replace('src/site/images/easel/', '').replace(/\..*/, '');
    easelImagesOutput.push({ path, name });
  }
  // }
  config.addCollection('paintings', () => paintingImagesOutput.reverse());
  config.addCollection('easel', () => easelImagesOutput);

  // Add some utility filters
  config.addFilter("squash", require("./src/utils/filters/squash.js") );
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );
  config.addFilter("getFeatured", require("./src/utils/filters/getFeatured") );

  // add support for syntax highlighting
  config.addPlugin(syntaxHighlight);

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // compress and combine js files
  config.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  config.addFilter(
      "relative",
      (page, root = "/") => page.replace('src/site', '')
  );

  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");

  return {
    dir: {
      input: "src/site",
      output: "dist",
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
