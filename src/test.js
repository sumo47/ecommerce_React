//!  Write a Javascript program that takes a number as input and prints its multiplication table up to 10.

function table(argument) { for (let i = 1; i < 11; i++) { console.log(`${argument} * ${i} = ` + i * argument) } }

// a = null;
// console.log(typeof(a))

function modifyArray(arr, callback) {
    // do something to arr here
    arr.push(100);
    // then execute the callback function that was passed
    callback();
}

var arr = [1, 2, 3, 4, 5];

modifyArray(arr, function () {
    console.log("array has been modified", arr);
});


// table(7)