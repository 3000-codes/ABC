export {}
//泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
const getValue = <T>(arg: T): T => arg
const getArr = <T, U>(arg: T, arg2: U): [T, U] => [arg, arg2]

//泛型约束(extands)
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法

// const getLength = <T>(arg: T): number => arg.length //error:参数不一定拥有length属性
const getLength = <T extends string | number[]>(arg: T): number => arg.length

//泛型参数的默认类型:使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
const createArray = <T = number>(length: number, value: T): Array<T> => Array.from({ length }, () => value)

//泛型接口:根据约束条件，创建一个预设接口
interface KeyValue<T, U> {
  key: T
  value: U
}
const person: KeyValue<string, number> = {
  key: 'name',
  value: 18
}
const animal: KeyValue<number, number> = {
  key: 1,
  value: 2
}
//泛型类型
type Cart<T> =
  | {
      list: T[]
    }
  | T[]

//泛型类:根据约束条件，创建一个预设类
class MySet<T> {
  size: T
  constructor(size: T) {
    this.size = size
  }
  add(x: T, y: T): T {
    return x
  }
}
