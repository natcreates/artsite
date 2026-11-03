// https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/
// converts SVG to JPEG for open graph images

import fs from 'node:fs';
import {cp} from 'node:fs/promises';
import Image from '@11ty/eleventy-img';

const generatedImagesDir = '.cache/images';

export const svgToJpeg = function () {
  const socialPreviewImagesDir = 'dist/assets/images/social-preview/';
  fs.readdir(socialPreviewImagesDir, (err, files) => {
    if (!!files && files.length > 0) {
      files.forEach(fileName => {
        if (fileName.endsWith('.svg')) {
          let imageUrl = socialPreviewImagesDir + fileName;
          Image(imageUrl, {
            formats: ['jpeg'],
            outputDir: './' + socialPreviewImagesDir,
            filenameFormat: function (id, src, width, format) {
              let outputFileName = fileName.substring(0, fileName.length - 4);
              return `${outputFileName}.${format}`;
            }
          });
        }
      });
    } else {
      console.log('⚠ No social images found');
    }
  });
};

// The shortcode writes here rather than into dist, so that `rimraf dist` and Netlify's
// .cache restore leave the generated sizes in place. Copying has to wait for the build:
// passthrough copy runs before any template renders, so the files do not exist yet.
export const copyGeneratedImages = async () => {
  if (!fs.existsSync(generatedImagesDir)) return;
  await cp(generatedImagesDir, 'dist/assets/images/generated', {recursive: true});
};
