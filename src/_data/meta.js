export default {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Natalie Dixon Art',
  siteDescription: 'Website for visionary artist Natalie Dixon.',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: 'Natalie Dixon',
  authorEmail: 'natalie.dixon@cantab.net',
  authorWebsite: '',
  themeColor: '#DD4462', //  Manifest: defines the default theme color for the application
  themeBgColor: '#F3F3F3', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.jpg', // fallback/default meta image
    opengraph_default_alt: 'A painting by Natalie Dixon',
    twitterSite: '',
    twitterCreator: '',
    mastodonProfile: ''
  },
  blog: {
    // this is for the rss feed
    name: 'Natalie Dixon Art',
    description:
      'News, new paintings and upcoming shows from visionary artist Natalie Dixon.'
  },
  pagination: {
    itemsPerPage: 20
  },
  address: {
    email: 'natalie.dixon@cantab.net'
  },
  menu: {
    closedText: 'Menu'
  }
};
