module.exports = {
  babelrcRoots: [".", "./packages/*"],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  targets: {
    node: "current",
  },
  plugins: ["@babel/plugin-proposal-export-default-from"],
};
