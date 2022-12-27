(function () {
    'use strict';

    // 初始化数据
    let pointArr = [{
        id: 1,
        title: 'xxx区富阳支会',
        type: 1,
        longitude: 119.966595,
        latitude: 30.054696,
        info: {
            icon: 'images/demo-government.png',
            address: '区人民政府',
            count: 123,
            area: 30
        }
    }, {
        id: 2,
        title: 'xxx区富春街道支会',
        type: 1,
        longitude: 119.941051,
        latitude: 30.047312,
        info: {
            icon: 'images/demo-government.png',
            address: '区富春街道办事处',
            count: 96,
            area: 103.95
        }
    }, {
        id: 3,
        title: 'xxx区春江街道支会',
        type: 2,
        longitude: 119.989457,
        latitude: 30.021011,
        info: {
            icon: 'images/demo-government.png',
            address: '区春江街道办事处',
            count: 96,
            area: 36.00
        }
    }, {
        id: 4,
        title: 'xxx区东洲街道支会',
        type: 2,
        longitude: 120.028273,
        latitude: 30.079008,
        info: {
            icon: 'images/demo-government.png',
            address: '区东洲街道办事处',
            count: 96,
            area: 77.71
        }
    }, {
        id: 5,
        title: 'xxx区鹿山街道支会',
        type: 3,
        longitude: 119.909888,
        latitude: 30.004241,
        info: {
            icon: 'images/demo-government.png',
            address: '区鹿山街道办事处',
            count: 96,
            area: 66.30
        }
    }, {
        id: 6,
        title: 'xxx区银湖街道支会',
        type: 4,
        longitude: 119.947536,
        latitude: 30.102512,
        info: {
            icon: 'images/demo-government.png',
            address: '区银湖街道办事处',
            count: 96,
            area: 104.03
        }
    }, {
        id: 7,
        title: 'xxx区新登镇支会',
        type: 5,
        longitude: 119.74104,
        latitude: 29.973502,
        info: {
            icon: 'images/demo-government.png',
            address: '区新登镇办事处',
            count: 96,
            area: 179.92
        }
    }, {
        id: 8,
        title: 'xxx区万市镇支会',
        type: 6,
        longitude: 119.580229,
        latitude: 30.100312,
        info: {
            icon: 'images/demo-government.png',
            address: '区万市镇办事处',
            count: 96,
            area: 155.14
        }
    }, {
        id: 9,
        title: 'xxx区大源镇支会',
        type: 7,
        longitude: 120.016802,
        latitude: 30.006822,
        info: {
            icon: 'images/demo-government.png',
            address: '区大源镇办事处',
            count: 96,
            area: 105.43
        }
    }, {
        id: 10,
        title: 'xxx区里山镇支会',
        type: 8,
        longitude: 120.072686,
        latitude: 30.055165,
        info: {
            icon: 'images/demo-government.png',
            address: '区里山镇办事处',
            count: 96,
            area: 25.43
        }
    }];
    let center = pointArr[0];
    let map;
    let point;

    initBmap();

    getBoundary();

    getMarkersAll();

    // ---------- 自定义方法 ---------- //

    // 初始化地图
    function initBmap() {
        // 初始化地图
        map = new BMap.Map('map');

        // 创建点坐标
        // 百度地图拾取坐标系统：http://api.map.baidu.com/lbsapi/getpoint/
        // 119.957967, 30.054627（富阳区人民政府）
        point = new BMap.Point(center.longitude, center.latitude);

        // 初始化地图，设置中心点坐标和地图级别
        map.centerAndZoom(point, 13);

        // 初始化导航
        map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_SMALL
        }));

        // 设置地图样式
        map.setMapStyleV2({
            // 眼眸
            styleId: '2477a11223ddb75b76e1aecb992ca616'
            // 绿野仙踪
            // styleId: '6e19d5eb068b72069b7b7793c1324ce0',
            // 新样式
            // styleId: '8520f4883b4e05ca693147c804d1a79c'
        });
    }

    // 创建轮廓线
    function getBoundary() {
        if (typeof map === 'undefined') {
            return false;
        }

        let boundary = new BMap.Boundary();
        boundary.get('富阳', (rs) => { // 获取行政区域
            rs.boundaries.forEach((item, index) => {
                let ply = new BMap.Polygon(item, {
                    strokeWeight: 3, // 设置多边形边线线粗
                    strokeOpacity: .8, // 设置多边形边线透明度0-1
                    // StrokeStyle: 'solid', // 设置多边形边线样式为实线或虚线，取值 solid 或 dashed
                    // strokeColor: '#48C2BA', // 设置多边形边线颜色
                    // fillColor: "#cccccc",
                    fillOpacity: .1
                });

                map.addOverlay(ply);
                map.setViewport(ply.getPath());
            });
        });
    }

    // 初始化所有标注
    function getMarkersAll() {
        if (typeof map === 'undefined') {
            return false;
        }

        pointArr.forEach((item, index) => {
            makeMarker(item);
        });
    }

    // 创建标注
    function makeMarker(item) {
        // 获取点
        let point = new BMap.Point(item.longitude, item.latitude);

        // 创建图标
        let icon = makeIcon(item.type);
        // 创建标注
        let marker = new BMap.Marker(point, {
            icon
        });

        // 添加点击
        marker.addEventListener('click', () => {
            let id = item.id;
            let title = item.title;
            let content = laytpl(TPL_INFO_WINDOW_CONENT.innerHTML).render({
                id,
                icon: item.info.icon,
                address: item.info.address,
                count: item.info.count,
                area: item.info.area
            });

            let infoWindow = makeInfoWindow({
                title,
                content
            });

            map.openInfoWindow(infoWindow, point);

            setTimeout(() => {
                $(`.info-window-content[data-id="${id}"]`).on('click', function () {
                    let html = laytpl(TPL_DEPARTMENT.innerHTML).render(item);

                    $('.content-panel[data-index="1"]').html(html).show();
                });
            }, 0);
        });

        // 绘点
        map.addOverlay(marker);
    }

    // 创建图标
    function makeIcon(type) {
        return new BMap.Icon(`images/icon-local-${type}.png`, new BMap.Size(24, 24), {
            // 指定定位位置
            // 当标注显示在地图上时，其所指向的地理位置距离图标左上
            // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
            // 图标中央下端的尖角位置
            anchor: new BMap.Size(12, 24)
            // 设置图片偏移
            // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
            // 需要指定大图的偏移位置，此做法与css sprites技术类似。
            // 设置图片偏移
            // imageOffset: new BMap.Size(0, 0 - index * 12)
        });
    }

    // 创建信息框
    function makeInfoWindow(option) {
        return new BMap.InfoWindow(option.content, {
            title: option.title,
            width: 160,
            height: 80
        });
    }

    // ---------- jQuery ---------- //

    $('.aside').on('click', '.depart-list li', function () { // 组织列表
        let $this = $(this);
        if ($this.hasClass('active')) {
            $this.removeClass('active');
        } else {
            $this.addClass('active');
        }
    }).on('click', '.search-button', function () { // 搜索
        let allOverlay = map.getOverlays();
        allOverlay.forEach(function (item, index) {
            if (item.toString() == '[object Marker]') {
                map.removeOverlay(item);
            }
        });

        let $depart_list_arr = $('.depart-list li.active');
        $depart_list_arr.each(function (index, el) {
            let type = $(el).attr('data-type');
            pointArr.forEach((item, index) => {
                if (item.type == type) {
                    makeMarker(item);
                }
            });
        });
    });

    $('.main').on('click', '.close', function () {
        let $this = $(this);
        let $content_panel = $this.parent('.content-panel');
        let index = parseInt($content_panel.attr('data-index'));

        if (index === 1) {
            $('.content-panel').hide();
        } else {
            $content_panel.hide();
        }
    }).on('click', '.content-panel[data-index="1"] .form-list li', function () {
        let $this = $(this);
        let $parent = $this.parent();
        let type = $parent.attr('data-type');

        let $list = $('.content-panel[data-index="1"] .form-list li');

        $list.each(function (index, ele) {
            let $item = $(ele);
            if ($item.hasClass('active')) {
                $item.removeClass('active');
            }
        });

        if ($this.hasClass('active')) {
            $this.removeClass('active');
        } else {
            $this.addClass('active');
        }

        let html = '';
        switch (type) {
            case 'leader':
                html = TPL_LEADER_DETAIL.innerHTML;
                break;
            case 'events':
                html = TPL_EVENTS_DETAIL.innerHTML;
                break;
            case 'mission':
                html = TPL_MISSION_DETAIL.innerHTML;
                break;
            case 'prize':
                html = TPL_PRIZE_DETAIL.innerHTML;
                break;
        }

        $('.content-panel[data-index="2"]').html(html).show();
    });

})();
