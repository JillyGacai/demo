/**
 * test for js
 *
 * @author Gacai
 * @date 2019-03-07
 */
// "use struct";

require(['modal'], function (module) {
  console.log('module == ', module);

  console.log('this is test ...');
});

// ------------------------------------- //

// var a = [];
// a[2] = 2;
// a[100] = 100;
// for (var i in a) {
//     console.log('a[' + i + '] == ', a[i]);
// }
// console.log('a == ', a);
// console.log('this is click here ...');

// var mine = function () {
//     console.log('this is mine() ... ');
// };

// mine();

// ------------------------------------- //
// null, undefined, string, number, boolean
// var a = new Array(1, 2, 3, 4, 5);
// var a = String('1111');

// console.log('a == ', a);
// console.log('typeof a = ', typeof a);
// console.log('a.constructor === String', a.constructor === String);
// console.log('a.constructor === Array', a.constructor === Array);
// console.log('a.constructor === Object', a.constructor === Object);
// console.log('a.constructor === Function', a.constructor === Function);
// console.log('Array.prototype.toString.call(a) = ', Array.prototype.toString.call(a));


// for (let i = 0; i < 5; i++) {
//     setTimeout(function (j) {
//         console.log('j == ', j);
//         console.log('i == ', i);
//     }, 0, i);
// }

// var flag = false;
// var mine = new Promise(function (resolve, reject) {
//     try {
//         let json = '))';
//         JSON.parse(json);
//         resolve('this is resolve');
//     } catch (error) {
//         reject(error, 'this is reject');
//     }
// });

// mine.then(function (resolve_data) {
//     console.log('data == ', resolve_data);
// }).catch(function (reject_error, reject_data) {
//     console.log('error == ', reject_error);
//     console.log('data == ', reject_data);
// });

try {
  var json = '{kk}';
  JSON.parse(json);
  console.log('success');
} catch (error) {
  console.log('error == ', error);
}
