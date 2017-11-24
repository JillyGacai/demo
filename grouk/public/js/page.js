$(function(){
    'use strict';

    // 日期选择器
    $('.datepick').each(function() {
        var $this = $(this);
        $this.datepicker({
            format: $this.attr('data-format') || 'yyyy/mm/dd'
        });
    });

    // 文件上传
    $('.upload').each(function() {
        var $this = $(this);

        CreateUpload($this, function(rst) {
            console.log('上传成功回调');
        }, function(path) {
            console.log('文件删除回调');
        });
    });

    // 模态框
    $('.btn-modal').on('click', function() {
        var $this = $(this),
            type = $this.attr('for');

        switch (type) {
            case 'alert':
                Alert('点击了提示框');
                break;
            case 'alert_fn':
                Alert('点击了提示框，并回调', function() {
                    console.log('这里是回调方法，提示框关闭会执行');
                });
                break;
            case 'confirm':
                Modal({
                    title: '确认框',
                    content: '确定关闭？',
                    isbtn: true,
                    sure: function() {
                        console.log('点击了确定');
                    },
                    cancel: function() {
                        console.log('点击了取消');
                    }
                });
                break;
            case 'modal_sm':
                Modal({
                    type: 'sm',
                    title: '模态框 - 小(默认)',
                    content: '这个显示的是小型模态框(默认尺寸)',
                    isbtn: true,
                    sure: function() {
                        console.log('点击了确定');
                    },
                    cancel: function() {
                        console.log('点击了取消');
                    }
                });
                break;
            case 'modal_df':
                var html = '';

                Modal({
                    type: 'df',
                    title: '模态框 - 大',
                    content: '这个显示的是大型模态框',
                    isbtn: true,
                    sure: function() {
                        console.log('点击了确定');
                    },
                    cancel: function() {
                        console.log('点击了取消');
                    }
                });
                break;
            case 'modal_lg':
                Modal({
                    type: 'lg',
                    title: '模态框 - 超大',
                    content: '这个显示的是超大型模态框',
                    isbtn: true,
                    sure: function() {
                        console.log('点击了确定');
                    },
                    cancel: function() {
                        console.log('点击了取消');
                    }
                });
                break;
        }
    });

    // 表格数据操作
    // 图书数据月报表
    $('.bookReport-monthly-data-list').on('click', '.btn-view', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');

        // 测试数据 - 这里的数据可以来自ajax请求
        var data = [{
            date: '2017-09-09',
            bookId: '12345',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }];

        var html = [
            '<div class="table-responsive">',
            '<table class="table table-striped">',
            '<thead>',
            '<tr>',
            '<th>#</th>',
            '<th>时间</th>',
            '<th>图书ID</th>',
            '<th>书名</th>',
            '<th>作者名</th>',
            '<th>访问PV</th>',
            '<th>访问UV</th>',
            '<th>订阅次数</th>',
            '<th>订阅输入(金币)</th>',
            '</tr>',
            '</thead>',
            '<tbody class="data-list">',
            // 数据集
            '{{# for (var i = 0, len = d.length; i < len; i ++) { }}',
            '<tr>',
            '<td>{{ i + 1 }}</td>',
            '<td>{{ d[i].date }}</td>',
            '<td>{{ d[i].bookId }}</td>',
            '<td>{{ d[i].bookName }}</td>',
            '<td>{{ d[i].penName }}</td>',
            '<td>{{ d[i].pv }}</td>',
            '<td>{{ d[i].uv }}</td>',
            '<td>{{ d[i].count }}</td>',
            '<td>{{ d[i].income }}</td>',
            '</tr>',
            '{{# } }}',
            '</tbody>',
            '</table>',
            '</div>'
        ].join('');

        Modal({
            type: 'lg',
            title: '查看明细',
            content: laytpl(html).render(data),
            isbtn: true,
            sureText: '<i class="fa fa-download"></i> 导出',
            sure: function() {
                console.log('点击了确定');
            },
            cancel: function() {
                console.log('点击了取消');
            }
        });
    });

    // 充值日报表/充值月报表
    $('.recharge-daily-data-list, .recharge-monthly-data-list').on('click', '.btn-view', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');

        // 测试数据 - 这里的数据可以来自ajax请求
        var data = [{
            date: '2017-09-09',
            name: '韩寒',
            money: 50,
            from: '支付宝',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }, {
            date: '2017-09-09',
            name: '韩寒',
            money: 10,
            from: '微信',
            channelId: 12345
        }];

        var html = [
            '<div class="table-responsive">',
            '<table class="table table-striped">',
            '<thead>',
            '<tr>',
            '<th>#</th>',
            '<th>充值时间</th>',
            '<th>用户昵称</th>',
            '<th>充值金额</th>',
            '<th>充值来源</th>',
            '<th>渠道号</th>',
            '</tr>',
            '</thead>',
            '<tbody class="data-list">',
            // 数据集
            '{{# for (var i = 0, len = d.length; i < len; i ++) { }}',
            '<tr>',
            '<td>{{ i + 1 }}</td>',
            '<td>{{ d[i].date }}</td>',
            '<td>{{ d[i].name }}</td>',
            '<td>{{ d[i].money }}元</td>',
            '<td>{{ d[i].from }}</td>',
            '<td>{{ d[i].channelId }}</td>',
            '</tr>',
            '{{# } }}',
            '</tbody>',
            '</table>',
            '</div>'
        ].join('');

        Modal({
            type: 'lg',
            title: '查看详细',
            content: laytpl(html).render(data),
            isbtn: true,
            sureText: '<i class="fa fa-download"></i> 导出',
            sure: function() {
                console.log('点击了确定');
            },
            cancel: function() {
                console.log('点击了取消');
            }
        });
    });

    // 打赏日报表/打赏月报表
    $('.reward-daily-data-list, .reward-monthly-data-list').on('click', '.btn-view', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');

        // 测试数据 - 这里的数据可以来自ajax请求
        var data = [{
            date: '13:33',
            name: '韩寒',
            toName: '郭敬明',
            toType: '原创',
            money: 100,
            platform: 'H5'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }, {
            date: '13:10',
            name: '韩寒',
            toName: '郭敬明',
            toType: '作者',
            money: 100,
            platform: 'PC'
        }];

        var html = [
            '<div class="table-responsive">',
            '<table class="table table-striped">',
            '<thead>',
            '<tr>',
            '<th>#</th>',
            '<th>打赏时间</th>',
            '<th>打赏人昵称</th>',
            '<th>打赏对象</th>',
            '<th>对象类型</th>',
            '<th>打赏金额</th>',
            '<th>打赏平台</th>',
            '</tr>',
            '</thead>',
            '<tbody class="data-list">',
            // 数据集
            '{{# for (var i = 0, len = d.length; i < len; i ++) { }}',
            '<tr>',
            '<td>{{ i + 1 }}</td>',
            '<td>{{ d[i].date }}</td>',
            '<td>{{ d[i].name }}</td>',
            '<td>{{ d[i].toName }}</td>',
            '<td>{{ d[i].toType }}</td>',
            '<td>{{ d[i].money }}金币</td>',
            '<td>{{ d[i].platform }}</td>',
            '</tr>',
            '{{# } }}',
            '</tbody>',
            '</table>',
            '</div>'
        ].join('');

        Modal({
            type: 'lg',
            title: '查看明细',
            content: laytpl(html).render(data),
            isbtn: true,
            sureText: '<i class="fa fa-download"></i> 导出',
            sure: function() {
                console.log('点击了确定');
            },
            cancel: function() {
                console.log('点击了取消');
            }
        });
    });

    // 全站订阅日报表
    $('.subscription-daily-data-list').on('click', '.btn-view', function() {
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');

        // 测试数据 - 这里的数据可以来自ajax请求
        var data = [{
            date: '13:33',
            name: '韩寒',
            bookName: '将军在上',
            chapterName: '第一章 歪，妖妖灵吗',
            cost: 0.15,
            platform: 'H5'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }, {
            date: '13:20',
            name: '韩寒',
            bookName: '株距在侧',
            chapterName: '第十五章 歪，妖妖灵吗',
            cost: 0.10,
            platform: 'PC'
        }];

        var html = [
            '<div class="table-responsive">',
            '<table class="table table-striped">',
            '<thead>',
            '<tr>',
            '<th>#</th>',
            '<th>订阅时间</th>',
            '<th>用户昵称</th>',
            '<th>订阅图书</th>',
            '<th>章节名称</th>',
            '<th>消费金额</th>',
            '<th>消费平台</th>',
            '</tr>',
            '</thead>',
            '<tbody class="data-list">',
            // 数据集
            '{{# for (var i = 0, len = d.length; i < len; i ++) { }}',
            '<tr>',
            '<td>{{ i + 1 }}</td>',
            '<td>{{ d[i].date }}</td>',
            '<td>{{ d[i].name }}</td>',
            '<td>{{ d[i].bookName }}</td>',
            '<td>{{ d[i].chapterName }}</td>',
            '<td>{{ d[i].cost }}</td>',
            '<td>{{ d[i].platform }}</td>',
            '</tr>',
            '{{# } }}',
            '</tbody>',
            '</table>',
            '</div>'
        ].join('');

        Modal({
            type: 'lg',
            title: '查看详情',
            content: laytpl(html).render(data),
            isbtn: true,
            sureText: '<i class="fa fa-download"></i> 导出',
            sure: function() {
                console.log('点击了确定');
            },
            cancel: function() {
                console.log('点击了取消');
            }
        });
    });

    // demo页
    $('.demo-data-list').on('click', '.btn-view', function() { // 查看
        var $this = $(this),
            $tr = $this.closest('tr'),
            id = $tr.attr('data-id');

        // 测试数据 - 这里的数据可以来自ajax请求
        var data = [{
            date: '2017-09-09',
            bookId: '12345',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }, {
            date: '2017-09-10',
            bookId: '12346',
            bookName: '一座城池',
            penName: '韩寒',
            pv: 123,
            uv: 22,
            count: 10,
            income: 330
        }];

        var html = [
            '<div class="table-responsive">',
            '<table class="table table-striped">',
            '<thead>',
            '<tr>',
            '<th>#</th>',
            '<th>时间</th>',
            '<th>图书ID</th>',
            '<th>书名</th>',
            '<th>作者名</th>',
            '<th>访问PV</th>',
            '<th>访问UV</th>',
            '<th>订阅次数</th>',
            '<th>订阅输入(金币)</th>',
            '</tr>',
            '</thead>',
            '<tbody class="data-list">',
            // 数据集
            '{{# for (var i = 0, len = d.length; i < len; i ++) { }}',
            '<tr>',
            '<td>{{ i + 1 }}</td>',
            '<td>{{ d[i].date }}</td>',
            '<td>{{ d[i].bookId }}</td>',
            '<td>{{ d[i].bookName }}</td>',
            '<td>{{ d[i].penName }}</td>',
            '<td>{{ d[i].pv }}</td>',
            '<td>{{ d[i].uv }}</td>',
            '<td>{{ d[i].count }}</td>',
            '<td>{{ d[i].income }}</td>',
            '</tr>',
            '{{# } }}',
            '</tbody>',
            '</table>',
            '</div>'
        ].join('');

        Modal({
            type: 'lg',
            title: '查看',
            content: laytpl(html).render(data),
            isbtn: true,
            sureText: '<i class="fa fa-download"></i> 导出',
            sure: function() {
                console.log('点击了确定');
            },
            cancel: function() {
                console.log('点击了取消');
            }
        });
    }).on('click', '.btn-delete', function() { // 删除
        var $this = $(this),
            $tr = $this.closest('tr');

        Modal({
            title: '确认框',
            content: '确定删除该条数据？',
            isbtn: true,
            sure: function() {
                console.log('点击了确定');
                $tr.remove();
            }
        });
    });
});