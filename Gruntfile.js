module.exports = function(grunt) {

    // Project configuration.
    // 初始化
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
     
      clean: {
         // Deletes all .js files, but skips min.js files
        js: ['build/js/*.js', '!build/js/*.min.js'], 
        // 自定义
        myDefault: ['build']
      },
      concat:{
       options:{
         separator: ';'
       },
       dist:{
         src: ['src/js/*.js'],
         dest: 'build/js/build.js'
       }
      },
      jshint: {
        files: ['Gruntfile.js', 'src/**/*.js'],
        options: {
         jshintrc: '.jshintrc'
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
          banner: '/*! <%= pkg.name %> -v<%= pkg.version %>- <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: '<%= concat.dist.dest %>',
          dest: 'build/js/build.min.js'
        }
      },
      // cssmin: {
      //   target: {
      //     files: [{
      //       expand: true,
      //       cwd: 'build/css',
      //       src: ['src/css/*.css'],
      //       dest: 'build/css',
      //       ext: '.min.css'
      //     }]
      //   }
      // }
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'build/css/output.min.css': ['src/css/*.css']
          }
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
    // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // 压缩合并css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // 实时监控文件变化
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 压缩js文件
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-qunit');
  
    // 默认被执行的任务列表。
    // 注册任务
    grunt.registerTask('con', ['clean：myDefault','concat', 'uglify']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  
  };
