// https://bnijenhuis.nl/notes/automatically-generate-open-graph-images-in-eleventy/
// converts SVG to JPEG for open graph images

import fs from 'node:fs';
import Image from '@11ty/eleventy-img';

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
