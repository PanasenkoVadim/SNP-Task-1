const path = require("path")
const fs = require("fs")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const distPath = path.resolve(__dirname, "./public/build/").replace(/\\/g, "/")

const entries = {
  css: "./src/scss/entries/",
  js: "./src/js/entries/"
}

const completed = {}

Object.values(entries).map((entry) =>
  fs
    .readdirSync(path.resolve(__dirname, entry))
    .forEach(
      (file) =>
        (completed[
          path.extname(file).match(/.(sa|sc|c)ss$/)
            ? `css/${file.replace(path.extname(file), "")}`
            : `js/${file.replace(path.extname(file), "")}`
        ] = entry + file)
    )
)

module.exports = () => {
  const config = {
    watchOptions: {
      ignored: /node_modules/
    },
    cache: {
      type: "filesystem",
      buildDependencies: {
        config: [__filename]
      }
    },
    entry: completed,
    output: {
      filename: "./[name].js",
      path: distPath,
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "./[name].css"
      })
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, "./public"),
          publicPath: "/public",
          watch: true
        },
        {
          directory: path.join(__dirname, "./"),
          publicPath: "/",
          watch: true
        }
      ],
      compress: true,
      port: 3000,
      open: true,
      hot: true,
      devMiddleware: {
        publicPath: "/build/",
        writeToDisk: true
      },
      watchFiles: ["src/**/*", "public/**/*"]
    }
  }
  return config
}
