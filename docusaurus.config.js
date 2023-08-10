// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
require('dotenv').config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '楷鹏',
  tagline: 'O ever youthful, O ever weeping.',
  url: 'https://wukaipeng.com/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Penggeor', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.
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
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/Logokp-logo-v3@3x.png',
        },
        items: [
          {
            to: '/docs-tech/intro',
            label: '🦄 技术',
            position: 'left',
          },
          {
            to: '/docs-engh/intro',
            label: '🐳 英语',
            position: 'left',
          },
          {
            to: '/blog-tech/intro',
            label: '博客',
            position: 'left',
          },
          {
            to: '/blog-engh/intro',
            label: 'Essay',
            position: 'left',
          },
          {
            to: '/blog-news/intro',
            label: '新闻',
            position: 'left',
          },
          {
            href: 'https://github.com/Penggeor',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: '技术',
                to: '/docs-tech/intro',
              },
              {
                label: '英语',
                to: '/docs-engh/intro',
              },
              {
                label: '博客',
                to: '/blog/intro',
              },
              {
                label: 'Essay',
                to: '/blog-engh/intro',
              },
              {
                label: '新闻',
                to: '/blog-news/intro',
              },
            ],
          },
          {
            title: 'Contact Me',
            items: [
              {
                label: 'WeChat',
                href: '/wechat',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/Kail_Penggeor',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Penggeor',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: '由 UCloud 提供服务器',
                href: 'https://www.ucloud.cn/site/active/kuaijiesale.html',
              },
              {
                html: `<a class="footer__link-item" style="display: flex;gap: 0.25rem;align-items: center;" href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral">
                由
                <img src="/img/provider/又拍云_logo6.png" style="height: 1.5rem" />
                提供云存储
                <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-theme-Icon-ExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg>
                </a>`
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
    }),

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-tech',
        path: 'docs-tech',
        routeBasePath: 'docs-tech',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-engh',
        path: 'docs-engh',
        routeBasePath: 'docs-engh',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-tech',
        path: 'blog-tech',
        blogTitle: '博客',
        routeBasePath: 'blog-tech',
        blogSidebarTitle: 'ALL 👇',
        blogSidebarCount: 'ALL',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-engh',
        path: 'blog-engh',
        blogTitle: 'Essay',
        routeBasePath: 'blog-engh',
        blogSidebarTitle: 'ALL 👇',
        blogSidebarCount: 'ALL',
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-news',
        path: 'blog-news',
        blogTitle: '新闻',
        routeBasePath: 'blog-news',
        blogSidebarTitle: 'ALL 👇',
        blogSidebarCount: 'ALL',
      },
    ],
    [
      "posthog-docusaurus",
      {
        apiKey: process.env.POSTHOG_API_KEY,
        appUrl: "https://app.posthog.com", // optional
        enableInDevelopment: true, // optional
        // other options are passed to posthog-js init as is
      },
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
    },
  },
};

module.exports = config;
