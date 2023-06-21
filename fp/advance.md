## 基础

lambda 演算三条规则：

- 符号 f1 f2 f3...
- 函数抽象：(λx.M) x 是参数，M 是函数体
- 函数应用：(M N) M 是函数，N 是参数

翻译成 js：

- 符号：变量
- 函数抽象：(x) => M
- 函数应用：M(N)

注意：lambda 演算没有赋值，没有 if，没有循环，没有数据类型，没有语句，只有函数定义和函数调用

### 函数式中如何定义一个数字

结绳记数法：

- 首先要有根绳子（那这个绳子代表什么？）
- 没打结的绳子代表 0
- 每打一次结，代表加 1

因为 lambda 演算只有函数定义和函数调用，所以我们可以约定：

- 绳子代表函数
- 打结代表函数调用
- 所以打结次数代表函数调用次数

```js
// 注意：lambda 演算没有赋值，以下仅作展示效果
const ZERO = f => x => x //因为函数f没有参与运算，即调用0次
const ONE = f => x => f(x) //调用1次
const TWO = f => x => f(f(x)) //调用2次

// 转化为数字
const toNumber = n => n(x => x + 1)(0)
toNumber(ZERO) // 0
toNumber(ONE) // 1
```

### 函数式中如何定义布尔值

`真`与`假`：

- 符合认知的，我们便认为是`真`
- 与`真`相反的，我们便认为是`假`
- `真`和`假`是不是绝对的，但一定是互斥的

```js
const TRUE = x => y => x
const FALSE = x => y => y

// 转化为布尔值
const toBoolean = b => b(true)(false)
toBoolean(TRUE) // true
toBoolean(FALSE) // false
```

### 函数式中如何定义 if

if 三要素：

- 条件
- 条件为真时的处理
- 条件为假时的处理

```js
const TRUE = x => y => x
const IF = bool => x => y => bool(x)(y)

const result = IF(TRUE)('true')('false') // true

// 对比`TRUE`和`IF`
const IF = bool => x => y => bool(x)(y)
const IF2 = bool => bool
```

#### IF 的短路处理

- 延迟执行

```js
IF(TRUE)(log('true'))(log('false')) // 既会打印 true，也会打印 false，最终返回 log('true')的结果

// 优化
IF(TRUE)(() => log('true'))(() => log('false'))() // 只会打印 true，最终返回 log('true')的结果
```

#### 判断是不是 0

```js
// 对 零 的定义
const ZERO = f => x => x
// 对 true 的定义
const TRUE = x => y => x
const FALSE = x => y => y
// 对 if 的定义
const IF = bool => x => y => bool(x)(y)

const toBoolean = b => b(true)(false)
// 从ZERO函数可以看出它会忽略f，返回 x ，如果 x 就等于 TRUE，那么就是 ZERO
// 其他整数必定会调用f，所以是FALSE && FALSE && FALSE...&&TRUE,即FALSE
const IS_ZERO = n => n(n => FALSE)(TRUE)
return toBoolean(IS_ZERO(ZERO))
```

### 函数式中如何定义数字加法

```js
// +1操作
const SUCC = n => f => x => f(n(f)(x))
// 0
const ZERO = f => x => x
const toNumber = n => n(x => x + 1)(0)
