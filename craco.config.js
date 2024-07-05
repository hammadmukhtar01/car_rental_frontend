const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
          content: [
            './public/**/*.html',
            './src/**/*.js',
            './src/**/*.jsx',
            './src/**/*.ts',
            './src/**/*.tsx'
          ],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        })
      ]
    }
  },
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'report.html'
      })
    ]
  }
};
