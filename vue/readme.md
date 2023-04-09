# vue

## 搭建项目

```bash
pnpm create vite@latest #然后选择 vue-ts
# 或者直接
pnpm create vue@3  #推荐,生态更完善

```

### 项目结构

```bash
├── README.md
├── node_modules
├── package.json
├── scripts # 脚本目录
├── public 
├── src # 项目源码目录,只有这个目录下的文件会被热更新
│   ├── apis # 接口目录,可以根据模块划分
│   ├── App.vue # 根组件
│   ├── assets # 静态资源目录
│   ├── components # 公共组件目录
│   ├── composables # 常用的组合式函数
│   ├── main.ts # 入口文件
│   ├── router # 路由
│   ├── store # vuex或者其他状态管理
│   ├── styles # 公共样式
│   ├── utils # 工具函数
│   └── views # 页面目录
├── index.html # 页面打包入口文件,必须有
├── tsconfig.json # ts配置文件
└── vite.config.ts # vite配置文件
```

### 代码规范 & 代码检查 & 代码格式化 eslint

```bash
# 安装eslint
pnpm add -D eslint 

# 初始化
pnpx eslint --init

```

### 代码提交规范(根目录下才行)

```bash
# 安装
pnpx mrm@2 lint-staged
```
会在package.json中添加如下配置

```json
"scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "*",
    "lint-staged": "*"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx,vue}":[
      "npm run lint:fix",
      "git add"
    ]
  }
```

#### 提交说明

[阮一峰](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
`<type>(<scope>): <subject>` ,其中`<type>`为必填项,

+ feat: 新功能
+ fix: 修复bug
+ docs: 文档
+ style: 代码格式
+ refactor: 重构
+ perf: 性能优化
+ test: 测试
+ build: 构建
+ ci: CI/CD
+ chore: 其他

#### commitlint

[commitlint](https://commitlint.js.org/#/guides-local-setup)是一个用于检查提交信息的工具,可以根据配置的规则来检查提交信息是否符合规范,如果不符合规范,则会报错,并且不允许提交.

```bash
# 安装
pnpm add -D @commitlint/{config-conventional,cli}
# for windows
pnpm add -D @commitlint/config-conventional @commitlint/cli
# 初始化
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# 如果执行过 pnpx mrm@2 lint-staged ,则直接跳到 配置husky
# 安装husky
pnpm add -D husky
# 初始化
pnpx husky install

# 配置husky
pnpx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"' # 报错就手动创建commit-msg文件,然后再执行这个命令
```


### 项目配置

#### vite.config.ts

```ts
#
```