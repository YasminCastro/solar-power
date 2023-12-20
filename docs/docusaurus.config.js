// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Solar Power",
  tagline:
    " Um aplicativo móvel para monitoramento e incentivo à adoção de sistemas fotovoltaicos",
  url: "https://solar-power.vercel.app",
  baseUrl: "/",
  favicon: "img/logo.svg",
  organizationName: "ifg",
  projectName: "solar-power",
  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
  },

  presets: [
    [
      "docusaurus-preset-openapi",
      /** @type {import('docusaurus-preset-openapi').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('docusaurus-preset-openapi').ThemeConfig} */
    ({
      navbar: {
        title: "Solar Power",
        logo: {
          alt: "Solar Power Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "/api", label: "API", position: "left" },
          {
            position: "right",
            label: "Sobre",
            href: "/about",
          },
          {
            href: "https://github.com/facebook/docusaurus",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Contato",
            items: [
              {
                label: "yasminsdcastro@gmail.com",
                href: "mailto: yasminsdcastro@gmail.com",
              },
              {
                label: "gabrielmarquesmtv123@gmail.com",
                href: "mailto: gabrielmarquesmtv123@gmail.com",
              },
            ],
          },
        ],
        copyright: `Copyright © 2023 Solar Power, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["powershell", "javascript", "typescript"],
      },
    }),
};

module.exports = config;
