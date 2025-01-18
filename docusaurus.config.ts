import type { Config } from '@docusaurus/types'
import type * as PresetClassic from '@docusaurus/preset-classic'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { themes } from 'prism-react-renderer'
import 'dotenv/config'

const MathEquations = {
  remarkPlugins: [remarkMath],
  rehypePlugins: [rehypeKatex],
}

const ContentParam = {
  sidebarPath: require.resolve('./sidebars.js'),
  showLastUpdateTime: true,
  ...MathEquations,
}

const config: Config = {
  title: '楷鹏',
  tagline: '十年的时间，除了变成中年人，我还可以做多少很酷的事',
  url: 'https://wukaipeng.com/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Penggeor', // Usually your GitHub org/user name.
  projectName: 'ken', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/MonaspaceRadonVarVF.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous",
      },
    },
  ],

  customFields: {
    GISCUS_REPO_ID: process.env.GISCUS_REPO_ID,
    GISCUS_CATEGORY_ID: process.env.GISCUS_CATEGORY_ID,
  },

  presets: [
    [
      // 'classic',
      '@docusaurus/preset-classic',
      {
        docs: {
          ...ContentParam,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '✨',
          blogSidebarCount: 'ALL',
          ...MathEquations
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies PresetClassic.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],

  themeConfig:
    {
      respectPrefersColorScheme: true,
      navbar: {
        hideOnScroll: true,
        title: '',
        logo: {
          alt: 'My Site Logo',
          src: 'img/Logokp-logo-v3@3x.png',
          srcDark: 'img/Logokp-logo-v1-dark@3x.png',
        },
        items: [
          {
            to: 'weekly',
            label: '🌃 周刊'  ,
            position: 'left',
          },
          {
            to: 'technique',
            label: '🦄 技术',
          },
          {
            to: 'class',
            label: '🐻‍❄️ 课程',
          },
          {
            type: 'dropdown',
            label: '其他',
            position: 'left',
            items: [
              {
                to: 'english',
                label: '🐳 英语',
                // position: 'left',
              },
              {
                to: 'read',
                label: '🦋 阅读',
                // position: 'left',
              },
              {
                to: 'blog',
                label: '🌌 博客',
                // position: 'left',
              },
              {
                label: '📶 博客 RSS',
                // href: 'https://wukaipeng.com/blog/rss.xml',
                to: 'blog/rss.xml',
                'aria-label': 'RSS',
              },
              {
                label: '📶 周刊 RSS',
                // href: 'https://wukaipeng.com/weekly/rss.xml',
                to: 'weekly/rss.xml',
                'aria-label': 'RSS',
              },
            ]
          },
          // {
          //   label: 'RSS',
          //   href: 'https://wukaipeng.com/blog/rss.xml',
          //   position: 'right',
          //   'aria-label': 'RSS',
          // },
          // {
          //   type: 'dropdown',
          //   label: '其他平台',
          //   position: 'right',
          //   items: [
          //     {
          //       label: 'X (Twitter)',
          //       href: 'https://twitter.com/x_wukaipeng',
          //       'aria-label': 'X',
          //     },
          //     {
          //       label: 'Jike 即刻',
          //       href: 'https://okjk.co/8FI5oD',
          //       'aria-label': '即刻',
          //     },
          //   ]
          // },
          // {
          //   type: 'dropdown',
          //   label: '联系我',
          //   position: 'right',
          //   items: [
          //     {
          //       href: "https://wukaipeng.com/wechat",
          //       label: "微信",
          //       'aria-label': 'WeChat',
          //       target: '_self'
          //     },
          //     {
          //       label: 'Email',
          //       href: 'mailto:wkpcoder@163.com',
          //       'aria-label': 'Email',
          //     },
          //     // {
          //     //   label: 'X(Twitter)',
          //     //   href: 'https://twitter.com/x_wukaipeng',
          //     //   'aria-label': 'X',
          //     // },
          //     // {
          //     //   label: '即刻',
          //     //   href: 'https://okjk.co/8FI5oD',
          //     //   'aria-label': '即刻',
          //     // }
          //   ]
          // },
          // {
          //   type: 'dropdown',
          //   label: 'RSS',
          //   position: 'right',
          //   items: [
          //     {
          //       label: '博客 RSS 📶',
          //       href: 'https://wukaipeng.com/blog/rss.xml',
          //       'aria-label': 'RSS',
          //     },
          //     {
          //       label: '周刊 RSS 📶',
          //       href: 'https://wukaipeng.com/weekly/rss.xml',
          //       'aria-label': 'RSS',
          //     },
          //     // {
          //     //   to: 'sandwich',
          //     //   label: '写作工具 🥪 文章前后添加固定内容',
          //     // },
          //     // {
          //     //   to: 'what-week-of-the-year-is-it-this-week',
          //     //   label: '写作工具 📅 本周是今年的第几周',
          //     // }
          //   ],
          // },
          {
            href: 'https://github.com/Penggeor/ken',
            // label: 'GitHub',
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
          // {
          //   title: '本站',
          //   items: [
          //     {
          //       label: '技术',
          //       to: 'technique',
          //     },
          //     {
          //       label: '英语',
          //       to: 'english',
          //     },
          //     {
          //       label: '知识库',
          //       to: 'read',
          //     },
          //     {
          //       label: '博客',
          //       to: 'blog',
          //     },
          //   ],
          // },
          {
            title: '联系方式',
            items: [
              {
                label: '微信',
                href: 'https://wukaipeng.com/wechat',
              },
              {
                label: 'Email',
                href: 'mailto:wkpcoder@163.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/penggeor',
              },
              {
                label: 'X (Twitter)',
                href: 'https://twitter.com/x_wukaipeng',
              },
              {
                label: '即刻',
                href: 'https://okjk.co/8FI5oD',
                'aria-label': '即刻',
              }
            ],
          },
          {
            title: '供应商',
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
                label: '粤 ICP 备 2023085392 号',
                href: 'https://beian.miit.gov.cn',
              },
            ],
          },
          {
            title: '公众号',
            items: [
              {
                html: `<img src="/img/contact/qrcode_for_gh_36929351504f_430.jpg" style="height: 10rem" />`
              }
            ]
          },
          {
            title: '支持一下',
            items: [
              {
                label: '爱发电',
                href: 'https://afdian.com/a/wukaipeng'
//                 html: `<a class="footer__link-item" style="display: flex;gap: 0.25rem;align-items: center;" href="https://afdian.net/a/wukaipeng?tab=home">
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
//   <path fill-rule="evenodd" d="M134.614 98.3714C133.294 97.5334 131.909 97.1697 130.563 97.02C133.724 89.3002 135.736 79.1949 128.887 69.1574C118.406 53.7998 103.38 45.8198 84.2346 45.4382C78.7809 45.3312 72.3517 45.5844 65.5487 45.8554C57.6493 46.1692 47.1369 46.5793 39.9921 45.9873C41.4161 45.2136 42.9326 44.4719 44.2462 43.8336C49.2728 41.384 53.2314 39.4763 51.9214 36.0925C51.2343 34.117 49.1874 33.0794 45.8233 33.0045C38.7426 32.8441 23.4421 36.9447 20.6903 43.8586C19.1418 47.7524 18.8854 55.2689 34.5668 61.9119C41.0174 64.6503 59.237 67.9879 66.2678 68.6867C68.2542 68.8793 69.7743 69.2822 70.9277 69.7101C69.3151 70.7727 67.6597 71.8888 65.9972 73.0298C63.1102 71.3824 58.3897 69.4391 54.8654 71.846C53.502 72.7695 52.7259 74.1316 52.6903 75.6827C52.6405 77.6117 53.8081 79.498 55.1217 81.017C49.9314 85.1639 45.7343 89.1825 44.2462 92.2811C42.5873 96.0893 41.9109 102.322 45.008 108.402C48.9382 116.118 57.6279 121.499 70.8423 124.394C88.1114 128.17 103.027 124.768 112.895 119.566C118.388 116.671 122.286 113.215 124.18 110.131C124.768 110.317 125.355 110.506 125.96 110.695C126.804 110.951 127.648 111.208 128.438 111.49C131.051 112.395 133.942 112.274 136.167 111.151C136.206 111.133 136.248 111.108 136.291 111.087C137.968 110.202 139.175 108.783 139.705 107.072C141.129 102.458 137.064 99.9082 134.614 98.3714ZM64.9999 90.6681C63.4307 90.6681 62.1621 91.9382 62.1621 93.5091C62.1621 95.0836 63.4307 96.3537 64.9999 96.3537C66.5691 96.3537 67.8378 95.0836 67.8378 93.5091C67.8378 91.9382 66.5691 90.6681 64.9999 90.6681ZM91.7568 99.1965C90.1876 99.1965 88.9189 100.467 88.9189 102.038C88.9189 103.612 90.1876 104.882 91.7568 104.882C93.326 104.882 94.5946 103.612 94.5946 102.038C94.5946 100.467 93.326 99.1965 91.7568 99.1965Z" fill="currentColor"/>
// </svg>
// </a>`
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 楷鹏.`,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
        additionalLanguages: ['java', 'bash', 'php'],
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6,
      },
      imageZoom: {
        // CSS selector to apply the plugin to, defaults to '.markdown img'
        selector: '.markdown img',
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        // options: {
        //   margin: 24,
        //   background: '#BADA55',
        //   scrollOffset: 0,
        //   container: '#zoom-container',
        //   template: '#zoom-template',
        // },
      },
      announcementBar: {
        id: 'support_us',
        content:
          '一款有用、好用的智能阅读助手 🚀 <a target="_blank" rel="noopener noreferrer" href="https://baoyueai.com/home/scenes?utm_id=237648#part-8">包阅</a>',
        backgroundColor: '#fafbfc',
        textColor: '#091E42',
        isCloseable: true,
      },
    } satisfies PresetClassic.ThemeConfig,

  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-tech',
        path: 'docs-tech',
        routeBasePath: 'technique',
        ...ContentParam,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-english',
        path: 'docs-english',
        routeBasePath: 'english',
        ...ContentParam,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-book',
        path: 'docs-book',
        routeBasePath: 'read',
        ...ContentParam,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs-class',
        path: 'docs-class',
        routeBasePath: 'class',
        ...ContentParam,
      },
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'blog-weekly',
        path: 'blog-weekly',
        blogTitle: '周刊',
        routeBasePath: 'weekly',
        blogSidebarTitle: '✨',
        blogSidebarCount: 'ALL',
        authorsMapPath: '../author.yaml',
        feedOptions: {
          type: 'all',
          title: 'Deving 周刊',
          copyright: `版权 © ${new Date().getFullYear()} 吴楷鹏`,
          description: '每周更新有料周刊，分享编程、生活、健康和思考 feedId:60244255202015232+userId:69676769296017408',
        },
        ...MathEquations,
      },
    ],
    // [
    //   'posthog-docusaurus',
    //   {
    //     apiKey: process.env.POSTHOG_API_KEY,
    //     appUrl: 'https://app.posthog.com', // optional
    //     enableInDevelopment: true, // optional
    //   },
    // ],
    // PostHogPlugin,
    'plugin-image-zoom',
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
      },
    },
  },

  markdown: {
    mermaid: true,
  },
}

if (process.env?.POSTHOG_API_KEY) {
  config.plugins.push([
    'posthog-docusaurus',
    {
      apiKey: process.env.POSTHOG_API_KEY,
      appUrl: 'https://app.posthog.com', // optional
      enableInDevelopment: true, // optional
    },
  ])
} else {
  console.warn('[Warning]可添加 POSTHOG_API_KEY 环境变量以启用 PostHog 插件')
}

if (
  process.env.ALGOLIA_APP_ID &&
  process.env.ALGOLIA_API_KEY &&
  process.env.ALGOLIA_INDEX_NAME
) {
  config.themeConfig.algolia = {
    appId: process.env.ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_API_KEY,
    indexName: process.env.ALGOLIA_INDEX_NAME,
    searchParameters: {},
    searchPagePath: 'search',
  }
} else {
  console.warn(
    '[Warning]可添加 ALGOLIA_APP_ID、ALGOLIA_API_KEY 和 ALGOLIA_INDEX_NAME 环境变量以启用 Algolia 搜索插件'
  )
}

export default config
