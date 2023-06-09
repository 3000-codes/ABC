## npm 命令行参数传递

运行`npm run build`时，运维希望可以传递 base 参数，以便在不同的环境下，可以指定不同的 base 路径，比如：

```json
// 初始配置
"scripts": {
  "build": "vite build"
}
```

传递需要`--`分割，如下：

```shell
npm run build -- --base=/test/
# 转换为
vite build --base=/test/
```
