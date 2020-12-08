/*
 * @Author: your name
 * @Date: 2020-12-06 02:37:43
 * @LastEditTime: 2020-12-07 19:22:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/cc.js
 */

const merchandise = {
    variations: [{
            name: "颜色",
            values: [{ name: "白色" }, { name: "红色" }],
        },
        {
            name: "尺码",
            values: [{ name: "39" }, { name: "40" }],
        },
        {
            name: "性别",
            values: [{ name: "男" }, { name: "女" }],
        },
    ],
    products: [{
            id: 1,
            variationMappings: [
                { name: "颜色", value: "白色" },
                { name: "尺码", value: "39" },
                { name: "性别", value: "男" },
            ],
        },
        {
            id: 2,
            variationMappings: [
                { name: "颜色", value: "白色" },
                { name: "尺码", value: "39" },
                { name: "性别", value: "女" },
            ],
        },
        {
            id: 3,
            variationMappings: [
                { name: "颜色", value: "白色" },
                { name: "尺码", value: "40" },
                { name: "性别", value: "男" },
            ],
        },
        {
            id: 4,
            variationMappings: [
                { name: "颜色", value: "白色" },
                { name: "尺码", value: "40" },
                { name: "性别", value: "女" },
            ],
        },
        {
            id: 5,
            variationMappings: [
                { name: "颜色", value: "红色" },
                { name: "尺码", value: "39" },
                { name: "性别", value: "男" },
            ],
        },
        {
            id: 6,
            variationMappings: [
                { name: "颜色", value: "红色" },
                { name: "尺码", value: "39" },
                { name: "性别", value: "女" },
            ],
        },
        {
            id: 7,
            variationMappings: [
                { name: "颜色", value: "红色" },
                { name: "尺码", value: "40" },
                { name: "性别", value: "男" },
            ],
        },
        {
            id: 8,
            variationMappings: [
                { name: "颜色", value: "红色" },
                { name: "尺码", value: "40" },
                { name: "性别", value: "女" },
            ],
        },
    ],
};

class Fun {
    constructor({ variations, products }) {
        this.tree = {};
        this.addNode(this.tree, 0, variations);
        console.log(this.tree, 'sssssssssss');
        this.addValues(this.tree, 0, products);
    }
    filterId(payload, count = 0, obj = this.tree) {
        if (count == payload.length - 1) {
            return obj[payload[count]];
        } else {
            return this.filterId(payload, count + 1, obj[payload[count]]);
        }
    }
    addNode(tree, deep, variations) {
        const variationNames = variations[deep].name;
        const variationVales = variations[deep].values;
        for (let i = 0; i < variationVales.length; i++) {
            // const rootName = variationNames + " " + variationVales[i].name;
            const rootName = variationVales[i].name;
            if (deep == variations.length - 1) {
                tree[rootName] = null;
            } else {
                tree[rootName] = {};
                this.addNode(tree[rootName], deep + 1, variations);
            }
        }
    }
    addValues(tree, deep, products) {
        if (deep > products.length - 1) return;
        const variationId = products[deep].id;
        const variationMappings = products[deep].variationMappings;
        const arr = new Array(variationMappings.length).fill("");
        this.addId(tree, arr, variationMappings, 0, variationId);
        this.addValues(tree, deep + 1, products);
    }
    addId(tree, arr, variationMappings, num, variationId) {
        // const names =
        //     variationMappings[num].name + " " + variationMappings[num].value;
        const names = variationMappings[num].value;
        arr[num] = names;
        if (arr.every((item) => item)) {
            tree[names] = variationId;
        } else {
            this.addId(
                tree[names],
                arr,
                variationMappings,
                num + 1,
                variationId
            );
        }
    }
}

class Fun2 {
    constructor({ variations, products }) {
        this.products = products;
        this.productsJson();
    }
    productsJson() {
        this.products.forEach((i) => {
            i["names"] = "";
            i.variationMappings.forEach((j) => {
                i["names"] += j.name + " " + j.value;
            });
        });
        console.log(this.products, 'aaa');
    }
    filterId(filterArr) {
        var filterNames = filterArr.join("");
        console.log(filterNames, "ssssssssssss");
        return this.products.find((item) => item.names === filterNames).id;
    }
}
console.time();
var fun = new Fun(merchandise);
// var filterArr = ["颜色 白色", "尺码 40", "性别 男"];
var filterArr = ["白色", "40", "男"];
var result = fun.filterId(filterArr);
console.log(result);
console.timeEnd();
// const result = fn()
// console.log(result);

// console.log(result);