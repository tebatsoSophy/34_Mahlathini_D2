const path = require("path");

module.exports = {
  entry: "./frontend/src/index.js",
  output: {
    path: path.resolve(__dirname, 'frontend', 'public'),
    filename: "bundle.js",
    publicPath: "/", // Ensures assets are served from root
  },
  mode: "development",
  module: {
    rules: [
      // JavaScript and JSX Files
      {
        test: /\.jsx?$/, // Handles both .js and .jsx
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader","postcss-loader"],
      },
      // Image Files
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // Webpack 5 Asset Modules
      },
      // Optional: Fonts and Other Assets
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allows importing without specifying extensions
  },
  devtool: 'source-map', // Helps with debugging
};
