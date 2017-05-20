module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from bower_components to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
                        src: ['*.js'],
                        dest: 'public/javascripts/bootstrap/'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/jquery/dist/',
                        src: ['**/*.js', '**/*.map'],
                     //	src: ['jquery.min.js', 'jquery.js', 'jquery.slim.js'],
                        dest: 'public/javascripts/jQuery/'
                    },

                    // Fonts.
                    {
                        expand: true,
                        filter: 'isFile',
                        flatten: true,
                        cwd: 'bower_components/',
                        src: ['bootstrap-sass/assets/fonts/**'],
                        dest: 'public/fonts/bootstrap/'
                    }
                ]
            },
        },

        // Compile SASS files into minified CSS.
        sass: {
            options: {
                includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']
            },
            release: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
               //     'css/app.css': 'scss/app.scss'
               		'public/stylesheets/app.css': 'custom/scss/app.scss'
                }
            },
            debug: {
                options: {
                    outputStyle: 'expanded'
                },
                files: {
               		'public/stylesheets/app.css': 'custom/scss/app.scss'
                }
            }
        },

        uglify: {
    		debug: {
      			options: {
        			beautify: true,
        			mangle: false
      			},
      			files: [{
        			expand: true,
        			cwd: 'custom/js',
        			src: '**/*.js',
        			dest: 'public/javascripts'
      			},
      			{
        			expand: true,
        			cwd: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap',
        			src: '**/*.js',
        			dest: 'public/javascripts/bootstrap/add-on'
      			}]
    		},
    		release: {
      			files: [{
        			expand: true,
        			cwd: 'custom/js',
        			src: '**/*.js',
        			dest: 'public/javascripts'
      			},
      			{
        			expand: true,
        			cwd: 'bower_components/bootstrap-sass/assets/javascripts/bootstrap',
        			src: '**/*.js',
        			dest: 'public/javascripts/bootstrap/add-on'
      			}]
    		}
  		},
      // Watch these files and notify of changes.
      watch: {
          grunt: { files: ['Gruntfile.js'] },

          sass: {
              files: [
                  'custom/scss/**/*.scss'
              ],
              tasks: ['sass:debug']
          },
          uglify: {
              files: [
                  'custom/js/**/*.js'
              ],
              tasks: ['uglify:debug']
          }
      },
      jsdoc : {
        dist : {
            src: ['*.js'],
            options: {
                destination: 'docs/src'
            }
        }
    }
    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
    // Establish tasks we can run from the terminal.
    // grunt.registerTask('build', ['sass', 'copy']);
    // grunt.registerTask('build', ['copy', 'sass', 'uglify']);
    grunt.registerTask('debug', ['copy', 'sass:debug', 'uglify:debug']);
    grunt.registerTask('release', ['copy', 'sass:release', 'uglify:release']);
    // grunt.registerTask('default', ['build', 'watch']);
    // grunt build:debug oppure grunt build:release
}
