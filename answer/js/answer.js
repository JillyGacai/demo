// answer event
$(function () {
  'use strict';

  // 选择题
  $('.choice-list').on('click', 'li', function () {
    var $this = $(this),
      $parent = $this.closest('.choice-list'),
      $select = $parent.find('li.select'),
      status = $parent.attr('data-status') || 'false',
      limit = parseInt($parent.attr('data-limit') || 0); // limit:0-不定选项，1-限定一个，2-限定两个...

    // 已完成，不可再点击
    if (status == 'true') {
      return false;
    }

    // 取消选中
    if ($this.hasClass('select')) {
      $this.removeClass('select');
      return false;
    }

    // 不定选项
    if (limit != 0) {
      // 定选项
      if ($select.length >= limit) {
        return false;
      }
    }
    $this.addClass('select');
  });

  // 按钮
  $('.operation').on('click', '.btn-resolve', function () { // 查看解析
    if ($(this).hasClass('disable')) return false; // 11.03新增

    // 定位
    var $modal = $('.modal'),
      $body = $('body'),
      clientWidth = window.innerWidth,
      clientHeight = window.innerHeight;

    $body.addClass('modal-open');

    $modal.addClass('fadeIn').find('.modal-page').css({
      height: clientHeight - 147,
      width: clientWidth - 200
    });
  }).on('click', '.btn-check', function () { // 检查
    var $this = $(this),
      $choice_list = $('.choice-list'),
      $choice_li = $choice_list.find('li'),
      choice_len = $choice_li.length,
      status = $choice_list.attr('data-status'),
      answer = $choice_list.attr('data-answer') || $('input[name="answer"]').val();

    if (status == 'true') {
      return false;
    } else {
      if (answer != '') {
        var answer_arr = answer.split(','),
          answer_len = answer_arr.length;

        for (var i = 0; i < answer_len; i++) {
          $choice_li.each(function (index) {
            if ((index + 1) == answer_arr[i]) {
              $(this).addClass('correct');
            }
          });
        }

        $choice_li.each(function () {
          if ($(this).hasClass('select') && !$(this).hasClass('correct')) {
            $(this).addClass('wrong');
          }
        });
      }
    }

    $this.val('完成');
    $choice_list.attr('data-status', 'true');

    $('.btn-resolve').removeClass('disable'); // 11.03新增
  });

  // modal 关闭
  $('.modal').on('click', '.close', function () {
    $('body').removeClass('modal-open');
    $('.modal').removeClass('fadeIn');
  });

});
