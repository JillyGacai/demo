var Closer = (function () {
  /**
   * API
   */
  var api = {
    base: 'http://api-sandbox.tiejin.cn/command/',
    path: 'http://file-sandbox.tiejin.cn',
    file: '/file/upload/public',
    feedPath: 'http://h5-sandbox.tiejin.cn/feed/'
  };

  /**
   * UI Element Related
   */
  var ui = {
    modal: function (option) {
      /**
       * Modal
       * type: df, sm, lg
       * title
       * content
       * isbtn: false, true
       * render: callback after show animation
       * shown: callback after shown
       * sure: callback after click ok button
       */
      var type = typeof (option.type) !== 'undefined' ? option.type : 'md',
        title = typeof (option.title) !== 'undefined' ? option.title : 'Closer',
        isbtn = typeof (option.isbtn) !== 'undefined' ? option.isbtn : false,
        $modal = $('#_modal'),
        $sure = $modal.find('.modal-footer button[data-value="sure"]'),
        $cancel = $modal.find('.modal-footer button[data-value="cancel"]');

      if (option === 'close') {
        $modal.modal('hide');
        return;
      }

      $modal.find('.modal-footer').hide();
      $modal.find('.modal-dialog').attr('class', '').addClass('modal-dialog modal-' + type);
      $modal.find('.modal-title').show().find('span').text(title);
      $modal.find('.modal-body').html(option.content);

      if (typeof option.render === 'function') {
        option.render($modal);
      }

      if (isbtn) {
        $modal.find('.modal-footer').show();
        $sure.removeClass('disabled').html('确定');
        $cancel.off('click').on('click', function () {
          $modal.modal('hide');
        }).show();
      }

      // isbtn 与 $sure按钮  是兄弟关系  才能控制 按钮点击状态
      if (typeof option.sure === 'function') {
        $sure.off('click').on('click', function () {
          // 延迟处理
          $sure.addClass('disabled');
          setTimeout(function () {
            if (option.sure($modal, function () {
              $modal.modal('hide');
              $sure.removeClass('disabled').html('确定');
            }) !== false) {
              $sure.addClass('disabled').html('<i><span class="fa fa-spin fa-circle-o-notch"></span></i> 确定');
            } else {
              $sure.removeClass('disabled');
            }
          }, 500);
        });
      }

      // 点击空白处不关闭
      $modal.modal({
        backdrop: 'static'
      });
      $modal.modal('show');

      if (option.shown) {
        $modal.on('shown.bs.modal', function () {
          option.shown($modal);
        });
      }
    },
    confirm: function (t, sureback, cancelback) {
      var $confirm = $('#_confirm');
      $confirm.find('.modal-body').text(t);

      // 取消
      $confirm.find('button[data-value="cancel"]').off('click').on('click', function () {
        if (cancelback) cancelback();
        $confirm.modal('hide');
      });

      // 确认
      $confirm.find('button[data-value="sure"]').off('click').on('click', function () {
        if (sureback) sureback();
        $confirm.modal('hide');
      });

      // 点击空白处不关闭
      $confirm.modal({
        backdrop: 'static'
      });
      $confirm.modal('show');
    },
    toast: function (t, dely) {
      var $alert = $('#_alert');
      $alert.find('.modal-body').text(t);
      $alert.modal('show');

      if (typeof dely == 'undefined') {
        dely = 2000;
      }

      var timer = setTimeout(function () {
        $alert.modal('hide');
      }, dely);

      $alert.on('hidden.bs.modal', function () {
        timer && clearTimeout(timer);
      });
    }
  };

  /**
   * Ajax Request
   */
  function req(args, callback, errback) {
    var method = 'POST';
    var headers = {};

    headers.Authorization = '1.8fb5abb621a358b40e49d3a1c98e10f4bb2c747efd484a01ce81a6f4809a710e';

    if (args.method) {
      method = args.method;
    }

    $.ajax({
      url: api.base + args.url,
      data: args.data,
      method: method,
      headers: headers,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      success: function (rst) {
        if (debug) {
          console.log(args.url + ' = request = ', args.data);
          console.log(args.url + ' = response = ', rst);
        }

        if (rst.code != 0) {
          // User不存在
          if (rst.code == 3001) {
            callback(rst);
            return false;
          }

          // 特殊处理
          if (errback && (typeof errback == 'function')) {
            errback(rst.result);
          } else {
            ui.toast(rst.result);
          }
          return;
        }
        if (callback && (typeof callback == 'function')) {
          callback(rst.result);
        }
      },
      error: function (rst, err) {
        if (debug) {
          console.log(args.url + ' = request.error = ', args.data);
          console.log(args.url + ' = response.error = ', rst.responseJSON);
        }
        if (errback && (typeof errback == 'function')) {
          errback(rst.responseJSON);
        }
      }
    });
  }

  return {
    api: api,
    log: function (tips, args) {
      if (debug) {
        console.log(tips, args);
      }
    },
    req: function (args, callback, errback) {
      req(args, callback, errback);
    },
    util: {
      toTime: function () {
        return new Date().getTime();
      }
    },
    ui: {
      modal: function (args) {
        ui.modal(args);
      },
      confirm: function (t, sureback, cancelback) {
        ui.confirm(t, sureback, cancelback);
      },
      toast: function (t, d) {
        ui.toast(t, d);
      },
      go: function (url, blank) {
        if (url) {
          if (blank && blank == '_blank') {
            window.open(url, '_blank');
          } else {
            window.location.href = url;
          }
        } else {
          window.location.reload();
        }
      },
      clear: function () {
        window.onbeforeunload = null;
      }
    }
  };
})();
