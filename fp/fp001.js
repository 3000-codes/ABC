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
  )
  ((...args) => f(f)(...args)) 
)

let arr = [0, 1, 2, 3, 4, 5]
console.log(find(arr, 2))
console.log(find(arr, 8))


const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)))

const fib = Y(f => n => n <= 1 ? n : f(n - 1) + f(n - 2))

console.log(fib(10)) // 输出 55