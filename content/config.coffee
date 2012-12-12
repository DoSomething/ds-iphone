exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
	paths:
  	  public: '../iOS/www/'  
	files:
    javascripts:
      defaultExtension: 'js'
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
      order:
        before: ['vendor/scripts/cordova/cordova-2.2.0.js',
          'vendor/scripts/cordova/plugins/FacebookConnect.js',
          'vendor/scripts/cordova/plugins/flurryplugin.js',
          'vendor/scripts/jquery-1.7.2.js',
          'vendor/scripts/jquery.mobile-1.1.1.js'
          'vendor/scripts/underscore-1.3.3.js',
          'vendor/scripts/backbone/json2.js',
          'vendor/scripts/backbone/backbone-0.9.2.js',
          'vendor/scripts/backbone/backstack.js'
    
        ]

    stylesheets:
      defaultExtension: 'styl'
      joinTo: 'stylesheets/app.css'
      order:
        before: ['vendor/styles/normalize.css','vendor/styles/jquerymobileanimations.css']
        after: ['vendor/styles/helpers.css']

    templates:
      defaultExtension: 'hbs'
      joinTo: 'javascripts/app.js'
