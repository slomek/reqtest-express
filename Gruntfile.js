module.exports = function(grunt) {

	grunt.initConfig({
		jasmine_node: {
			test: {
		      options: {
		        coverage: {
		        	reportDir: 'build/coverage',
		        	print: 'none'
		        },
		        forceExit: true,
		        match: '.',
		        matchAll: false,
		        specFolders: ['test'],
		        extensions: 'js',
		        specNameMatcher: 'spec',
		        captureExceptions: true
		      },
		      src: ['index.js', 'lib/**/*.js']
		  }
		}
	});

    //grunt.loadNpmTasks('grunt-jasmine-node-coverage');
    grunt.loadNpmTasks('grunt-jasmine-node');

	grunt.registerTask('default', 'jasmine_node');

};