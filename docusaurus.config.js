// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
require('dotenv').config()

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '楷鹏',
  tagline: '十年的时间，除了变成中年人，我还可以做多少很酷的事',
  url: 'https://wukaipeng.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Penggeor', // Usually your GitHub org/user name.
  projectName: 'ken', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  customFields: {
    GISCUS_REPO_ID: process.env.GISCUS_REPO_ID,
    GISCUS_CATEGORY_ID: process.env.GISCUS_CATEGORY_ID,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/Penggeor/ken/blob/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/Penggeor/ken/blob/main/',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      respectPrefersColorScheme: true,
      navbar: {
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/Logokp-logo-v3@3x.png',
          srcDark: 'img/Logokp-logo-v1-dark@3x.png',
        },
        items: [
          {
            to: 'technique',
            label: '🦄 技术',
            position: 'left',
          },
          {
            to: 'english',
            label: '🐳 英语',
            position: 'left',
          },
          {
            to: 'read',
            label: '🐶 阅读',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: '博客',
            position: 'left',
            items: [
              {
                to: 'tech',
                label: '👍 技术',
              },
              {
                to: 'eng',
                label: '✌️ 英文',
              },
              {
                to: 'post',
                label: '🤟 思考',
              },
            ],
          },
          {
            href: 'https://github.com/Penggeor/ken',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '技术',
                to: 'technique',
              },
              {
                label: '英语',
                to: 'english',
              },
              {
                label: '阅读',
                to: 'read',
              },
            ],
          },
          {
            title: '博客',
            items: [
              {
                label: '技术',
                to: 'tech',
              },
              {
                label: '英文',
                to: 'eng',
              },
              {
                label: '文章',
                to: 'post',
              },
            ],
          },
          {
            title: '联系方式',
            items: [
              {
                label: '微信',
                href: '/wechat',
              },
              {
                label: '邮箱',
                href: 'mailto:wkpcoder@163.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Penggeor',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Kail_Penggeor',
              },
            ],
          },
          {
            title: '更多信息',
            items: [
              {
                label: '由 UCloud 提供服务器',
                href: 'https://www.ucloud.cn/site/active/kuaijiesale.html?invitation_code=C1xCCE664C27422',
              },
              {
                html: `<a class="footer__link-item" style="display: flex;gap: 0.25rem;align-items: center;" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">
                由
                <img src="/img/provider/又拍云_logo6.png" style="height: 1.5rem" />
                提供云存储
                <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
                </a>`,
              },
              {
                label: '粤ICP备2023085392号',
                href: 'https://beian.miit.gov.cn',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 楷鹏.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: process.env.ALGOLIA_APP_ID,

        // Public API key: it is safe to commit it
        apiKey: process.env.ALGOLIA_API_KEY,

        indexName: process.env.ALGOLIA_INDEX_NAME,

        // Optional: see doc section below
        contextualSearch: false,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/zh-CN/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
    }),

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-tech',
        path: 'docs-tech',
        routeBasePath: 'technique',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-engh',
        path: 'docs-engh',
        routeBasePath: 'english',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-book',
        path: 'docs-book',
        routeBasePath: 'read',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-tech',
        path: 'blog-tech',
        blogTitle: '博客',
        routeBasePath: 'tech',
        blogSidebarTitle: '✨',
        blogSidebarCount: 'ALL',
        authorsMapPath: '../author.yaml',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-engh',
        path: 'blog-engh',
        blogTitle: 'Essay',
        routeBasePath: 'eng',
        blogSidebarTitle: '🌟',
        blogSidebarCount: 'ALL',
        authorsMapPath: '../author.yaml',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-post',
        path: 'blog-post',
        blogTitle: '阅读',
        routeBasePath: 'post',
        blogSidebarTitle: '💫',
        blogSidebarCount: 'ALL',
      },
    ],
    [
      'posthog-docusaurus',
      {
        apiKey: process.env.POSTHOG_API_KEY,
        appUrl: 'https://app.posthog.com', // optional
        enableInDevelopment: true, // optional
        // other options are passed to posthog-js init as is
      },
    ],
  ],

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
    localeConfigs: {
      // en: {
      //   htmlLang: 'en-GB',
      // },
      'zh-CN': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
      }
    },
  },
}

module.exports = config
