module.exports = {
  babelrcRoots: [
    ".",
    "./packages/*"
  ],
  presets: [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  targets: {
    node: "current"
  }
}