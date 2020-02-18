module.exports = {
  entry: { main: "./src/index" },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: { attrs: ["img:src", "img:srcset", "use:xlink:href"] }
        }
      },
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: "html-loader-srcset",
      //     options: { attrs: ["img:src", "img:srcset"] }
      //   }
      // },
      // {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: "html-loader-srcset",
      //     options: {
      //       attrs: [":srcset"]
      //     }
      //   }
      // },
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
