export {}
//typeof :该关键字除了做类型保护,还能进行类型推断
let p1 = {
  name: '张三',
  age: 18,
  gender: '男'
}
type Person = typeof p1
const getName = (person: Person) => person.name

//keyof: 用于生成一个对象的所有键名的联合类型
type props = keyof Person //keyof Person返回一个字符串数组，包含所有属性名称
const getProp = (person: Person, prop: props) => person[prop]
console.log(getProp(p1, 'name'))

//in :用来遍历枚举类型

type Man = {
  [pp in props]: any
}

let libai: Man = {
  name: 'libai',
  age: 100,
  gender: ''
}

// infer :类型推断
//https://www.jb51.net/article/216050.htm
//https://mp.weixin.qq.com/s/aMzaGfnx6RM7VkJiE2-yKw
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
/**
T extends U ? X : Y的形式为条件类型
infer R代表待推断的返回值类型，如果T是一个函数(...args: any[]) => infer R，则返回函数的返回值R，否则返回any
 */
type PromiseResType<T> = T extends Promise<infer R> ? R : T

const stringPromise = async () => 'string'
const personPromise = async () => libai

type StringPromise = ReturnType<typeof stringPromise>
type StringPromiseRes = PromiseResType<StringPromise>


//extends :用于类型保护(泛型约束)
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
//现在这个泛型函数被定义了约束，因此它不再是适用于任意类型
// loggingIdentity(3);  // Error, number doesn't have a .length property
loggingIdentity({length: 10, name: '张麻子'}); // 编译正确