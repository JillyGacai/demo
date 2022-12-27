// Custom Operation
var public_vars = public_vars || {};
(function ($, window, undefined) {
  'use strict';

  $(document).ready(function () {
    // Main Vars
    public_vars.$body = $(document.body);
    public_vars.$pageContainer = public_vars.$body.find('.page-container');
    public_vars.$chat = public_vars.$pageContainer.find('#chat');
    public_vars.$sidebarMenu = public_vars.$pageContainer.find('.sidebar-menu');
    public_vars.$mainMenu = public_vars.$sidebarMenu.find('.main-menu');
    public_vars.$horizontalNavbar = public_vars.$body.find('.navbar.horizontal-menu');
    public_vars.$horizontalMenu = public_vars.$horizontalNavbar.find('.navbar-nav');
    public_vars.$mainContent = public_vars.$pageContainer.find('.main-content');
    public_vars.$userInfoMenuHor = public_vars.$body.find('.navbar.horizontal-menu');
    public_vars.$userInfoMenu = public_vars.$body.find('nav.navbar.user-info-navbar');
    public_vars.wheelPropagation = true; // used in Main menu (sidebar)
    public_vars.$pageLoadingOverlay = public_vars.$body.find('.page-loading-overlay');

    // 载入动画
    if (public_vars.$pageLoadingOverlay.length) {
      $(window).load(function () {
        public_vars.$pageLoadingOverlay.addClass('loaded');
      });
    }

    // 报错设置
    window.onerror = function () {
      // js报错
      Alert('页面中存在一些问题，导致JS报错 ... ');
      // failsafe remove loading overlay
      public_vars.$pageLoadingOverlay.removeClass('loaded');
    };

    // 右侧栏菜单
    setup_sidebar_menu();

    // 模态框 Esc 退出
    $(window).on('keydown', function (e) {
      // Escape
      var keycode = window.event ? e.keyCode : e.which;
      if (keycode == 27) {
        if (public_vars.$body.hasClass('modal-open')) {
          $('.modal-open .modal:visible').modal('hide');
        }
      }
    });
  });

  // 自适应 Enable/Disable
  var wid = 0;
  $(window).resize(function () {
    clearTimeout(wid);
    wid = setTimeout(trigger_resizable, 200);
  });
})(jQuery, window);

// ------ 侧栏效果 ------ //

var sm_duration = .2,
  sm_transition_delay = 150;

function setup_sidebar_menu() {
  if (public_vars.$sidebarMenu.length) {
    var $items_with_subs = public_vars.$sidebarMenu.find('li:has(> ul)'),
      toggle_others = public_vars.$sidebarMenu.hasClass('toggle-others');

    $items_with_subs.filter('.active').addClass('expanded');
    $items_with_subs.each(function () {
      var $li = $(this),
        $a = $li.children('a'),
        $sub = $li.children('ul');

      $li.addClass('has-sub');

      $a.unbind('click').on('click', function (ev) {
        ev.preventDefault();

        if (toggle_others) {
          sidebar_menu_close_items_siblings($li);
        }

        if ($li.hasClass('expanded') || $li.hasClass('opened')) {
          sidebar_menu_item_collapse($li, $sub);
        } else {
          sidebar_menu_item_expand($li, $sub);
        }
      });
    });
  }
}

function sidebar_menu_item_expand($li, $sub) {
  if ($li.data('is-busy')) return;

  $li.addClass('expanded').data('is-busy', true);
  $sub.show();

  var $sub_items = $sub.children(),
    sub_height = $sub.outerHeight();

  $sub_items.addClass('is-hidden');
  $sub.height(0);

  TweenMax.to($sub, sm_duration, {
    css: {
      height: sub_height
    },
    onUpdate: ps_update,
    onComplete: function () {
      $sub.height('');
    }
  });

  var interval_1 = $li.data('sub_i_1'),
    interval_2 = $li.data('sub_i_2');

  window.clearTimeout(interval_1);

  interval_1 = setTimeout(function () {
    $sub_items.each(function (i, el) {
      var $sub_item = jQuery(el);
      $sub_item.addClass('is-shown');
    });
    var finish_on = sm_transition_delay * $sub_items.length,
      t_duration = parseFloat($sub_items.eq(0).css('transition-duration')),
      t_delay = parseFloat($sub_items.last().css('transition-delay'));
    if (t_duration && t_delay) {
      finish_on = (t_duration + t_delay) * 1000;
    }
    // In the end
    window.clearTimeout(interval_2);
    interval_2 = setTimeout(function () {
      $sub_items.removeClass('is-hidden is-shown');
    }, finish_on);
    $li.data('is-busy', false);
  }, 0);

  $li.data('sub_i_1', interval_1);
  $li.data('sub_i_2', interval_2);
}

