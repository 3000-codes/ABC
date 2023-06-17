// 来自知乎 https://zhuanlan.zhihu.com/p/20616683
;(() => {
  // 1.0
  const fact = n => (n == 1 ? 1 : n * fact(n - 1))
  fact(5) // 120
  // 最终目标 Y(f) = f(Y(f)) ,其中Y(f)就是f的不动点
  Y(f => n => n == 1 ? 1 : n * f(n - 1))
})()
;(() => {
  //1.1
  const sum = (n => (n == 1 ? 1 : n * fact(n - 1)))(5) // 希望是120
  // lambda演算中不可以这么简单的定义阶乘函数，是因为它没有 = 赋值符号
})()
;(() => {
  // 如何消去一个函数的名字?
  // 没有名字如何递归?
  // 1.2 给函数升阶，将函数作为参数传入
  const fact = (f, n) => (n == 1 ? 1 : n * f(f, n - 1))
  return fact(fact, 5) // 120
})()
;(() => {
  // lambda表达式遵循柯里化原则--只有一个参数
  // 1.3 拆分参数
  const fact = f => n => n == 1 ? 1 : n * f(f)(n - 1)
  return fact(fact)(5) // 120
})()
;(() => {
  // 2.0 去掉赋值操作=>穷人的Y组合子,并不通用
  return (
    f => n =>
      n == 1 ? 1 : n * f(f)(n - 1)
  )(f => n => n == 1 ? 1 : n * f(f)(n - 1))(5) // 120
})()
;(() => {
  // 2.1 如何将这么长的表达式变短?
  // 跳回1.3，将f(f)看成一个整体
  const fact = f => n => n == 1 ? 1 : n * f(f)(n - 1)
  const w = f => f(f)
  w(fact)(5) // 120
  w(f => n => n == 1 ? 1 : n * f(f)(n - 1))(5) // 120
})()
;(() => {
  // 2.2 在2.1中我们注意到 `fact` 中竟然也有一个 `f(f)`，那怎么将它提取出来呢？
  const fact = f => n => (g => (n == 1 ? 1 : n * g(n - 1)))(f(f))
  return fact(fact)(5) // 120
})()
;(() => {
  // 2.3 防止`f(f)`出现栈溢出->懒惰求值（ η 化）
  const fact = f => n => (g => (n == 1 ? 1 : n * g(n - 1)))(v => f(f)(v))
})()
;(() => {
  // 2.4 因为参数都是未知的，所以我们可以调换一下参数的顺序，注意调用的时候也要调换
  const fact = g => n => (f => (n == 1 ? 1 : n * f(n - 1)))(v => g(g)(v))
  return fact(fact)(5) // 120
})()
;(() => {
  // 2.5 我们发现2.4调换顺序后 `f => n =>  n == 1 ? 1 : n * f(n - 1)` 好像可以提取出来
  const fn = f => n => n == 1 ? 1 : n * f(n - 1)
  const w = f => f(f)
  return w(x => fn(v => x(x)(v)))(5) // 120
})()
;(() => {
  // 2.6 将2.5的 `fn` 参数化
  const fn = f => n => n == 1 ? 1 : n * f(n - 1)
  const w = f => f(f)
  return w(
    (
      f => x =>
        f(v => x(x)(v))
    )(fn)
  )(5)
})()
;(() => {
  // 2.7 再次调换参数顺序
  const fn = f => n => n == 1 ? 1 : n * f(n - 1)
  const w = f => f(f)
  return (f => w(x => f(v => x(x)(v))))(fn)(5)
})()
;(() => {
  // 3.0 我们发现2.7中的 `fn` ,完全可以提取出来作为参数
  const fn = f => n => n == 1 ? 1 : n * f(n - 1)
  const w = f => f(f)
  const Y = fn => w(x => fn(v => x(x)(v)))
  return Y(fn)(5)
})()
;(() => {
  // 3.1 消除 `w` 函数，得到Y组合子
  const fn = f => n => n == 1 ? 1 : n * f(n - 1)
  const Y = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)))
  return Y(fn)(5)
})()
