/*
 * @Author: your name
 * @Date: 2020-11-30 16:59:02
 * @LastEditTime: 2020-12-08 11:14:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/views/layout/index.vue';
// 自动导入module下所有模块
const routesArr = (modulesFiles => {
  return modulesFiles.keys().reduce((modules: any = [], modulePath) => {
    const value: any = modulesFiles(modulePath);
    modules.push(...value.default);
    return modules;
  }, []);
})(require.context('./module', false, /\.js$/));
console.log(routesArr, 'routesArrroutesArrroutesArrroutesArrroutesArr')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/goodSku'
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    meta: { title: '首页' },
    children: [{
      path: '',
      component: import('@/views/Home.vue'),
    }]
  },
  {
    path: '/test',
    name: 'test',
    component: Layout,
    meta: { title: '测试' },
    children: [{
      path: '',
      component: import('@/views/test.vue'),
    }]
  },
  ...routesArr
]

const router = createRouter({
  history: createWebHistory('/vue3/'),
  routes
})

export default router
