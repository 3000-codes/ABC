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