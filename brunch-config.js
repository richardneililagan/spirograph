exports.files = {
  javascripts: {
    joinTo: {
      'vendor.js': [
        /^(?!app)/, // Files that are not in `app` dir.
        /(?!two\.js)/ // Don't include two.js in vendor
      ],
      'app.js': /^app/
    }
  },
  stylesheets: {
    joinTo: 'app.css'
  }
}

exports.plugins = {
  babel: {
    presets: ['latest', 'flow'],
    plugins: ['transform-class-properties']
  },
  postcss: {
    processors: [
      require('autoprefixer')(['last 2 versions'])
    ]
  },
  // eslint: {
  //   config: {
  //     extends: ['standard', 'standard-flow']
  //   }
  // },
  sass: {
    options: {
      includePaths: [
        'node_modules/normalize-scss/sass',
        'node_modules/iconfonts/stylesheets'
      ]
    }
  }
}

exports.modules = {
  nameCleaner: path => path.replace(/^app\//, ''),
  autoRequire: {
    'app.js': ['app']
  }
}
