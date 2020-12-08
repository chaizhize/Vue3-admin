/*
 * @Author: your name
 * @Date: 2020-11-30 17:22:35
 * @LastEditTime: 2020-12-08 11:13:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/router/module/goodSku.js
 */
/* 商品管理 */

import Layout from "@/views/layout";

export default [{
        path: "/goodSku",
        name: "goodSku",
        component: Layout,
        meta: { title: "商品Sku" },
        children: [{
            path: "",
            component: import ("@/views/goodSku/index.vue"),
        }, ],
    },
    {
        path: "/goodSku2",
        name: "goodSku2",
        component: Layout,
        meta: { title: "商品Sku2" },
        children: [{
            path: "",
            component: import ("@/views/goodSku/index2.vue"),
        }, ],
    },
];





// const specification1 = computed(() => {
//     const { specification } = props;
//     return (
//         specification.length > 0 &&
//         specification[0].value.some((item) => item.name)
//     );
// });
// const specification2 = computed(() => {
//     const { specification } = props;
//     const result =
//         specification.length > 1 &&
//         specification[1].value.some((item) => item.name);
//     console.log(result, "resultresultresult");
//     return result
// });
// const specification3 = computed(() => {
//     const { specification } = props;
//     return (
//         specification.length > 2 &&
//         specification[2].value.some((item) => item.name)
//     );
// });