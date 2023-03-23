export{}
let a: undefined = undefined
let b: null = null

let str: string = 'zhangmazi'
// str = null // 非严格模式编译正确
// str = undefined // 非严格模式编译正确
// 开启严格模式后， null 和 undefined 只能赋值给 void 和它们各自的类型。

//any会跳过类型检查器对值的检查，任何值都可以赋值给any类型
let value: any = 1
value = 'zhangmazi' // 编译正确
value = [] // 编译正确
value = {} // 编译正确

// void 意思就是无效的, 一般只用在函数上，告诉别人这个函数没有返回值。
function run(): void {}

// never 意思就是永远不会有返回值的类型，
// 函数执行时抛出了异常
// 执行无限循环的代码

function error(msg: string): never {
  // 编译正确
  throw new Error(msg)
}
function loopForever(): never {
  // 编译正确
  while (true) {}
}

// unknown与any一样，所有类型都可以分配给unknown
// 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。
// unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any
let value1: unknown = 1
value1 = 'zhangmazi' // 编译正确
value1 = false // 编译正确

let object0: Object
object0 = 1 // 编译正确
object0 = 'a' // 编译正确
object0 = true // 编译正确
// object0 = null; // 严格模式报错
// object0 = undefined; // 严格模式报错
object0 = {} // ok

let object1: {}
object1 = 1 // 编译正确
object1 = 'a' // 编译正确
object1 = true // 编译正确
// object1 = null // 严格模式报错
// object1 = undefined // 严格模式报错
object1 = {} // ok


let object2: object
// object2 = 1 // 报错
// object2 = 'a' // 报错
// object2 = true // 报错
// object2 = null // 报错
// object2 = undefined // 报错
object2 = {} // ok

//小object 用于表示所有的非原始类型，即我们不能把 number、string、boolean、symbol等 原始类型赋值给 object
//大object和{} 代表所有拥有 toString、hasOwnProperty 方法的类型 所以所有原始类型、非原始类型都可以赋给 Object(严格模式下 null 和 undefined 不可以)