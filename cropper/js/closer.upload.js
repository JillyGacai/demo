/**
 * 将以base64的图片url数据转换为Blob
 *
 * @param dataURI
 * @param type
 * @returns {Blob}
 */
function getBlobBydataURI(dataURI, type) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for (var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: type});
}

/**
 * 裁剪图片
 *
 * @param option 对象
 *        对象:
 *          url:    图片地址
 *          width:  宽
 *          height: 高
 *          doneFn: 回调
 */
function cropImage(option) {
  // 上传图片
  var url = option.url,
    width = option.width || 200,
    height = option.height || 112.5,
    doneFn = option.done;

  // 跨域图片路径处理
  if (url.indexOf('?') !== -1) {
    url += '&t=' + Closer.util.toTime();
  } else {
    url += '?t=' + Closer.util.toTime();
  }

  // var ratio = 1;
  // try {
  //     ratio = window.devicePixelRatio;
  // } catch (e) {
  //     ratio = 1;
  // }

  // 上传对象
  var data = {};
  var newData = {
    width: 0,
    height: 0
  };

  // 设置双向数据绑定
  Object.defineProperty(data, 'width', {
    get: function () {
      return newData.width
    },
    set: function (w) {
      newData.width = w
    }
  });
  Object.defineProperty(data, 'height', {
    get: function () {
      return newData.height
    },
    set: function (h) {
      newData.height = h
    }
  });

  // 延迟加载，以免被关闭
  setTimeout(function () {

    Closer.ui.modal({
      type: 'df',
      title: '裁剪图片',
      content: laytpl(TPL_CROP_IMAGE.innerHTML).render({
        url: url,
        width: width,
        height: height,
      }),
      isbtn: true,
      render: function ($modal) {
        // 初始化裁剪控件
        try {
          new Promise(function (resovle, reject) {
            $modal.find('#cropper > img').cropper({
              scalable: false,
              viewMode: 2,
              aspectRatio: width / height,
              // checkCrossOrigin: false,
              minContainerWidth: 538,
              minContainerHeight: 302,
              crop: function (e) {
                // data.width = e.width / ratio;
                // data.height = e.height / ratio;

                data.width = width;
                data.height = height;

                // javascript 引擎排队 需要 时间加载
                resovle(setTimeout(function () {
                  var cvs = $modal.find('#cropper > img').cropper('getCroppedCanvas', {
                    width: data.width,
                    height: data.height,
                    fillColor: '#fff',
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: 'high'
                  });
                  data.base64 = cvs.toDataURL();
                }, 0));
              }
            });
          });
        } catch (e) {
          Closer.ui.toast('抱歉，你的浏览器不支持图片裁剪，建议使用 Chrome 或 Firefox，其他浏览器请运行在极速模式');
        }
      },
      sure: function ($modal, callback) {
        // base64 转换blob后 通FormData转换服务器可识别的数据格式
        var blob = getBlobBydataURI(data.base64, 'image/jpeg');
        var name = Date.parse(new Date()) + '.jpg';

        var formFile = new FormData();
        formFile.append('file', blob, name);
        delete data.base64;

        // --------------- //

        // 这里加上上传就可以
        // 我们的域名有限制，可以本地配置：local.grouk.com 或 local.tiejin.cn 来访问项目就能上传

        // --------------- //

        // 上传裁剪图片
        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: Closer.api.path + Closer.api.file,
          data: formFile,
          contentType: false,
          processData: false,
          headers: {
            // token
            Authorization: '1.8fb5abb621a358b40e49d3a1c98e10f4bb2c747efd484a01ce81a6f4809a710e'
          },
          success: function (rst) {
            try {
              // 返回的数据结构：rst.result
              // fid: "8XzvsXjagL",
              // sliceID: 0,
              // size: 95021,
              // attributes: {
              //     dimensions: {
              //         width: 461,
              //         height: 461
              //     }
              // },
              // contentType: "image\/jpeg",
              // url: "\/public\/8XzvsXjagL\/logo_s.jpg"

              // 入库
              var data2 = rst.result;
              doneFn({
                link: data2.url, // 短地址
                width: data.width,
                height: data.height,
                size: data2.size
              });

              callback();
            } catch (e) {
              Closer.log('file.crop =error= ', e);
              Closer.ui.toast('出错啦，请稍后重试');
            }
          },
          error: function (e) {
            Closer.log('file.crop =error= ', e);
            Closer.ui.toast('出错啦，请稍后重试');
          }
        });
      }
    });
  }, 500);
}

$(function () {
  $('body').on('click', '.add-btn', function () {
    var $this = $(this),
      width = 300,
      height = 300;

    cropImage({
      url: 'demo.jpg',
      width: width,
      height: height,
      done: function (data2) {

        console.log('data2 == ', data2);

      }
    });
  });
});
