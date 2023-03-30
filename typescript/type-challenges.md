# type-challenges 技巧

### 常用方法解释

##### keyof

+ `keyof T` 获取 T 的所有属性名组成的联合类型，`T` 为对象类型。
+ `T[K]` 获取 T 中 K 属性的类型，`T` 为对象类型，`K` 为属性名。
  + 当`T`为元组类型时，`K`为数字类型，`T[K]`为元组中的元素类型。
  + 当`T`为数组类型时，`K`为`'length'`,可以获取数组的长度。

##### extends

+ `T extends U` 判断 `T` 是否可以赋值给 `U`。常用在赋值语句中,相当于前置断言。
+ `T extends U ? X : Y` 三元表达式，当 `T` 可以赋值给 `U` 时，返回 `X`，否则返回`Y`。
  + `T extends true ? X : Y` 可以用于判断 `T` 是否为 `true`。
  + `keyof T[P] extends never ? X : Y` 可以用于判断 `T[P]` 是否为基础类型。

```ts
type A1 = 'x' extends 'x' ? string : number // string
type A2 = 'x' | 'y' extends 'x' ? string : number // number
type A3 = 'y' | 'x' extends 'x' ? string : number // number
type A4 = 'y' extends 'x' | 'y' ? string : number // string
type A5 = 'y' | 'x' extends 'x' | 'y' ? string : number // string

type P<T> = T extends 'x' ? string : number
type B = P<'x' | 'y'> // string | number

// never是所有类型的子类型
type A = never extends 'x' ? string : number; // string

type B = P<never> 
```
+ **A1的extends**： 就是条件类型的普通用法
+ **A2~A5的extends**： 如果extends前面或者后面或者都是union类型 前面的类型为后面类型的子集。这里的A extends B是指类型A是类型B的子集
+ **B的extends**： 如果是泛型的话，会将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。`never`拆开后是空集,所以 `P<never>`将不会被判断，所以结果为`never`。



#### 常用高级类型

+ `Exclude<T, U>` 从 T 中剔除可以赋值给 U 的类型。
+ `Extract<T, U>` 提取 T 中可以赋值给 U 的类型。
+ `Omit<O, T>` 从 T 中剔除 K 中的属性。
+ `Pick<O, T>` 从 T 中提取 K 中的属性。

ps:此处`T`,`U`,`K` 代表联合类型，`O` 代表对象，`P` 代表属性

#### 自定义工具函数

```ts
// 使用中间类型,如果 C=A,C=B,则A=B
type Equal<A,B> = (<C>()=>C extends A?1:2) extends (<C>()=>C extends B?1:2)?true:false

// isAny:根据相似性判断是否为any
type IsAny<T> = 0 extends (1 & T) ? true : false
```

###  遍历元组

#### 00011-easy-tuple-to-union

```ts
type TupleToUnion<T extends any[]> = keyof {
  [P in T[number]]:P
}

type TupleToUnion<T extends any[]> = T extends Array<infer U>?U:never

```

#### 00011-easy-tuple-to-object

```ts
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]:P
}
```

### 遍历字符串

字符串=>元组

```ts
type StringToArray<T extends string, S extends string = ''> = T extends `${S}${infer R}` ? [S, ...StringToArray<R>] : []
```


### 高级类型的实现

#### 00003-medium-omit & 00004-easy-pick


```ts
type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K?never :P]:T[P]
}

type MyOmit<T, K extends keyof T>={
  [P in Exclude<keyof T,K>]:T[P]
}

type MyPick<T, K extends keyof T> = {
  [P in keyof T as P extends K ?P:never]:T[P]
  // [P in Extract<keyof T,K>]:T[P]
}

```

+ `P in keyof T as P extends K?never :P` 等价于 `P in Exclude<keyof T,K>`
+ `P in keyof T as P extends K ?P:never` 等价于 `P in Extract<keyof T,K>`


#### 00008-medium-readonly-2

```ts
type MyReadonly2<T, K extends keyof T= keyof T> =
{
  readonly [P in K]:T[P]
}&
{
  [P in  Exclude<keyof T,K>]:T[P]
}

// 终极解法
type MyReadonly2<T, K extends keyof T = keyof T> = Readonly<Pick<T, K>> & Omit<T, K>

```
+ 当需要两个类型而只传递了一个参数时，可以使用默认参数
+ 当需要遍历两个类型时，可以使用联合类型