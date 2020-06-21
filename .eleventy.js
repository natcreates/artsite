const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fg = require('fast-glob');
const galleryImagePaths = fg.sync(['**/src/site/images/gallery/*']);
const easelImagePaths = fg.sync(['**/src/site/images/easel/*']);
let galleryImagesOutput = [];
let easelImagesOutput = [];

module.exports = function(config) {

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  for (let path of galleryImagePaths) {
    const name = path.replace('src/site/images/gallery/', '').replace(/\..*/, '');
    galleryImagesOutput.push({ path, name });
  }
  for (let path of easelImagePaths) {
    const name = path.replace('src/site/images/easel/', '').replace(/\..*/, '');
    easelImagesOutput.push({ path, name });
  }
  // }
  config.addCollection('gallery', () => galleryImagesOutput);
  config.addCollection('easel', () => easelImagesOutput);

  // Add some utility filters
  config.addFilter("squash", require("./src/utils/filters/squash.js") );
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );

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
