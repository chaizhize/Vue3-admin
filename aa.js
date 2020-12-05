/*
 * @Author: your name
 * @Date: 2020-12-02 10:43:22
 * @LastEditTime: 2020-12-04 21:52:07
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
            name: "短"
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

function fn() {
    for (let i = 0; i < arr.length; i++) {
        var obj = {
            name: "123",
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