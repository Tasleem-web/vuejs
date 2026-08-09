const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: true,
  configureWebpack: {
    // 2. Forces high-quality source maps during development (npm run serve)
    devtool: "eval-source-map",
  },

  css: {
    // 3. Optional: Enables source maps for your CSS/Bootstrap styles
    sourceMap: true,
  },
});
