import Image, {generateHTML} from '@11ty/eleventy-img';

// null keeps the source's own width, which the fixed steps skip whenever a painting is
// narrower than them; without it a portrait canvas tops out well below its master.
const DEFAULT_WIDTHS = [400, 800, 1200, 1600, 2200, null];

/** Responsive <picture> for a local image. `sizes` must describe the slot, or the browser over-fetches. */
export default async function image(
  src,
  alt,
  sizes,
  className,
  loading = 'lazy',
  widths = DEFAULT_WIDTHS
) {
  if (!alt) {
    throw new Error(
      `No alt text for ${src}. A painting also needs an entry keyed by its name in src/_data/descriptions.json.`
    );
  }

  const metadata = await Image(src, {
    widths,
    formats: ['avif', 'webp', 'jpeg'],
    outputDir: '.cache/images/',
    urlPath: '/assets/images/generated/',
    sharpJpegOptions: {quality: 82, chromaSubsampling: '4:4:4', mozjpeg: true},
    sharpWebpOptions: {quality: 82, smartSubsample: true},
    sharpAvifOptions: {quality: 65, chromaSubsampling: '4:4:4'}
  });

  return generateHTML(metadata, {
    alt,
    sizes,
    class: className,
    loading,
    decoding: 'async',
    ...(loading === 'eager' && {fetchpriority: 'high'})
  });
}
