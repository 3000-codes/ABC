export {}
let libai = {
  name: 'libai',
  age: 100,
  gender: ''
}
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any
/**
T extends U ? X : Y的形式为条件类型
infer R代表待推断的返回值类型，如果T是一个函数(...args: any[]) => infer R，则返回函数的返回值R，否则返回any
 */

//推断prmoise的返回值类型
type PromiseResType<T> = T extends Promise<infer R> ? R : T

const stringPromise = async () => 'string'
const personPromise = async () => libai

type StringPromise = ReturnType<typeof stringPromise>
type StringPromiseRes = PromiseResType<StringPromise> //string

type PersonPromise = ReturnType<typeof personPromise>
type Person = PromiseResType<PersonPromise> //Person

//反解函数入参
type Fn<T extends any[]> = (...args: T) => any
type FnArgs<U> = U extends Fn<infer T> ? T : any

const stringFn = (name: string, gender: string): void => {}
type StringFn = FnArgs<typeof stringFn> //string[]

//元组转联合类型
type ElementOf<T> = T extends Array<infer U> ? U : never
type TupleTest = [number, string]
type ToUnion = ElementOf<TupleTest> //number | string

//类相关
//获取实例化参数类型
type ConstroctorParameters<T extends new (...args: any[]) => any> = T extends new (...args: infer P) => any ? P : never
type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer P ? P : any
class TestClass {
  constructor(public name: string, public string: number) {}
}

type Params = ConstroctorParameters<typeof TestClass>
type Instance = MyInstanceType<typeof TestClass> //typescript已经有了这个方法=>InstanceType
