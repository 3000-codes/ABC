//函数式的版本
const find = (f => {
  return f(f)
})(f =>
  (
    next =>
    (x, y, i = 0) => {
      if (i >= x.length) return null
      if (x[i] == y) return i
      return next(x, y, i + 1)
    }
  )((...args) => f(f)(...args))
)

let arr = [0, 1, 2, 3, 4, 5]
console.log(find(arr, 2))
console.log(find(arr, 8))

const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)))

const fib = Y(f => n => n <= 1 ? n : f(n - 1) + f(n - 2))

console.log(fib(10)) // 输出 55
;(function (x) {
  const ZERO = f => x => x //因为函数f没有参与运算，即调用0次
  const ONE = f => x => f(x) //调用1次
  const TWO = f => x => f(f(x)) //调用2次

  // 转化为数字
  const toNumber = n => n(x => x + 1)(0)
  toNumber(ZERO) // 0
  toNumber(ONE) // 1
})()
;(function (x) {
  const TRUE = x => y => x
  const FALSE = x => y => y

  // 转化为布尔值
  const toBoolean = b => b(true)(false)
  toBoolean(TRUE) // true
  toBoolean(FALSE) // false
})(1)
;(function (x) {
  const TRUE = x => y => x
  const IF = bool => bool

  const result = IF(TRUE)('true')('false')
  return result
})(1)
;(function (x) {
  const ZERO = f => x => x
  // 对 true 的定义
  const TRUE = x => y => x
  const FALSE = x => y => y
  // 对 if 的定义
  const IF = bool => x => y => bool(x)(y)
  const toBoolean = b => b(true)(false)
  const IS_ZERO = n => n(n => FALSE)(TRUE)
  return toBoolean(IS_ZERO(ZERO))
})()
;(function (x) {
  const SUCC = n => f => x => f(n(f)(x))
  // 0
  const ZERO = f => x => x
  const toNumber = n => n(x => x + 1)(0)
  toNumber(ZERO) // 0
  return toNumber(SUCC(ZERO)) // 1
})()
