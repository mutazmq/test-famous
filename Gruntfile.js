/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		eslint: {
			target: ['app/src/*.js', 'app/src/**/*.js'],
			options: {
				config: '.eslintrc'
			}
		},
		jscs: {
				src: ['app/src/*.js', 'app/src/**/*.js'],
				options: {
					config: '.jscsrc'
				}
		},
		lesslint: {
				src: ['app/styles/styles.less'],
				options: {
					imports: ['**/*.less'],
					csslint: {
						csslintrc: '.csslintrc'
					}
				}
		},
		cordovacli: {
			options: {
				path: './'
			},
			cordova: {
				options: {
					command: ['run'],
					platforms: ['android'],
					//plugins: ['device','dialogs'],
					path: './',
					id: 'com.sarooja.GCC_crsh',
					name: 'GCC_crsh'
				}
			},
			"run-android": {
				options: {
					command: 'run',
					platforms: ['android']
				}
			}
		},
		concurrent: {
			target: {
					tasks: ['serve', 'cordovacli:run-android'],
					options: {
						logConcurrentOutput: true
					}
				}
		},
		exec: {
			'build': 'webpack -d',
			'build-prod': 'webpack -p',
			'open': 'open www/index.html',
			'clean': 'rm -rf ./www',
			'serve': 'webpack-dev-server -w -d --inline --reload=localhost --content-base platforms/browser',
			'open-serve': 'open http://localhost:8080'
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-lesslint');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-cordovacli');

	// Default task.
	grunt.registerTask('default', ['eslint', 'jscs', 'lesslint', 'exec:build']);
	grunt.registerTask('prod', ['exec:clean', 'eslint', 'jscs', 'lesslint', 'exec:build-prod']);
	grunt.registerTask('open', ['exec:open']);
	grunt.registerTask('clean', ['exec:clean']);
	grunt.registerTask('serve', ['exec:open-serve', 'exec:serve', 'exec:android-device']);
	grunt.registerTask('open-serve', ['exec:open-serve']);
	grunt.registerTask('serve-deploy', ['default', 'concurrent:target']);
};
