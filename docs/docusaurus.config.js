// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Solar Power",
  tagline:
    "Um aplicativo móvel  para incentivar a otimização e  economia de energia em sistemas  de energia solar.",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.svg",
  organizationName: "ifg",
  projectName: "solar-power",
  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/PaloAltoNetworks/docusaurus-openapi-docs/tree/main/demo",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
        },
      },
      navbar: {
        title: "Solar Power",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          {
            type: "dropdown",
            label: "API",
            position: "left",
            items: [
              {
                label: "API Zoo",
                to: "/category/petstore-api",
              },
              {
                label: "Petstore (versioned)",
                to: "/category/petstore-versioned-api",
              },
            ],
          },
          {
            position: "left",
            label: "Sobre",
            href: "/about",
          },
          {
            href: "https://github.com/YasminCastro/solar-power",
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
                label: "Tutorial",
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
      },
      plugins: [
        [
          "docusaurus-plugin-openapi-docs",
          {
            id: "openapi",
            docsPluginId: "classic",
            config: {
              petstore_versioned: {
                specPath: "/examples/petstore.yaml",
                outputDir: "docs/petstore_versioned", // No trailing slash
                sidebarOptions: {
                  groupPathsBy: "tag",
                  categoryLinkSource: "tag",
                },
                version: "2.0.0", // Current version
                label: "v2.0.0", // Current version label
                baseUrl: "/petstore_versioned/swagger-petstore-yaml", // Leading slash is important
                versions: {
                  "1.0.0": {
                    specPath: "examples/petstore-1.0.0.yaml",
                    outputDir: "docs/petstore_versioned/1.0.0", // No trailing slash
                    label: "v1.0.0",
                    baseUrl: "/petstore_versioned/1.0.0/swagger-petstore-yaml", // Leading slash is important
                  },
                },
              },
              petstore: {
                specPath: "examples/petstore.yaml",
                proxy: "https://cors.pan.dev",
                outputDir: "docs/petstore",
                sidebarOptions: {
                  groupPathsBy: "tag",
                  categoryLinkSource: "tag",
                },
                template: "api.mustache", // Customize API MDX with mustache template
                downloadUrl:
                  "https://raw.githubusercontent.com/PaloAltoNetworks/docusaurus-openapi-docs/main/demo/examples/petstore.yaml",
                hideSendButton: false,
              },
              cos: {
                specPath: "examples/openapi-cos.json",
                outputDir: "docs/cos",
                sidebarOptions: {
                  groupPathsBy: "tag",
                },
              },
              burgers: {
                specPath: "examples/food/burgers/openapi.yaml",
                outputDir: "docs/food/burgers",
              },
              yogurt: {
                specPath: "examples/food/yogurtstore/openapi.yaml",
                outputDir: "docs/food/yogurtstore",
              },
            },
          },
        ],
      ],
      themes: ["docusaurus-theme-openapi-docs"],
    }),
};

module.exports = config;
