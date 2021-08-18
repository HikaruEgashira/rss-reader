const { ESBuildMinifyPlugin } = require("esbuild-loader");

function UseEsbuildMinify(config, options) {
  const terserIndex = config.optimization.minimizer.findIndex(
    (minimizer) => minimizer.constructor.name === "TerserPlugin"
  );
  if (terserIndex > -1) {
    config.optimization.minimizer.splice(
      terserIndex,
      1,
      new ESBuildMinifyPlugin(options)
    );
  }
}

function UseEsbuildLoader(config, options) {
  const jsLoader = config.module.rules.find(
    (rule) => rule.test && rule.test.test(".ts")
  );

  if (jsLoader) {
    jsLoader.use.loader = "esbuild-loader";
    jsLoader.use.options = options;
  }
}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: "react",
      })
    );

    UseEsbuildMinify(config);

    UseEsbuildLoader(config, {
      loader: "tsx",
      target: "es2017",
    });

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ["www.google.com"],
  },
};

module.exports = nextConfig;
