const postcss = require('postcss');
const slugify = require('slugify');

const clampGenerator = require('../../src/assets/css-utils/clamp-generator.js');

const colors = require('../../src/assets/design-tokens/colors.json');
const fonts = require('../../src/assets/design-tokens/fonts.json');
const spacing = require('../../src/assets/design-tokens/spacing.json');
const textSizes = require('../../src/assets/design-tokens/text-sizes.json');

const slug = name => slugify(name, {lower: true});

const toValue = value => (Array.isArray(value) ? value.join(', ') : value);

const groups = [
  {prefix: 'color', items: colors.items},
  {prefix: 'font', items: fonts.items},
  {prefix: 'space', items: clampGenerator(spacing.items)},
  {prefix: 'size', items: clampGenerator(textSizes.items)}
];

const customProperties = groups
  .flatMap(({prefix, items}) =>
    items.map(({name, value}) => `--${prefix}-${slug(name)}: ${toValue(value)};`)
  )
  .join('\n');

const tokenUtilities = [
  {prefix: 'spot-color', property: '--spot-color', items: colors.items},
  {prefix: 'flow-space', property: '--flow-space', items: clampGenerator(spacing.items)}
]
  .flatMap(({prefix, property, items}) =>
    items.map(
      ({name, value}) => `.${prefix}-${slug(name)} { ${property}: ${toValue(value)}; }`
    )
  )
  .join('\n');

/** Turns the design token JSON into the custom properties and utilities the stylesheets expect. */
const designTokens = () => ({
  postcssPlugin: 'design-tokens',
  Once(root) {
    root.prepend(postcss.parse(`:root {\n${customProperties}\n}`));
    root.append(postcss.parse(tokenUtilities));
  }
});

designTokens.postcss = true;

module.exports = designTokens;
