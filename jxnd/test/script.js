// 配置OSS SDK
var client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAI5tAQRdyBKwUjdBadsQAq',
    accessKeySecret: 'WQ3YtegDitXwijdfDogHGXHMMGJ1XM',
    bucket: 'awaken-age'
});

// 获取照片URL列表
client.list({
    'max-keys': 1000,
    'prefix': '2023-4-29-五一武汉行/'
}).then(function(result) {
    var photos = result.objects;

    // 生成照片墙
    for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];

        // 判断文件类型为图片
        if (photo.size && photo.name.match(/\.jpe?g$|\.png$|\.gif$/i)) {
            var photoUrl = client.signatureUrl(photo.name, {expires: 3600}); // 生成URL，有效期为1小时
            $('#gallery').append('<div class="image"><a href="'+ photoUrl +'" ><img src="' + photoUrl + '"></a></div>'); // 添加到照片墙中
        }
    }

    $('.gallery').magnificPopup({
        delegate:'a',
        type:'image',
        gallery:{
            enabled:true
        }
    });
}).catch(function(err) {
    console.log(err);
});
