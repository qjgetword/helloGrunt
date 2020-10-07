module.exports = function(grunt) {

    // Project configuration.
    // 初始化
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js'],
        options: {
          globals: {
            jQuery: true,
            console: true,
            module: true
          }
        }
      },
      qunit: {
        files: ['src/**/*.html']
      },
      watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      }
    });
  
    // 加载包含 "uglify" 任务的插件。
    // 加载插件
    // js语法检查
    grunt.loadNpmTasks('grunt-contrib-jshint');
    // 清除文件
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 合并多个文件到一个文件中
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 压缩HTML
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
   // 压缩图片无损
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    // 压缩合并css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 实时监控文件变化
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 压缩js文件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    grunt.loadNpmTasks('grunt-contrib-qunit');
  
    // 默认被执行的任务列表。
    // 注册任务
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  
  };
