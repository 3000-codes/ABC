### 环境搭建
concurrently: 用于同时运行多个命令，类似于npm run dev & npm run server，但是这种方式只能同时运行两个命令，如果要同时运行多个命令，就需要使用concurrently了
安装
```bash
npm install concurrently --save
```

```json
{
  "scripts": {
    "dev:build": "tsc -w",
    "dev:start": "nodemon --watch dist/teaching js --exec node ./dist/teaching/1ClassDecorator.js",
    "start": "concurrently npm:dev:*",
    "tsc": "tsc src/teaching/1ClassDecorator.ts --target ES5 -w --experimentalDecorators",
    "ctrl": "ts-node src/controller/HomeController.ts",
    "beainapp": "nodemon --watch src/ -e ts --exec ts-node ./src/expressapp.ts"
  }
}
```