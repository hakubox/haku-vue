# 戈吉网络前端框架

## 部分文件说明

1. .browserslistrc __浏览器兼容性配置文件__
2. .editorconfig __源代码文件换行/缩进/编码格式配置文件__
3. .env __全局配置文件__
4. .env.local __本地全局配置文件（优先级高于上条）__
5. .eslintrc.js __ESLint配置文件，用于js等源代码校验__
6. .gitignore __忽略提交配置文件__
7. .prettierrc.js __Prettier配置文件，用于js等源代码自定义格式化__
8. .babel.config.js __Babel配置文件，用于兼容低版本浏览器的ES代码转译__
9. LICENSE __开源声明__
10. package-lock.json __npm包缓存文件__
11. package.json __项目配置文件__
12. postcss.config.js __PostCSS配置文件__
13. todolist.todo __任务完成清单（非必要）__
14. vue.config.js __VueCLI配置文件__

## 安装项目
```
npm install
```

## 编译并运行（默认为开发环境）
```
npm run serve
```

## 编译并运行（测试环境）
```
npm run serve --mode test
```

## 编译并运行（正式环境）
```
npm run serve --mode production
```

## 编译并打包
```
npm run build
```

## 运行测试
```
npm run test
```

## 项目查错
```
npm run lint
```

## 运行单元测试
```
npm run test:unit
```

## 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).
