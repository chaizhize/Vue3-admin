/*
 * @Author: your name
 * @Date: 2020-12-02 10:43:22
 * @LastEditTime: 2020-12-07 16:04:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/aa.js
 */
var arr = [
    [{
            name: "大",
        },
        {
            name: "红",
        },
        {
            name: "长",
        },
    ],
    [{
            name: "大",
        },
        {
            name: "红",
        },
        {
            name: "短",
        },
    ],
    [{
            name: "大",
        },
        {
            name: "蓝",
        },
        {
            name: "长",
        },
    ],
    [{
            name: "大",
        },
        {
            name: "蓝",
        },
        {
            name: "短",
        },
    ],
    [{
            name: "大",
        },
        {
            name: "紫",
        },
        {
            name: "长",
        },
    ],
    [{
            name: "大",
        },
        {
            name: "紫",
        },
        {
            name: "短",
        },
    ],
    [{
            name: "小",
        },
        {
            name: "红",
        },
        {
            name: "长",
        },
    ],
    [{
            name: "小",
        },
        {
            name: "红",
        },
        {
            name: "短",
        },
    ],
    [{
            name: "小",
        },
        {
            name: "蓝",
        },
        {
            name: "长",
        },
    ],
    [{
            name: "小",
        },
        {
            name: "蓝",
        },
        {
            name: "短",
        },
    ],
    [{
            name: "小",
        },
        {
            name: "紫",
        },
        {
            name: "长",
        },
    ],
    [{
            name: "小",
        },
        {
            name: "紫",
        },
        {
            name: "短",
        },
    ],
];
var list = [];
console.log(arr.length);

function fn() {
    for (let i = 0; i < arr.length; i++) {
        var obj = {
            name: "123",
            // ['spec' + (i + 1)]: (() => {
            //     for (let j = 0; j < arr[i].length; j++) {
            //         return arr[i][j].name
            //     }
            // })(),
        };
        for (let j = 1; j <= 3; j++) {
            obj[
                (() => {
                    return "spec" + j;
                })()
            ] = ((j) => {
                for (let index = 0; index < arr[i].length; index++) {
                    return arr[i][j - 1].name;
                }
            })(j);
        }
        list.push(obj);
    }
    console.log(list);
}
fn();

// Function.prototype.myCall = function(context = global, ...arg) {
//     if (this === Function.prototype) {
//         return undefined;
//     }
//     context = context || global;
//     const fn = Symbol();
//     context[fn] = this;
//     context[fn](...arg);
// };
// Function.prototype.myApply = function(context = window, args) {
//     if (this === Function.prototype) {
//         return undefined; // 用于防止 Function.prototype.myCall() 直接调用
//     }
//     const fn = Symbol();
//     context[fn] = this;
//     let result;
//     if (Array.isArray(args)) {
//         result = context[fn](...args);
//     } else {
//         result = context[fn]();
//     }
//     delete context[fn];
//     return result;
// }

// Function.prototype.myBind = function(context = global, ...args1) {
//     if (this === Function.prototype) {
//         return undefined;
//     }
//     const _this = this;
//     return function F(...args2) {
//         if (this instanceof F) {
//             return new _this(...args1, ...args2)
//         }
//         return _this.apply(context, [...args1, ...args2])
//     };
// };
// var obj = {
//     name: 'zhangsan',
// };

// function fun(name) {
//     this.name = name
// }
// // fun.myCall(obj)
// var f1 = new fun('f1')
// var f2 = fun.myBind(obj, "f2");
// var f3 = new f2("f3");
// console.log(f1);
// console.log(f3);