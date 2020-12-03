/*
 * @Author: your name
 * @Date: 2020-12-03 16:04:58
 * @LastEditTime: 2020-12-03 16:05:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/commitlint.config.js
 */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    husky: {
        hooks: {
            "pre-commit": "npm run test",
            "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS",
        },
    },
};