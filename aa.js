/*
 * @Author: your name
 * @Date: 2020-12-02 10:43:22
 * @LastEditTime: 2020-12-02 11:15:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/aa.js
 */

// var use = [{
//         name: "zhangsan",
//         age: 26,
//         id: 1,
//     },
//     {
//         name: "lisi",
//         age: 27,
//         id: 2,
//     },
//     {
//         name: "wangwu",
//         age: 28,
//         id: 3,
//     },
// ];

const arr = new Array(1000000)
    .fill({
        name: "wangwu",
        age: 28,
        id: 3,
    })

function fn1() {
    const result = JSON.parse(JSON.stringify(arr, ["name", "age"]));
}

function fn2() {
    const result = arr.map((item) => {
        const { id, ...items } = item;
        return items
    });
}
fn1();
fn2();

/**
    [
        { name: 'zhangsan', age: 26 },
        { name: 'lisi', age: 27 },
        { name: 'wangwu', age: 28 }
    ]
 */





const promise1 = Promise.resolve('promise1');
const promise2 = Promise.reject('promise2')
const promise3 = Promise.resolve('promise3')

const promises = [promise1, promise2, promise3];
Promise.race(promises).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})