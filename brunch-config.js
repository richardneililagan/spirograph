// See http://brunch.io for documentation.
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
  stylesheets: {joinTo: 'app.css'}
}

exports.plugins = {
  babel: {presets: ['latest']},
  postcss: {
    processors: [
      require('autoprefixer')(['last 2 versions'])
    ]
  },
  sass: {
    options: {
      includePaths: [
        'node_modules/normalize-scss/sass'
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
