/*jshint node:true*/
"use strict";

module.exports = function(grunt) {

    require( 'time-grunt' )( grunt );

    grunt.initConfig({

        connect: {
            server: {
                options: {
                    port: 8000,
                    keepalive: true,
                    base:'..'
                }
            }
        },
        karma: {
            options: {
                singleRun: false,
                reporters: ['dots']
            },
            /*headless: {
                configFile: 'enketo-test/karma.conf.js',
                browsers: ['PhantomJS']
            },*/
            browsers: {
                configFile: 'enketo-test/karma.conf.js',
                browsers: ['Chrome'/*, 'Firefox', 'Safari', 'Opera'*/]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('time-grunt');

    grunt.registerTask('serve', ['connect:server']);
    grunt.registerTask('test', ['karma:headless']);
};
