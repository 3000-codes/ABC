export {}
//类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内
//1.in关键字
interface Bird {
  name: string
  fliable: boolean
}
interface Fish {
  name: string
  swimmable: boolean
}

const getSkill = (animal: Bird | Fish): string => {
  if ('flimable' in animal) return 'fly'
  if ('swimmable' in animal) return 'swim'
  return 'unknown'
}

//2.typeof关键字:只支持number,string,boolean,symbol类型
const isTypeof = (value: string | number): string => {
  if (typeof value === 'string') {
    return 'string'
  } else if (typeof value === 'number') {
    return 'number'
  } else {
    return 'unknown'
  }
}
//3.instanceof关键字
function creatDate(date: Date | string) {
  console.log(date)
  if (date instanceof Date) {
    date.getDate()
  } else {
    return new Date(date)
  }
}
//4.is:自定义类型保护的类型谓词
function isNumber(num: any): num is number {
  return typeof num === 'number'
}
function isString(str: any): str is string {
  return typeof str === 'string'
}
console.log(isNumber(1), isNumber('1'))