function sidebar_menu_item_collapse($li, $sub) {
  if ($li.data('is-busy')) return;

  var $sub_items = $sub.children();

  $li.removeClass('expanded').data('is-busy', true);
  $sub_items.addClass('hidden-item');

  TweenMax.to($sub, sm_duration, {
    css: {
      height: 0
    },
    onUpdate: ps_update,
    onComplete: function () {
      $li.data('is-busy', false).removeClass('opened');
      $sub.attr('style', '').hide();
      $sub_items.removeClass('hidden-item');
      $li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');
      ps_update(true);
    }
  });
}

function sidebar_menu_close_items_siblings($li) {
  $li.siblings().not($li).filter('.expanded, .opened').each(function (i, el) {
    var $_li = jQuery(el),
      $_sub = $_li.children('ul');
    sidebar_menu_item_collapse($_li, $_sub);
  });
}

// 滚动动画
function ps_update(destroy_init) {
  if (isxs()) return;
  if (jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
    if (public_vars.$sidebarMenu.hasClass('collapsed')) return;
    public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('update');
    if (destroy_init) {
      ps_destroy();
      ps_init();
    }
  }
}

function ps_init() {
  if (isxs()) return;
  if (jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
    if (public_vars.$sidebarMenu.hasClass('collapsed') || !public_vars.$sidebarMenu.hasClass('fixed')) return;
    public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({
      wheelSpeed: 2,
      wheelPropagation: public_vars.wheelPropagation
    });
  }
}

function ps_destroy() {
  if (jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
    public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy');
  }
}

// ------ Common ------ //

// 处理path
var Path = function (path) {
  return Global.base + path;
};

// 判断遮罩问题
var isModalBack = function () {
  if ($('.modal.in').length) {
    $(document.body).addClass('modal-open');
  }
};

/**
 * Modal
 * type: 尺寸大小：df, sm, lg
 * title: 标题
 * content: 内容或html
 * isbtn: 显示按钮：false, true
 * preload: 加载前执行方法
 * endload: 加载后执行方法
 * sure: 点击确认按钮事件
 * cancel: 点击取消按钮事件
 */
var Modal = function (option) {
  var type = typeof (option.type) != 'undefined' ? option.type : 'sm',
    title = typeof (option.title) != 'undefined' ? option.title : '提示',
    isbtn = typeof (option.isbtn) != 'undefined' ? option.isbtn : false,
    $modal = $('#_modal'),
    delay = 0;

  // 有用
  if (option == 'close') {
    $modal.modal('hide');
    return;
  }

  $modal.find('.modal-dialog').attr('class', '').addClass('modal-dialog modal-' + type);
  $modal.find('.modal-title').text(title);
  $modal.find('.modal-footer').hide();

  if (typeof option.preload == 'function') {
    option.preload();
    delay = 600;
  } else {
    $modal.find('.modal-body').html(option.content);
  }

  if (isbtn) {
    $modal.find('.modal-footer').show();
    if (typeof (option.sureText) != 'undefined' && option.sureText != '') {
      $modal.find('.modal-footer button[data-value="sure"]').html(option.sureText);
    } else {
      $modal.find('.modal-footer button[data-value="sure"]').html('确定');
    }
    if (typeof (option.cancelText) != 'undefined' && option.cancelText != '') {
      $modal.find('.modal-footer button[data-value="cancel"]').html(option.cancelText);
    } else {
      $modal.find('.modal-footer button[data-value="cancel"]').html('取消');
    }
    if (typeof option.sure == 'function') {
      $modal.find('.modal-footer button[data-value="sure"]').unbind('click').click(option.sure);
    }
  }

  setTimeout(function () {
    $modal.modal('show');
    if (typeof option.endload == 'function') {
      option.endload();
    }
  }, delay);

  // 修复点遮罩未触发
  $modal.on('hidden.bs.modal', function () {
    if (typeof option.cancel == 'function') {
      option.cancel();
    }
    isModalBack();
  });
};

/**
 * Alert
 * ct: 内容或html
 * cb: 回调函数
 */
var Alert = function (ct, cb) {
  var $alert = $('#_alert');
  $alert.find('.modal-body').text(ct);
  $alert.modal('show');
  $alert.on('hidden.bs.modal', function () {
    if (typeof cb == 'function') {
      cb();
    }
    isModalBack();
  });
  setTimeout(function () {
    $alert.modal('hide');
  }, 2000);
};

// Load
var Load = function (delay) {
  switch (typeof delay) {
    case 'number':
      setTimeout(function () {
        public_vars.$pageLoadingOverlay.addClass('loaded');
      }, delay);
      break;
    case 'function':
      setTimeout(function () {
        public_vars.$pageLoadingOverlay.addClass('loaded');
        delay();
      }, 700);
      break;
    case 'undefined':
      public_vars.$pageLoadingOverlay.removeClass('loaded');
      break;
    default:
      public_vars.$pageLoadingOverlay.addClass('loaded');
      break;
  }
};

// Go to Index
var Go = function (href) {
  href = typeof (href) == 'undefined' ? Path('/') : href;
  setTimeout(function () {
    if (href == window.location.href) {
      window.location.reload();
    } else {
      window.location.href = href;
    }
  }, 600);
};

