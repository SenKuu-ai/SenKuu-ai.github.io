// 配置OSS SDK
var client = new OSS({
  region: 'oss-cn-shenzhen',
  accessKeyId: 'LTAI5tAQRdyBKwUjdBadsQAq',
  accessKeySecret: 'WQ3YtegDitXwijdfDogHGXHMMGJ1XM',
  bucket: 'awaken-age'
});

// 获取照片URL列表
client.list({
  'max-keys': 1000, // 最大返回1000个文件
  'prefix': '2023-4-29-五一武汉行/' // 指定获取以'photos/'开头的文件列表
}).then(function(result) {
  var photos = result.objects; // 获取文件列表

  // 生成照片墙
  for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];

      // 判断文件类型为图片
      if (photo.size && photo.name.match(/\.jpe?g$|\.png$|\.gif$/i)) {
          // 生成略缩图URL
          var thumbnailUrl = client.signatureUrl(photo.name, {process: 'image/resize,w_200'});

          // 生成原图URL，有效期为1小时
          var originalUrl = client.signatureUrl(photo.name, {expires: 3600});

          // 生成图片标签
          var $img = $('<img>').attr('src', thumbnailUrl).attr('data-original', originalUrl);

          // 绑定点击事件
          $img.on('click', function() {
              var $this = $(this);
              var originalUrl = $this.attr('data-original');

              // 显示原图
              $this.attr('src', originalUrl);

              // 添加下载链接
              var $downloadLink = $('<a>').attr('href', originalUrl).attr('download', '');
              $downloadLink[0].click();
          });

          // 添加到照片墙中
          $('#photo-wall').append($img);
      }
  } 

  // 启用懒加载插件
  $('#photo-wall').lazyload();
});
