# Natalie Dixon Art

The website for visionary artist Natalie Dixon, built with [Eleventy](https://www.11ty.dev/)
and deployed to Netlify.

Originally based on [eleventy-excellent](https://github.com/madrilene/eleventy-excellent)
by Lene Saile, following Andy Bell's [Build Excellent Websites](https://buildexcellentwebsit.es/)
workflow (CUBE CSS, Every Layout, design tokens).

## Running it

```bash
npm install
npm start          # dev server on http://localhost:8080
npm run build      # production build into dist/
```

Node 20 or newer.

## Where things live

| What                             | Where                                     |
| -------------------------------- | ----------------------------------------- |
| Painting images                  | `src/assets/images/paintings/`            |
| Painting titles, sizes, alt text | `src/_data/descriptions.json`             |
| Portrait images                  | `src/assets/images/portraits/`            |
| Page content                     | `src/pages/*.md`                          |
| Navigation                       | `src/_data/navigation.js`                 |
| Site name, author, social meta   | `src/_data/meta.js`                       |
| Social links                     | `src/_data/social.json`                   |
| Styles                           | `src/assets/css/`                         |
| Design tokens                    | `src/assets/design-tokens/*.json`         |
| Build config                     | `eleventy.config.js` and `config/`        |

## Adding a painting

1. Drop the image into `src/assets/images/paintings/`, named `NN-slug@1x.jpg`,
   where `NN` orders it in the gallery (highest number shows first).
2. Add an entry to `src/_data/descriptions.json` keyed on the slug, with `title`,
   `format`, `description` and `alt`.

The gallery page, the individual artwork page and the sitemap entry are all generated
from those two things.

## Design tokens

Colours, spacing, type sizes and fonts are defined in `src/assets/design-tokens/*.json`
and turned into CSS custom properties (`--color-*`, `--space-*`, `--size-*`, `--font-*`)
at build time by `config/postcss/design-tokens.js`. Spacing and type sizes become fluid
`clamp()` values.
