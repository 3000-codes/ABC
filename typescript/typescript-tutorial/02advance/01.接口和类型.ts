export {}
//接口是对象的状态(属性)和行为(方法)的抽象(描述)
interface Person {
  readonly name: string //只读属性
  age: number
  honor?: string[] //可选属性
  [propName: string]: any //任意属性(索引签名)
}

const LiBai: Person = {
  name: 'LiBai',
  age: 18,
  honor: ['武术']
}
// LiBai.name = 'LiBai' //error

type MyType = {
  readonly name: string //只读属性
  age: number
  honor?: string[] //可选属性
  [propName: string]: any //任意属性(索引签名)
}
const DuFu: MyType = {
  name: 'DuFu',
  age: 18,
  honor: ['武术'],
  skill: '拳击'
}
// DuFu.name = 'DuFu' //error

//拓展方式
//继承
interface Wommen extends Person {
  say(): void
}
//交叉
type MyTypePro = Person & {
  say(): void
}

//不同点
// type可以声明基本数据类型别名/联合类型/元组等，而interface不行
type Pig = {}
type Dog = {}
type Cat = {}
type UserName = string | number
// 联合类型
type Animal = Pig | Dog | Cat
type List = [string, boolean, number]

//interface能够合并声明，而type不行
interface Persons {
  name: string
}
interface Persons {
  age: number
}
// 此时Persons同时具有name和age属性
