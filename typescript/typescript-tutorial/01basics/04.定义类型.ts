export {}
// 定义类型interface
interface Add {
  (x: number, y: number): number
}
let add: Add = (x, y) => x + y

//类型断言 <>和as
let getLength = (target: string | number): number => {
  if ((<string>target).length) {
    return (<string>target).length
  } else {
    return target.toString().length
  }
}

let getLength1 = (target: string | number): number => {
  if ((target as string).length) {
    return (target as string).length
  } else {
    return target.toString().length
  }
}

//非空断言:确定该值不会是undefined或null
let string: string | null | undefined = '123'
console.log(string!.length)

//赋值断言:确定该值一定会被赋值
let value!: number
console.log(value)

//联合类型| 可以用于多种类型的联合
let status: Boolean | number = true

//类型别名 对某个类型使用type取别名
type Name = string | string[]

//交叉类型取的多个类型的并集，但是如果key相同但是类型不同，则该key为never类型
interface Info {
  width: number
  height: number
}
interface Tag {
  name: string
  age: number
}

let stuff: Info & Tag = {
  width: 1,
  height: 2,
  name: '1',
  age: 1
}
