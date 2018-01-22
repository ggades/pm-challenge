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
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/challenge.min.css': 'src/challenge.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('build', ['babel', 'uglify', 'cssmin']);
}
