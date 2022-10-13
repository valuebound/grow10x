const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@theme': 'light',
              '@primary-color': '#ee6c4d',
              '@layout-sider-background': '#001d3d',
              '@progress-remaining-color': '#dddddd',
              '@menu-dark-bg': '#001d3d',
              '@menu-item-active-bg': '@primary-5',
              '@secondary-color': '#293241',
              '@icon-color': '#3D5A80',
              '@success-color': '@green-8',
              '@warning-color': '@gold-7',
              '@error-color': '@red-7',
              '@border-radius-base': '6px',
              '@checkbox-border-radius': '2px',
              '@card-radius': '10px',
              '@rate-star-size': '15px',
              '@font-family': 'Albert Sans',
              '@slider-rail-background-color': '#dddddd',
              '@slider-track-background-color': '@primary-6',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
