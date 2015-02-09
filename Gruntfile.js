module.exports = function( grunt ) {
	require( "load-grunt-tasks" )( grunt );
	grunt.loadNpmTasks('grunt-6to5');

	grunt.initConfig({
		'6to5' : {
			options : {
				sourceMap : true,
				modules : 'amd'
			},
			dist : {
				files : [{
					expand: true,
					cwd: 'in/',
					src: ['**/*.js'],
					dest: 'dist/'
				}]
			}
		},

		'watch' : {
			scripts : {
				files : ['in/**/*.js'],
				tasks : ['6to5'],
				options : {
					reload : true,
					livereload : 35729
				}
			}
		}
	});

	grunt.registerTask('default', ['6to5']);
}