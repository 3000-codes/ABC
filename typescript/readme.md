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
`target`属性指定编译后的版本，`es5`、`es6`、`es2015`、`es2016`、`es2017`、`es2018`、`es2019`、`es2020`、`es2021`、`esnext`。

```json
{
  "compilerOptions": {
    "target": "es5"
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

any使用场景: 1. 自定义守卫 2. as any 断言

```ts
function isString(data:any):data is string{
  return typeof data === 'string';
}

//Vue3
function isRef(r:any):r is Ref{
  return Boolean(r && r.__v_isRef); //any类型的r参数
}
```

unkknown使用场景: 一般作为函数参数

```ts
function foo(data:unknown){
  if(typeof data === 'string'){
    return data.concat('123');
  }
  if(typeof data === 'number'){
    return data.toPrecision(2);
  }
  data.toPrecision(2);
}
```

## type与interface
```ts
const symid = Symbol();
interface Person{
  [symid]:string|number;
  name:string;
  age:number;
}

type Name = Person['name']; // string
type Values = Person['name' | 'age']; // string | number
// type ID=Person[symis] //=>Error
type ID=Person[typeof symid] //=>string|number;

// keyof 获取对象的key
type PersonKeys = keyof Person; // 'name' | 'age'| typeof symid
let k1:PersonKeys=symid
console.log(k1);
```

## undefined

```ts
let str1:string
console.log(str1); //Error: 在赋值前使用了变量“str1”。(2454)
```
fix: 需要在tsconfig.json中配置`strictNullChecks`为`false`，才能使用。(不建议)

```ts
let str2:string|undefined
console.log(str2); //undefined 
```

```ts
//函数参数
function fn(data?:string){
  // 三种写法
  data?.toLocaleString();
  if(data)data.toLocaleString();
  data&&data.toLocaleString();
}
```

ps:
+ 可以赋值为`undefined`的类型`any`,`unknown`,`undefined`
+ 可以赋值为`null`的类型`any`,`unknown`,`null`

## 赋值易错点

```ts
let data1={
  name:'zs',
  age:18
}
let username='name'
let user=data1[username] //Error:元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型

// fix
let data2={
  name:'zs',
  age:18
}  
// const username2='name' //使用const锁定类型
let username2 : keyof typeof data2='name' //使用keyof获取对象的key
let user2=data2[username2] //zs
```

## interface与type区别

+ 定义类型范围不同
  + `interface`只能定义对象类型或函数类型
  + `type`可以定义任何类型,包括基本类型,联合类型,元组类型,枚举类型,交叉类型,类型别名

+ 拓展方式
  + `interface`可以使用`extends`关键字拓展一个或多个接口,也可以继承type
  + `type`可以使用`&`关键字拓展

+ 可以定义重名的属性
  + `interface`可以,结果会合并
  + `type`不可以,编译报错

## 元组

```ts
const account=[10,12,30,40,50];
account[0]=100; //可以

// 只读元组
const account2=[10,12,30,40,50] as const;
account2[0]=100; //Error: 无法分配到 "0" ，因为它是只读属性。(2540)

// 元组类型
// type Account=[number,number,number,number,number];
// type Account=[...number[]];
// type Account=[...Array<number>];
// type Account=number[];
type Account=Array<number>;
const account3:Account=[10,12,30,40,50];

// 元组tag
type Account2=[name_:string,age_:number,...rest_:number[]]; //为了区分元组中的每个元素,可以使用tag,无实际意义
const account4:Account2=['zs',18,10,12,30,40,50];
const [name,age,...rest]=account4;
```

## class中的static

懒汉模式

```ts
class Single{
  private static instance:Single;
  private constructor(){}
  static getInstance(){
    if(!this.instance){
      this.instance=new Single();
    }
    return this.instance;
  }
}

```

饿汉模式

```ts
class Single{
  private static instance:Single=new Single();
  private constructor(){}
  static getInstance(){
    return this.instance;
  }
}
Single.getInstance();
Single.instance
```

## class中的setter和getter

常搭配`private`使用

```ts
class Person{
  private _name:string;
  get name(){
    return this._name;
  }
  set name(name:string){
    this._name=name;
  }
}
```

## 装饰器本质

`Object.getOwnPropertyDescriptor`,该方法每次都会返回一个新的对象,所以每次都会执行装饰器

```ts
class Animal{
  name:string;
  age:number;
  constructor(name:string,age:number){
    this.name=name;
    this.age=age;
  }
  eat(){
    console.log('eat');
  }
  move(){
    console.log('move');
  }
}

const prop= Object.getOwnPropertyDescriptor(Animal.prototype,'eat')
const targetMethod=prop!.value;
prop!.value=function(...args:any[]){
  console.log('before');
  targetMethod.call(this,...args);
  console.log('after');
}
Object.defineProperty(Animal.prototype,'eat',prop!);
```

```ts
function log(target:any,propName:string,descriptor:PropertyDescriptor){
  const targetMethod=descriptor.value;
  descriptor.value=function(...args:any[]){
    console.log('before');
    targetMethod.call(this,...args);
    console.log('after');
  }
}

class Animal{
  name:string;
  age:number;
  constructor(name:string,age:number){
    this.name=name;
    this.age=age;
  }
  @log
  eat(){
    console.log('eat');
  }
  move(){
    console.log('move');
  }
}
```

## 编译选项

```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件 需要在源文件中导出声明才会生成
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件作为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "resolveJsonModule": true,               // 允许导入 '.json' 文件
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6) 
    /**
    node: Node.js 处理模块加载。 使用 Node.js 的查找算法来确定模块加载的文件。从当前目录开始，逐级向上查找父目录，直到根目录。
    classic: TypeScript 1.6 之前的处理模块加载。 从外层到内层逐级查找父模块。
    */
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```