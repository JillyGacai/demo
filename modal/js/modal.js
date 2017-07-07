// 摸态框
$(function() {
    'use strict';

    // demo
    $('.btn.demo').on('click', function() {
        var $this = $(this),
            type = $this.attr('data-type'),
            name = $this.attr('data-name');

        switch (type) {
            case 'modal':
                Modal({
                    name: name,
                    // size: '',
                    // title: '',
                    // content: '',
                    sureName: '确定',
                    sureCb: function() {
                        Alert('this is Alert ...');
                        return false;
                    },
                    cancelName: '取消',
                    cancelCb: function() {
                        return true;
                    }
                });
                break;
            case 'confirm':
                Confirm({
                    title: '确认框',
                    content: '确定要执行该操作么？',
                    sureCb: function() {
                        Alert('你点击了确定 ...');
                        return false;
                    }
                });
                break;
            case 'alert':
                Alert('哈哈哈哈哈');
                break;
            case 'fullscreen':
                FullScreen({
                    name: 'fullscreen',
                    // size: '',
                    // title: '',
                    // content: '',
                    sureName: '确定',
                    sureCb: function() {
                        Alert('this is Alert ...');
                        return false;
                    },
                    cancelName: '取消',
                    cancelCb: function() {
                        return true;
                    }
                });
                break;

        }
    });

    // 判断遮罩问题
    var isModalBack = function() {
        var $body = $('body'),
            $backdrop = $('.modal-backdrop'),
            $modal = $('.modal.in');
        if ($modal.length) {
            $body.addClass('modal-open');
            if (!$backdrop.hasClass('in')) {
                $backdrop.addClass('in');
            }
        } else {
            $body.removeClass('modal-open');
            $backdrop.removeClass('in');
        }
    };

    // modal
    $('.modal').bind('modal.show', function() {
        var $this = $(this);
        $this.addClass('in');
        isModalBack();
    }).bind('modal.hide', function() {
        var $this = $(this);
        $this.removeClass('in');
        isModalBack();
    }).on('click', '.modal-close', function() {
        $('.modal').trigger('modal.hide');
    }).on('click', '.modal-footer .btn', function() {
        $('.modal').trigger('modal.hide');
    }).on('click', '.hint-close', function() {
        $(this).closest('.hint').hide();
    });

    // backdrop
    $('.modal-backdrop').on('click', function() {});

    // 其他事件 ...

});

/**
 * Modal(摸态框)
 * 说明: 支持多个摸态框，支持确定按钮和取消按钮自定义回调函数
 * 数量: 可自定义多个, 多个请分配不同className
 * 尺寸: default(480px) small(360px) large(560px) xlarge(720px)
 * 参数:
 *   option:
 *     1-文本: name 必须，类名
 *     实例:
 *     Modal(name);
 *     2-对象: 如下
 *     name: 必须 类名, 避免冲突
 *     size: 非必须 尺寸: default(480px) small(360px) large(560px) xlarge(720px)
 *     title: 非必须 标题: 提示(默认)
 *     content: 非必须 内容: 内容(默认)
 *     sureName: 非必须 确定按钮名称: 确定(默认)
 *     sureCb: 非必须 确定按钮回调函数, 默认关闭弹框
 *     cancelName: 非必须 取消按钮名称: 取消(默认)
 *     cancelCb: 非必须 取消按钮回调函数, 默认关闭弹框
 *     备注: 其中 name size title content sureName cancelName 可以直接写在html中
 *     实例:
 *     Modal({
 *        name: 'name',
 *        size: '',
 *        title: '提示',
 *        content: '点击确定按钮弹出Alert',
 *        sureName: '确定',
 *        sureCb: function() {
 *           Alert('this is Alert ...');
 *           return false;
 *        },
 *        cancelName: '取消',
 *        cancelCb: function() {
 *            return true;
 *        }
 *     });
 *  其他: 单独关闭可执行
 *      $('.modal.' + name).trigger('modal.hide');
 */
var Modal = function(option) {
    var modal = '.modal';
    if (typeof option == 'string') {
        modal += '.' + option;
    }
    // 类名
    if (typeof option.name != 'undefined') {
        modal += '.' + option.name;
    }
    var $modal = $(modal + '[data-type="modal"]');
    // 尺寸
    if (typeof option.size != 'undefined') {
        $modal.find('.modal-dialog').addClass(option.size);
    }
    // 标题
    if (typeof option.title != 'undefined') {
        $modal.find('.modal-title').html(option.title || '提示');
    }
    // 内容
    if (typeof option.content != 'undefined') {
        $modal.find('.modal-body').html(option.content || '内容');
    }
    // 确定按钮
    if (typeof option.sureName != 'undefined') {
        $modal.find('.modal-footer .btn-sure').text(option.sureName || '确定');
    }
    // 取消按钮
    if (typeof option.cancelName != 'undefined') {
        $modal.find('.modal-footer .btn-cancel').text(option.cancelName || '取消');
    }
    $modal.trigger('modal.show');
    // 确定事件
    if (typeof option.sureCb == 'function') {
        $modal.find('.modal-footer .btn-sure').unbind('click').click(option.sureCb);
    }
    // 取消事件
    if (typeof option.cancelCb == 'function') {
        $modal.find('.modal-footer .btn-cancel').unbind('click').click(option.cancelCb);
    }
};

