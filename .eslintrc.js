module.exports = {
    root: true,
    env: {
        node: true
    },
    rules: {
        "no-multi-spaces": 0,
        "object-shorthand": 0,
        "no-console": 0,
        "no-debugger": 0,
        quotes: 0,
        "quote-props": 0,
        "vue/script-indent": 0,
        "no-script-url": 1,
        "no-var": 1,
        "new-cap": 0,
        "no-magic-numbers": 0,
        "space-before-blocks": [0, "always"],
        "space-before-function-paren": [0, "always"],
        "no-param-reassign": 2,
        "newline-per-chained-call": 0,
        "vue/html-quotes": 1,
        "vue/no-multi-spaces": 0,
        "vue/no-confusing-v-for-v-if": 1,
        "vue/no-v-html": 1,
        "vue/no-unused-vars": 0,
        "no-unused-vars": 0
    },
    parserOptions: {
        parser: "babel-eslint",
        ecmaFeatures: {
            legacyDecorators: true
        }
    },
    extends: ["plugin:vue/essential"], //, "@vue/prettier"
    globals: {
        _: true
    },
};
