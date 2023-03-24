import { quickSort, sortChinese } from '../utils'
enum MessageTypes {
  Audio='Audio',
  Video='Video',
  Image='Image',
}

interface Message {
  type: MessageTypes;
  id: number;
  description: string;
}

const messages:Message[] = [
  { type: MessageTypes.Audio, id: 1, description: 'Audio message' },
  { type: MessageTypes.Video, id: 2, description: 'Video message' },
  { type: MessageTypes.Image, id: 3, description: 'Image message' }
]

function searchMessage (condition:MessageTypes):Message[]
function searchMessage (condition:number):Message|undefined
function searchMessage (condition:MessageTypes|number):Message|Message[]|undefined {
  if (typeof condition === 'number') {
    return messages.find((message) => message.id === condition)
  }
  return messages.filter((message) => message.type === condition)
}

searchMessage(MessageTypes.Audio)
// console.log(searchMessage(0))

console.log(quickSort([1, 3, 2, 5, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]))
console.log(sortChinese(['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十']))

class Person {
  name:string
  age:number
  constructor (name:string, age:number) {
    this.name = name
    this.age = age
  }

  say () {
    console.log(`I'm ${this.name}, I'm ${this.age} years old.`)
  }
}

type ConstructorType = new (...args:any[]) => Person

function withAge<T extends ConstructorType> (Base:T) {
  return class extends Base {
    age:number
    constructor (...args:any[]) {
      super(...args)
      this.age = args[1] - 1
    }
  }
}

const PersonWithAge = withAge(Person)
const personWithAge = new PersonWithAge('张三', 18)
console.log(personWithAge.age)

type S=string&string[]

// const str1:S = '123'

type A = {
  a:string,
  b:string
}
type B = {
  c: number,
  d: number
}

function cross<T extends object, U extends object> (a:T, b:U):T&U {
  const result = {} as T&U
  for (const key in a) {
    (result[key] as any) = a[key]
  }
  for (const key in b) {
    (result[key] as any) = b[key]
  }
  return result
}
