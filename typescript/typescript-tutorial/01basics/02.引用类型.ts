enum Color {
  // 可以省略值，默认从0开始,如果某个值赋值为非数字，后续值则必须手动赋值否则报错
  PINK,
  PURPLE = 18,
  WHITE,
  RED = '#f00',
  GREEN = '#0f0',
  BLUE = '#00f'
}
const red: Color = Color.RED
const pink: Color = Color.PINK
const white: Color = Color.WHITE
console.log(red, pink, white)

//确定数据类型,不确定长度
const arr1: number[] = [1, 2, 3]
const arr2: Array<string> = ['a', 'b', 'c']
//确定数据类型，确定长度
const arr3: [number, string] = [1, '2']

class Person {
  name: string
  age: number
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  sayHello(): void {
    console.log(`hello, my name is ${this.name}`)
  }
}
//函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力
//函数重载真正执行的是同名函数最后定义的函数体 在最后一个函数体定义之前全都属于函数类型定义 不能写具体的函数实现方法 只能定义类型
function add(a: number, b: number): number
function add(a: string, b: string): string
function add(a: any, b: any): any {
  return a + b
}

const plus = (a: number, b: number): number => a + b
const minus = (a: number, b?: number): number => (b ? a - b : a) //定义可选参数，默认值为1
const multiply = (...nums: number[]): number => nums.reduce((a, b) => a * b, 1) //剩余参数
const divide = (a: number, b: number = 1): number => a / b //默认参数
