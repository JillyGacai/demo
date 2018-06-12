// color event
$(function () {
    'use strict';

    var index = 1;
    $('body').on('click', '.loading', function () { // 开场动画
        var $this = $(this);
        $this.addClass('hide');
        setTimeout(function () {
            $this.remove();
        }, 2950);
    });

    // .on('keyup', function (e) { // 页面切换
    //     // if (e.keyCode == 39) { // right
    //     //     $('body').find();
    //     // }
    //     //
    //     // if (e.keyCode == 37) { // left
    //     //
    //     // }
    // });
});
