/*
 * @Author: your name
 * @Date: 2020-12-03 16:04:58
 * @LastEditTime: 2020-12-03 16:15:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-goodsku/commitlint.config.js
 */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2, //代表必须输入
            "always", [
                "upd" | "update",
                "feat",
                "fix",
                "refactor",
                "docs",
                "chore",
                "style",
                "revert",
            ],
        ],
        "type-case": [0],
        "type-empty": [0],
        "scope-empty": [0],
        "scope-case": [0],
        "subject-full-stop": [0, "never"],
        "subject-case": [0, "never"],
        "header-max-length": [0, "always", 72],
    },
};