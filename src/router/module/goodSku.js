/*
 * @Author: your name
 * @Date: 2020-11-30 17:22:35
 * @LastEditTime: 2020-12-03 15:25:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/router/module/goodSku.js
 */
/* 商品管理 */

import Layout from '@/views/layout'

export default [{
    path: '/goodSku',
    name: 'goodSku',
    component: Layout,
    meta: { title: '商品Sku' },
    children: [{
        path: '',
        component: import ('@/views/goodSku/index2.vue'),
    }]
}]