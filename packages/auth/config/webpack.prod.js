const commonConfig = require("./webpack.common");
const { merge } = require("webpack-merge");
const { ModuleFederationPlugin } = require("webpack").container;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/auth/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap.js",
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
