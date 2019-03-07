/**
 * test for js
 * 
 * @author Gacai
 * @date 2019-03-07
 */
"use struct";

// ------------------------------------- //

var a = [];
a[2] = 2;
a[100] = 100;
for (var i in a) {
    console.log('a[' + i + '] == ', a[i]);
}
console.log('a == ', a);
console.log('this is click here ...');

var mine = function () {
    console.log('this is mine() ... ');
};

mine();

// ------------------------------------- //
