/*
 * @Author: your name
 * @Date: 2020-11-30 17:03:20
 * @LastEditTime: 2020-11-30 17:10:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/plugin/Antd.js
 */
import { createApp } from 'vue';
const app = createApp()

import 'ant-design-vue/dist/antd.css';
import { Button, message } from 'ant-design-vue';
app.use(Button)