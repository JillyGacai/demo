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


  var list = [
    // 海哥
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTI',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTK',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTM',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTO',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTQ',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTS',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTU',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTW',
    'http://a.tiejin.cn/worldcup/worldcup-whY4I03ARjTY',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXf',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXg',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXh',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXi',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXj',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXk',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXl',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXm',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXn',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXo',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXp',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXq',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXr',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXs',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXt',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXu',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXv',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXw',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXx',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXy',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXz',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXA',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXB',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXC',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXD',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXE',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXF',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXG',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXH',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXI',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXJ',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXK',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXL',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXM',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXN',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXO',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXP',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXQ',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXR',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXS',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXT',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXU',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXV',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXW',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXX',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXY',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GXZ',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY0',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY1',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY2',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY3',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY4',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY5',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY6',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY7',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY8',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GY9',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYa',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYb',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYc',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYd',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYe',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYf',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYg',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYh',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYi',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYj',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYk',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYl',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYm',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYn',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYo',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYp',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYq',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYr',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYs',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYt',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYu',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYv',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYw',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYx',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYy',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYz',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYA',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYB',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYC',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYD',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYE',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYF',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYG',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYH',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYI',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYJ',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYK',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYL',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYM',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYN',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYO',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYP',
    'http://a.tiejin.cn/worldcup/worldcup-wiiX1wY24GYQ',
    'http://a.tiejin.cn/worldcup/worldcup-wiy57H4rF6bn',
    'http://a.tiejin.cn/worldcup/worldcup-wiy57H4rF6bo',
    'http://a.tiejin.cn/worldcup/worldcup-wiy57H4rF6bp',
    'http://a.tiejin.cn/worldcup/worldcup-wiy57H4rF6bq',
    'http://a.tiejin.cn/worldcup/worldcup-wiMhvyn5TKsi',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kh',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6ki',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kj',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kk',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kl',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6km',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kn',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6ko',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kp',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kq',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kr',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6ks',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kt',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6ku',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kv',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kw',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kx',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6ky',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kz',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kA',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kB',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kC',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kD',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kE',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kF',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kG',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kH',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kI',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kJ',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kK',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kL',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kM',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kN',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kO',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kP',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kQ',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kR',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kS',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kT',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kU',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kV',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kW',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kX',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kY',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6kZ',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6l0',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6l1',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6l2',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6l3',
    'http://a.tiejin.cn/worldcup/worldcup-wiSxDq3sc6l4',
    // '李欣另外加的50个',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90l',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90m',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90n',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90o',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90p',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90q',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90r',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90s',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90t',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90u',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90v',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90w',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90x',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90y',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90z',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90A',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90B',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90C',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90D',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90E',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90F',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90G',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90H',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90I',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90J',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90K',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90L',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90M',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90N',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90O',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90P',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90Q',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90R',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90S',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90T',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90U',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90V',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90W',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90X',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90Y',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV90Z',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV910',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV911',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV912',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV913',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV914',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV915',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV916',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV917',
    'http://a.tiejin.cn/worldcup/worldcup-wiY3GPwdV918',
    // '李乐要的10个',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sE6cb43qp',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sFYlaSujw',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sHQuaGVcD',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sJIDavm5K',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sLAMajMYR',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sNsVa8dRY',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sPl49WEL5',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sRdd9L5Ec',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sT5m9zwxj',
    'http://a.tiejin.cn/worldcup/worldcup-wj6sUXv9nXqq',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OrnxladMd',
    'http://a.tiejin.cn/worldcup/worldcup-wj6Os0fFLHpg',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OsCY0nb2j',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OtfGkYEFm',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OtSoFA8ip',
    'http://a.tiejin.cn/worldcup/worldcup-wj6Ouv70bBVs',
    'http://a.tiejin.cn/worldcup/worldcup-wj6Ov7PkN5yv',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OvKxFozby',
    'http://a.tiejin.cn/worldcup/worldcup-wj6Owng002OB',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OwZYkBwrE',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OKqltBitH',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OL33OcM6K',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OLFM8OfJN',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OMiutpJmQ',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OMVcO1cZT',
    'http://a.tiejin.cn/worldcup/worldcup-wj6ONxV8CGCW',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OOaDteafZ',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OONlNPDT2',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OPq48r7w5',
    'http://a.tiejin.cn/worldcup/worldcup-wj6OQ2Mt2B98'
  ];

  for (var i = 0, l = list.length; i < l; i++) {
    var url = list[i];
    console.log('url == ', url);

    window.open(url);
    // $.get(url);
  }
});
