module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      stage: ['staging'],
      prod: ['build/*', '!build/package.json', '!build/package-lock.json', '!build/.gitignore', '!build/.git'],
      'above-stage': [
        'staging/assets/css/above-the-fold.css',
        'staging/assets/css/above-the-fold.css.map',
        'staging/assets/css/post-maps/above-the-fold.css.map'
      ],
      'above-prod': ['build/assets/css/above-the-fold.css']
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')()
        ]
      },
      stage: {
        src: 'staging/assets/css/*.css',
        options: {
          map: {
            inline: false,
            annotation: 'staging/assets/css/post-maps/'
          }
        }
      },
      prod: {
        src: 'build/assets/css/*.css',
        options: {
          map: false
        }
      }
    },
    sass: {
      stage: {
        files: [
          {expand: true, cwd: 'source/assets/sass', src: '*.scss', dest: 'staging/assets/css', ext: '.css'}
        ]
      },
      prod: {
        options: {
          sourcemap: 'none',
          style: 'compressed'
        },
        files: [
          {expand: true, cwd: 'source/assets/sass', src: '*.scss', dest: 'build/assets/css', ext: '.css'}
        ]
      }
    },
    watch: {
      scripts: {
        files: ['source/**/*.*'],
        tasks: ['sass:stage', 'postcss:stage', 'uglify:stage', 'copy:stage', 'htmlmin:stage', 'copy:above-stage', 'clean:above-stage'],
        options: {
          spawn: false
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      stage: {
        files: [
          {expand: true, cwd: 'source/assets/lib', src: './*.js', dest: 'staging/assets/lib', ext: '.min.js'}
        ]
      },
      prod: {
        files: [
          {expand: true, cwd: 'source/assets/lib', src: './*.js', dest: 'build/assets/lib', ext: '.min.js'}
        ]
      }
    },
    copy: {
      stage: {
        files: [
          {expand: true, cwd: 'source', src: './assets/images/**', dest: 'staging/'},
          {expand: true, cwd: 'source', src: './assets/lib/3rd/**', dest: 'staging/'},
          {src: 'source/server.js', dest: 'staging/server.js'}
        ]
      },
      prod: {
        files: [
          {expand: true, cwd: 'source', src: './assets/images/**', dest: 'build/'},
          {expand: true, cwd: 'source', src: './assets/lib/3rd/**', dest: 'build/'},
          {src: 'source/CNAME', dest: 'build/CNAME'}
        ]
      },
      'above-stage': {
        files: [
          {expand: true, cwd: 'staging', src: './*.html', dest: 'staging/'}
        ],
        options: {
          process: function(content) {
            const fs = require('fs');
            let above = fs.readFileSync('./staging/assets/css/above-the-fold.css', 'utf-8');
            return content.replace('{{above-css}}', `<style>${above}</style>`);
          }
        }
      },
      'above-prod': {
        files: [
          {expand: true, cwd: 'build', src: './*.html', dest: 'build/'}
        ],
        options: {
          process: function(content) {
            const fs = require('fs');
            let above = fs.readFileSync('./build/assets/css/above-the-fold.css', 'utf-8');
            return content.replace('{{above-css}}', `<style>${above}</style>`);
          }
        }
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      stage: {
        files: [
          {expand: true, cwd: 'source', src: './*.html', dest: 'staging/'}
        ]
      },
      prod: {
        files: [
          {expand: true, cwd: 'source', src: './*.html', dest: 'build/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('stage', ['clean:stage', 'sass:stage', 'postcss:stage', 'uglify:stage', 'copy:stage', 'htmlmin:stage', 'copy:above-stage', 'clean:above-stage']);
  grunt.registerTask('build', ['clean:prod', 'sass:prod', 'postcss:prod', 'uglify:prod', 'copy:prod', 'htmlmin:prod', 'copy:above-prod', 'clean:above-prod']);

};
