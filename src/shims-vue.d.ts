/*
 * @Author: your name
 * @Date: 2020-11-30 16:59:02
 * @LastEditTime: 2020-12-01 15:20:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/src/shims-vue.d.ts
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
