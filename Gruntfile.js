/**
 *
 * @author Guilherme Gades Vargas
 * @version 1.0.0
 **/
"use strict";

module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
  		options: {
  			presets: ['env']
  		},
  		dist: {
  			files: {
  				'src/challenge.legacy.js': 'src/challenge.js'
  			}
  		}
    },
    uglify: {
      my_target: {
        files: {
          'build/challenge.min.js': ['src/challenge.legacy.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['babel', 'uglify']);
}