/**
 * Confirm(确认框)
 * 说明: 包含确定按钮和取消按钮，支持确定按钮自定义回调函数
 * 数量: 一个
 * 尺寸: small(360px)
 * 参数:
 *   option:
 *     title: 非必须 标题: 提示(默认)
 *     content: 非必须 内容: 内容(默认)
 *     sureCb: 非必须 确定按钮回调函数, 默认关闭弹框
 * 实例:
 *   Confirm({
 *      title: '确认框',
 *      content: '确定要执行该操作么？',
 *      sureCb: function() {
 *          Alert('你点击了确定 ...');
 *          return false;
 *      }
 *   });
 *  其他: 单独关闭可执行
 *      $('.modal[data-type="confirm"]').trigger('modal.hide');
 */
var Confirm = function(option) {
    var $confirm = $('.modal[data-type="confirm"]');
    // 标题
    if (typeof option.title != 'undefined') {
        $confirm.find('.modal-title').html(option.title || '提示');
    }
    // 内容
    if (typeof option.content != 'undefined') {
        $confirm.find('.modal-body').html(option.content || '内容');
    }
    $confirm.trigger('modal.show');
    // 确定事件
    if (typeof option.sureCb == 'function') {
        $confirm.find('.modal-footer .btn-sure').unbind('click').click(option.sureCb);
    }
};

/**
 * Alert(提示框)
 * 说明: 不含操作按钮，2秒后自动关闭
 * 数量: 一个
 * 尺寸: small(360px)
 * 参数:
 *   option:
 *      1-文本:直接作为内容;
 *      实例:
 *          Alert('这里是内容');
 *      2-对象:
 *          content: 必须 文本或html
 *          callBack: 非必须 回调函数
 *      实例:
 *          Alert({
 *              content: '这里是内容',
 *              callBack: function() {
 *                  return false;
 *              }
 *          });
 *  其他: 单独关闭可执行
 *      $('.modal[data-type="alert"]').trigger('modal.hide');
 */
var Alert = function(option) {
    var $alert = $('.modal[data-type="alert"]');
    // 内容
    if (typeof option == 'string') {
        $alert.find('.modal-body').html(option || '内容');
    }
    if (typeof option.content != 'undefined') {
        $alert.find('.modal-body').html(option.content || '内容');
    }
    $alert.trigger('modal.show');
    $alert.on('modal.hide', function() {
        if (typeof option.callBack == 'function') {
            option.callBack();
        }
    });
    // 2秒自动关闭
    setTimeout(function() {
        $alert.trigger('modal.hide');
    }, 2000);
};

/**
 * FullScreen(全屏框)
 * 说明: 支持多个摸态框，支持确定按钮和取消按钮自定义回调函数
 * 数量: 可自定义多个, 多个请分配不同className
 * 尺寸: 全屏
 * 参数:
 *   option:
 *     1-文本: name 必须，类名
 *     实例:
 *     FullScreen(name);
 *     2-对象: 如下
 *     name: 必须 类名, 避免冲突
 *     title: 非必须 标题: 提示(默认)
 *     content: 非必须 内容: 内容(默认)
 *     备注: 其中 name title 可以直接写在html中
 *     实例:
 *     FullScreen({
 *        name: 'name',
 *        title: '提示',
 *        content: '点击确定按钮弹出Alert',
 *     });
 *  其他: 单独关闭可执行
 *      $('.modal.' + name).trigger('modal.hide');
 */
var FullScreen = function(option) {
    var modal = '.modal';
    if (typeof option == 'string') {
        modal += '.' + option;
    }
    // 类名
    if (typeof option.name != 'undefined') {
        modal += '.' + option.name;
    }
    var $modal = $(modal + '[data-type="fullscreen"]');
    // 标题
    if (typeof option.title != 'undefined') {
        $modal.find('.modal-title').html(option.title || '提示');
    }
    // 内容
    if (typeof option.content != 'undefined') {
        $modal.find('.modal-body').html(option.content || '内容');
    }
    $modal.trigger('modal.show');
}
