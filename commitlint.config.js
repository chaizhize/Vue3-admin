module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        /**
         * git commit -m "upd: 更新 xxx 功能"
         * 重要事情说三遍，注意冒号后面有空格，注意冒号后面有空格，注意冒号后面有空格
         */
        "type-enum": [
            2, //代表必须输入
            "always", [
                "build", // 发布版本
                "upd", // 更新某功能（不是 feat, 不是 fix)
                "feat", // 新功能（feature）
                "fix", // 修补bug
                "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
                "docs", //修改了文档，比如README等
                "chore", //构建过程或辅助工具的变动
                "style", // 格式（不影响代码运行的变动）
                "revert", // 回滚到上一个版本
                "test", //测试用例，包括单元测试、集成测试等
                "perf", // 优化相关，比如提升性能、体验
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