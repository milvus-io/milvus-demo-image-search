const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader
} = require("customize-cra");
const path = require("path");
const darkTheme = require("@ant-design/dark-theme").default;
console.log(darkTheme);
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),

  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    components: path.resolve(__dirname, "src/components"),
    pages: path.resolve(__dirname, "src/pages"),
    assets: path.resolve(__dirname, "src/assets")
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...darkTheme,
      "@input-bg": "transparent"
      // "@checkbox-check-color": "#28292E"
    }
  })
);
