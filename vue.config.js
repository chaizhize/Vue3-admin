/*
 * @Author: your name
 * @Date: 2020-12-01 10:42:34
 * @LastEditTime: 2020-12-08 13:26:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/vue.config.js
 */
const cdnDomain = '//www.chaizz.cn/vue3/';
module.exports = {
    publicPath: process.env.ENV === 'production' ? cdnDomain : '/', //resolve('dist'),// 基本路径
    lintOnSave: false
}