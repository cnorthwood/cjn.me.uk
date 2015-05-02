var shelljs = require('shelljs');

module.exports = function(grunt) {
    grunt.initConfig({
        compass: {
            compile: { },
            dev: {
                options: {
                    outputStyle: 'expanded'
                }
            },
            options: {
                bundleExec: true,
                config: 'assets/scss/compass_config.rb'
            }
        },
        copy: {
            favicon: {
                files: [{
                    cwd: 'assets/',
                    src: ['favicon.png'],
                    dest: 'dist/static',
                    expand: true
                }]
            }
        },
        imagemin: {
            'content-images': {
                files: [{
                    cwd: 'assets',
                    src: ['content-images/**/*.{png,jpg}'],
                    dest: 'dist/static',
                    expand: true
                }]
            }
        },
        scsslint: {
            all: ['assets/scss/**/*.scss'],
            options: {
                bundleExec: true
            }
        },
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                options: { reload: true }
            },
            gemfile: {
                files: ['Gemfile'],
                tasks: ['bootstrap-compass']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bower']
            },
            styles: {
                files: ['assets/scss/compass_config.rb', 'assets/scss/**/*.scss'],
                tasks: ['styles-dev']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-scss-lint');

    grunt.registerTask('bower', function() {
        shelljs.exec('node_modules/bower/bin/bower install');
    });

    grunt.registerTask('bootstrap-compass', function() {
        shelljs.exec('bundle install');
    });

    grunt.registerTask('default', ['bower', 'bootstrap-compass', 'copy:favicon', 'imagemin:content-images', 'styles']);
    grunt.registerTask('dev', ['bower', 'bootstrap-compass', 'copy:favicon', 'imagemin:content-images', 'styles-dev', 'watch']);

    grunt.registerTask('styles', ['compass:compile', 'scsslint:all']);
    grunt.registerTask('styles-dev', ['compass:dev', 'scsslint:all']);

};
