module.exports = function(grunt) {

  grunt.initConfig({

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      spec: {
        src: ['spec/**/*-spec.js']
      }
    },

    watch: {
      spec: {
        files: ['spec/**/*.js', 'app/**/*.js', 'config/**/*.js'],
        tasks: ['spec'],
        options: {
          atBegin: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('spec', ['mochaTest:spec']);
  grunt.registerTask('default', 'spec');
}
