export {}
// required :将类型的属性改为必写
interface Person {
  name?: string
  age?: number
  hobby?: string[]
}
const p1: Required<Person> = {
  name: '张三',
  age: 18,
  hobby: ['游泳', '打篮球']
}

//Partial :将类型的属性改为可选
interface Person2 {
  name: string
  age: number
  hobby: string[]
}
const p2: Partial<Person2> = {}

//Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉,剩余的属性构成新的类型(补集)
type T1 = Exclude<'a' | 'b' | 'c', 'a'> //b|c
type T2 = Exclude<'a' | 'b' | 'c', 'a' | 'c'> //b

//Extract<T,U> 从 T 中提取出 U中T的子集(交集)
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // "a"

// Readonly<T> 将 T 中的所有属性设置为只读
let p3: Readonly<Person2> = {
  name: '张三',
  age: 18,
  hobby: ['游泳', '打篮球']
}
// p3.name = '李四' //error

//Record<K,T> 将K(联合类型)中所有类型的值设置为T
type Person3 = Record<keyof Person2, string>

//Pick<T,U> 从某个类型中挑出一些属性出来
type P4 = Pick<Person2, 'name' | 'age'>
const p4: P4 = {
  name: '张三',
  age: 18
}

//Omit<T,U> 将T中的属性U移除掉
type P5 = Omit<Person2, 'name'>
const p5: P5 = {
  age: 18,
  hobby: ['游泳', '打篮球']
}

//NonNullable<T> 将T中的所有属性设置为非空(undefined,null)
type P6 = NonNullable<string | number | undefined | null>
const p6: P6 = '123'

//ReturnType<T> 获取函数返回值类型
type T7 = ReturnType<() => string>
const t7: T7 = '123'

//Parameters
type T8 = Parameters<(a: number, b: string) => void>
const t8: T8 = [1, '2']

// InstanceType<T> 获取某个类型的实例类型
class C {}
type D = InstanceType<typeof C>
