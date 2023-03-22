# typescript 查漏补缺
## 环境搭建

安装
```bash
# 全局安装
npm install -g typescript
# 本地安装
npm install typescript --save-dev
```

搭建
```bash
# 初始化
tsc --init
```

## 编译

使用`tsc` 命令编译会查找`tsconfig.json`文件，如果没有会使用默认配置进行编译。

找到`tsconfig.json`文件，修改`outDir`属性，指定编译后的文件存放位置。

```json
{
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```
`rootDir`属性指定编译的根目录，如果不指定，会默认为当前目录。

```json
{
  "compilerOptions": {
    "rootDir": "./src"
  }
}
```

## 24个TS类型

+ 基本类型: `boolean`, `number`, `string`, `null`, `undefined`, 
+ 根类型: `Object`, `{}`
+ 对象类型: `Array`, `Function`, `object`
+ 枚举类型: `enum`
+ 特殊类型: `any`, `void`, `never`, `unnknown`,元组,可变元组
+ 合成类型:联合类型,交叉类型
+ 字面量数据类型

## 联合类型和typpeof

联合类型: `|`，表示取值可以为多种类型中的一种。

```ts
type DataFlow=string|number;
function foo(data:DataFlow){
   data.xxx() //这里只能调用string和number的共有方法
  if(typeof data === 'string'){
    // 这里只能调用string的方法
    return data.concat('123');
  }
  if(typeof data === 'number'){
    // 这里只能调用number的方法
    return data.toPrecision(2);
  }
  data.toPrecision(2);
}
```

## 枚举

为了解决switch case的问题，可以使用枚举。

值和键可以相互映射。

```ts
enum Color {
  Red,
  Green,
  Blue
}

log(Color.Red); // 0
log(Color[0]); // Red
```

## any与unknown

+ 相同点: 是任何类的父类,任何类型都可以赋值给他们
+ 不同点: 
  + `any`也可以是任何类的子类,`unknown`不可以
  + 不能使用`unknown`的类型的变量来获取任何属性和方法,`any`可以

```ts
let data:any=[1,2,3];
let data2:number=data  //可以 (any是number的子类)

let data3:unknown=[1,2,3];
let data4:number=data3 //不可以 (unknown不是number的子类)
```