// Store Url Back Histroy
var StoreBack = function (key, data) {
  localStorage.setItem('back_type_' + key, data);
};

// clear localStorage
var StoreClear = function () {
  var ver = Global.ver;
  if (ver != localStorage.getItem('store_ver')) {
    localStorage.clear();
    localStorage.setItem('store_ver', ver);
  }
};
StoreClear();

// upload file
var upload_config = {
  'url': {
    1: Path('/common/do/upload/file'),
    2: Path('/common/do/api_upload/file'),
    3: Path('/common/do/api_upload/img'),
    4: Path('/common/do/api_upload/course')
  }
};
var CreateUpload = function ($this, subfn, delfn) {
  // 上传按钮配置
  // <div class='upload' data-url='1' data-mode='image' data-type='' data-limit='1'>上传图片</div>
  // title: 按钮标题
  // url: 上传地址
  // mode: 上传模式 - image,excel,txt
  // type: 文件用途[只限url-3] - 查看/doc/remark.txt
  // limit: 限制数量 - 默认1

  var title = $this.html() || '上传文件',
    url = $this.attr('data-url') || 1,
    mode = $this.attr('data-mode'),
    type = $this.attr('data-type'),
    limit = $this.attr('data-limit') || 1,
    $df_upload = $this.next('.data-for-upload'),
    data_count = $df_upload.attr('data-count'),
    $li = $df_upload.find('li');

  if (typeof upload_config.url[url] == 'undefined') {
    Alert('文件上传地址错误，上传表单生成失败！');
    return;
  }

  // make url
  var action = upload_config.url[url],
    param = [];
  if (mode) {
    param.push('mode=' + mode);
  } else {
    Alert('缺少上传模式，上传表单生成失败！');
    return;
  }
  if (type) {
    param.push('type=' + type);
  }
  action += (param.length ? '?' + param.join('&') : '');

  var form_tpl = [ // 表单
      '<form class="frm_upload" action="' + action + '" method="POST" enctype="multipart/form-data">',
      '<ul class="upload-list">',
      '<li class="upload-btn">',
      '<input name="file" type="file" data-path="" />',
      '<div class="btn btn-sm btn-white upload-open">' + title + '</div>',
      '</li>',
      '</ul>',
      '</form>'
    ].join(''),
    file_tpl = [ // 一般文件
      '<li class="upload-file">',
      '<div class="upload-txt">',
      '<span></span>',
      '<a href="javascript:;" class="btn-link delete">×</a>',
      '</div>',
      '</li>'
    ].join(''),
    image_tpl = [ // 图片
      '<li class="upload-file image">',
      '<div class="upload-img">',
      '<img src="">',
      '</div>',
      '<div class="upload-txt">',
      '<span></span>',
      '<a href="javascript:;" class="btn-link delete">×</a>',
      '</div>',
      '</li>'
    ].join('');

  // make form
  $this.attr('class', '').html(form_tpl);

  // common
  var $frm = $this.find('.frm_upload'),
    $file = $this.find('input[name="file"]'),
    $button = $this.find('.upload-open'),
    $upload_btn = $this.find('.upload-btn');

  // 回填内容
  if ($li.length) {
    $li.insertBefore($upload_btn);
    limit -= data_count;
    if (!limit) {
      $upload_btn.hide();
    }
    $df_upload.remove();
  }

  $frm.on('submit', function () {
    Load();
    $frm.ajaxSubmit({
      dataType: 'json',
      success: function (rst) {
        var result = rst.result,
          code = rst.code;

        Load(function () {
          if (code) {
            $file.val('');
            Alert(result);
            if (code == 601) {
              Go();
            }
            return false;
          }
          // 限制
          limit--;
          if (!limit) {
            $upload_btn.hide();
          }

          var $upload_item;
          if (mode == 'image') {
            $upload_item = $(image_tpl).insertBefore($upload_btn);
            $upload_item.find('.upload-img img').attr('src', result.url);
          } else {
            $upload_item = $(file_tpl).insertBefore($upload_btn);
          }
          // 输出所有返回字段
          for (var r in result) {
            $upload_item.data(r, result[r]);
          }
          $upload_item.find('.upload-txt span').html('<a href="' + result.url + '" target="_blank">' + result.name + '</a>');

          if (typeof subfn == 'function') {
            subfn(result);
          }

          $file.val('');
        });
      },
      error: function (rst) {
        Load(function () {
          Alert('服务器错误，稍后重试');
          $file.val('');
        });
      }
    });
    return false;
  }).on('click', '.btn-link.delete', function () {
    var $item = $(this).closest('.upload-file');

    limit++;
    if (limit) {
      $upload_btn.show();
    }
    $item.remove();

    if (typeof delfn == 'function') {
      delfn($item.data('path'));
    }
  });

  $file.on('mouseover', function () {
    $button.css({
      background: '#f7f7f7'
    });
  }).on('mouseout', function () {
    $button.css({
      background: '#ffffff'
    });
  }).on('change', function () {
    if (!$file.val()) return false;
    $frm.submit();
  });
};
