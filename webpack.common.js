module.exports = {
  entry: { main: "./src/index" },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: {
            list: [
              {
                // Tag name
                tag: "img",
                // Attribute name
                attribute: "src",
                // Type of processing, can be `src` or `scrset`
                type: "src"
              },
              {
                tag: "img",
                attribute: "srcset",
                type: "srcset"
              },
              { tag: "use", attribute: "xlink:href", type: "src" }
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash].[ext]",
          outputPath: "assets/",
          esModule: false
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          outputPath: "fonts"
        }
      },
      {
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
