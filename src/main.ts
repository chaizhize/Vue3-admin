/*
 * @Author: your name
 * @Date: 2020-11-30 16:59:02
 * @LastEditTime: 2020-12-03 14:54:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/main.ts
 */
import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus';

import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App)
app.use(store).use(router).use(Antd).use(ElementPlus).mount('#app')
