function Fn(value) {
  if (!new.target) {
    return new Fn(value)
  }
  this.value = value
}
Fn.prototype.add = function (value) {
  this.value += value
  return this
}

Fn.prototype.res = function () {
  return this.value
}

let a = Fn(1).add(2).add(3).res()
console.log(a) // 6

function changePrototype(obj) {
  obj.a = 1
  obj = new Object()
  obj.a = 2
}

var obj = new Object()
changePrototype(obj)
console.log(obj.a)

const toNmuber = str => {
  let n = typeof str === 'string' ? parseInt(str) : str
  return Number.isNaN(n) ? 0 : n
}
const isNumber = str => {
  const reg = /^-?\d+(\.\d+)?$/
  return reg.test(str)
}
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const proxiedArr = new Proxy(arr, {
  get(target, propKey, receiver) {
    if (isNumber(propKey)) {
      propKey = toNmuber(propKey)
      if (propKey < 0) {
        propKey = target.length + propKey
      }
    }
    return Reflect.get(target, propKey, receiver)
  }
})

console.log(proxiedArr[-100])

