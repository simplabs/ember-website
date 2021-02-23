'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },

    'ember-composable-helpers': {
      only: ['filter-by', 'reject-by', 'sort-by'],
    },

    emberHighCharts: {
      includeHighCharts: true,
      includeHighChartsMore: true,
      includeModules: ['drilldown'],
    },

    'ember-leaflet': {
      excludeJS: true,
    },

    fingerprint: {
      // don't fingerprint images because we need to be able to access them dynamically
      // see more info here: https://github.com/ef4/prember/issues/52
      extensions: ['js', 'css', 'map'],
      generateAssetMap: true,
      fingerprintAssetMap: true,
    },

    ifa: {
      enabled: true,
      inline: true,
    },

    minifyCSS: {
      options: { processImport: true },
    },

    prember: {
      urls: [
        '/',
        'about/legal',
        'browser-support',
        'community',
        'community/black-lives-matter',
        'community/meetups',
        'community/meetups/assets',
        'community/meetups-getting-started',
        'editions',
        'editions/octane',
        'ember-community-survey-2016',
        'ember-community-survey-2017',
        'ember-community-survey-2018',
        'ember-community-survey-2019',
        'ember-community-survey-2020',
        'ember-users',
        'guidelines',
        'learn',
        'learn/examples',
        'logos',
        'mascots',
        'mascots/commission',
        'mascots/commission-sent',
        'mascots/faq',
        'mascots/payment',
        'mascots/payment-sent',
        'releases',
        'releases/beta',
        'releases/canary',
        'releases/lts',
        'releases/release',
        'security',
        'sponsors',
        'teams',
      ],
    },

    'responsive-image': [
      {
        include: 'images/team/*',
        widths: [100, 200],
        lqip: {
          type: 'blurhash',
        },
        // Firefox running as part of percy.io tests has trouble rendering AVIF files, eventually due to wrong MIME type
        // when served locally, causing false negatives
        formats:
          process.env.EMBER_ENV === 'production'
            ? ['avif', 'webp', 'jpeg']
            : ['webp', 'jpeg'],
        removeSource: true,
        // don't scale images, just copy as-is in dev mode, to not slow down the build
        justCopy: process.env.EMBER_ENV !== 'production',
      },
    ],
  });

  return app.toTree();
};
