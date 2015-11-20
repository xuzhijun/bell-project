'use strict';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var sassOption = 'expanded';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            script: {
                files: ['scripts/main.js'],
                tasks: ['script']
            },
            sass: {
                files: ['styles/scss/*.scss'],
                tasks: ['style']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'html/*.*',
                    'styles/main.min.css',
                    'scripts/main.min.js',
                    'img/{,*/}*'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: sassOption
                },
                files: {
                    'styles/main.css': 'styles/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles/',
                    src: 'main.css',
                    dest: 'styles/'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['*.css', '!*.min.css'],
                    dest: 'styles',
                    ext: '.min.css'
                }]
            }
        },

        jshint: {
            files: ['scripts/main.js']
        },
        //concat: {
        //    options: {
        //        separator: ';'
        //    },
        //    plugins: {
        //        src: ['libs/*.js'],
        //        dest: 'scripts/libs.js'
        //    }
        //},
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "scripts/main.es5.js": "scripts/main.js"
                }
            }
        },
        uglify: {
            main: {
                files: {
                    'scripts/main.min.js': ['scripts/main.es5.js']
                }
            }
        }
        //,
        //imagemin: {
        //    dist: {
        //        files: [{
        //            expand: true,
        //            cwd: 'images/',
        //            src: ['**/*.{png,jpg,gif}'],
        //            dest: 'images/'
        //        }]
        //    }
        //}
    });
    grunt.registerTask('style', [
        'sass',
        'autoprefixer',
        'cssmin'
    ]),
    grunt.registerTask('script', [
        'jshint',
        //'concat'
        'babel',
        'uglify'
    ]),
    grunt.registerTask('build', [
        'style',
        'script'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
