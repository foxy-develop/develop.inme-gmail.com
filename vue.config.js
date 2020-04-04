const path = require('path');
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  filenameHashing: true,

  configureWebpack: {
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        actions: path.resolve(__dirname, 'src/store/actions')
      }
    },
    plugins: [new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      cacheId: `artdock_cp.v2`
    })]
  },

  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        prependData:`
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
          @import "@/styles/_functions.scss";
        `
      }
    }
  }
};
