# 函数式编程入土

## 函数式 VS 面向对象

函数式编程和面向对象编程有什么区别?

- 函数式编程是一种编程范式,面向对象是一种编程思想.
- 函数式通常是无状态的,面向对象通常是有状态的.
- 函数式更加注重数据的流转,面向对象更加注重数据的封装.
- 函数式更像是一种数学上的抽象,面向对象更像是一种现实上的抽象.

## 函数是一等公民

- 公民还分三六九等?
  - 不是,这里的一等公民是指函数可以像变量一样被传递,赋值,作为参数,作为返回值.
  - 所以说一等公民就是普通公民,即普通对象.
- 为什么钟爱一等公民
  - 一个函数只做一件事,这样的函数更容易被复用.
  - 没有 this,所以函数的行为更加确定,不会被上下文影响.
  - 没有副作用,不会对外部造成影响.

## 纯函数

- 纯函数是什么?
  - 相同的输入永远会得到相同的输出,且没有任何可观察的副作用.
  - 纯函数是指没有副作用的函数.
  - 副作用是指对外部环境产生了影响.
  - 副作用包括但不限于:修改了全局变量,修改了参数,修改了函数外部的变量,修改了 DOM,发送了 AJAX 请求,修改了文件等等.
- 为什么要追求纯函数?
  - 纯函数更容易被测试.
  - 纯函数更容易被复用.
  - 纯函数更容易推理,不会被外部环境影响.
- 总结特点
  - 可缓存性,相同的输入永远会得到相同的输出,可以使用缓存.
  - 可移植性/自文档化,纯函数可以自文档化,因为纯函数的输入/输出是一目了然的.
  - 可测试性,纯函数更容易测试.
  - 引用透明性,纯函数不依赖外部环境,不会被外部环境影响.
  - 并行代码,纯函数可以并行运行,因为纯函数不依赖外部环境.

## 柯里化

- 柯里化是什么?
  - 柯里化是指将一个多参数的函数转换成多个单参数的函数.
  - 柯里化是一种“预加载”函数的方法,通过传递较少的参数,得到一个已经记住了这些参数的新函数,某种意义上讲,这是一种对参数的“缓存”,是一种非常高效的编写函数的方法.
  - 柯里化允许传递多个参数,但是只是为了减少`()`(函数调用)的使用.

## 函数组合

- 函数组合是什么?
  - 函数组合是指将多个函数组合成一个函数.
  - 函数组合是一种“嵌套”多个函数的方法,每个函数接收一个参数,并且返回一个值,这个值会作为参数传递给下一个函数,最终返回结果.
  - 函数组合是一种高效的编写函数的方法.
  - 函数组合是一种高效的编写管道的方法.

```js
// 简单版
const compose = (f, g) => (x) => f(g(x));

// 复杂版
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((v, f) => f(v), x);
```

### pointfree 模式

- pointfree 是什么?
  - pointfree 是指函数无须提及将要操作的数据是什么样的.
  - pointfree 就是使用一些通用的函数,组合出各种复杂运算.
  - pointfree 的本质就是使用一些函数,将业务逻辑中不会改变的部分抽离出来,从而让业务逻辑变得清晰.

```js
// 非 pointfree,因为提到了数据:word
const snakeCase = (word) => word.toLowerCase().replace(/\s+/gi, "_");
snakeCase("Hello World"); // => hello_world

// pointfree
const snakeCase = compose(replace(/\s+/gi, "_"), toLowerCase);
snakeCase("Hello World"); // => hello_world
```

### 管道 VS 组合

- 管道和组合有什么区别?
  - 管道是从左到右运行函数,组合是从右到左运行函数.
  - 管道是把数据从一个函数传递到另一个函数,组合是把函数从一个函数传递到另一个函数.
  - 管道是把函数作为数据处理,组合是把数据作为函数处理.
  - 管道是数据优先,组合是函数优先.
  - 管道是数据驱动,组合是函数驱动.
  - 管道是数据流动,组合是函数嵌套.

#### 结合律

- 结合律是什么?
  - 结合律是指函数组合可以结合成任意形式.
  - 结合律是指函数组合可以从右到左,也可以从左到右.
  - 结合律是指函数组合可以从里到外,也可以从外到里.
  - 结合律是指函数组合可以结合成任意形式.

```js
// 结合律
compose(f, compose(g, h)) == compose(compose(f, g), h);

// 使用结合律打包组合函数
var loudLastUpper = compose(exclaim, toUpperCase, head, reverse);
// 或
var last = compose(head, reverse);
var loudLastUpper = compose(exclaim, toUpperCase, last);

// 或
var last = compose(head, reverse);
var angry = compose(exclaim, toUpperCase);
var loudLastUpper = compose(angry, last);
```

### 组合如何 debug

```js
// 1. 使用 trace
const trace = (label) => (value) => {
  console.log(`${label}: ${value}`);
  return value;
};

//
const dasherize = compose(
  join("-"),
  toLower,
  split(" "),
  replace(/\s{2,}/gi, " ")
);
dasherize("The world is a vampire"); // the-world-is-a-vampire

const dasherize = compose(
  join("-"),
  toLower,
  trace("after split"),
  split(" "),
  replace(/\s{2,}/gi, " ")
);

dasherize("The world is a vampire");
// after split: The,world,is,a,vampire
// the-world-is-a-vampire

// 2. 使用 tap
const tap = (fn) => (value) => {
  fn(value);
  return value;
};

const dasherize = compose(
  join("-"),
  toLower,
  tap(trace("after split")),
  split(" "),
  replace(/\s{2,}/gi, " ")
);

dasherize("The world is a vampire"); // after split: The,world,is,a,vampire

// 3. 使用 debug
const debug =
  (fn) =>
  (...args) => {
    const result = fn(...args);
    console.log(fn.name, args, "->", result);
    return result;
  };
```

## 函子(Functor)

函子(representative functor)是范畴论里的概念，指从任意范畴到集合范畴的一种特殊函子。 我们没有办法避免副作用，但是我们尽可能的将副作用控制在可控的范围内，我们可以通过函子去处理副作用，我们也可以通过函子去处理异常，异步操作等。

- 函子的特点
  - 函子是实现了`map`契约的对象.
  - 函子是一个容器,它包含了值和值的变形关系(这个变形关系就是函数).
  - 函子可以是一个`类`(具有`map`方法),也可以是一个`纯对象`(包含`map`方法).
  - 函子的价值在于可以把运算推迟到必要的时候进行.
  - 函子的`map`方法接收一个函数作为参数,这个函数的返回值也是一个函子.
  - 函子的`map`方法运行函数时,会自动提取值进行处理.
  - 函子的`map`方法返回一个新的函子,因此可以链式调用多个`map`方法.
  - 函子的`map`方法是可以组合的,组合之后的函数和单独调用`map`方法的结果是一样的.

```js
function Container(value) {
  this._value = value;
}

Container.of = function (value) {
  return new Container(value);
};

Container.prototype.map = function (fn) {
  return Container.of(fn(this._value));
};

const container = Container.of(3)
  .map((x) => x + 1)
  .map((x) => x * x); // Container(16)
```

### Maybe 函子

- Maybe 函子的作用就是可以对外部的空值情况进行处理,提升程序的健壮性.

```js
Container.prototype.isNothing = function () {
  return this._value === null || this._value === undefined;
};

const container = Container.of().map((x) => x.toUpperCase()); // Container(null)
```

### Either 函子

- Either 函子的作用是处理异常情况,它的内部有两个值:`left`和`right`,分别对应处理异常的情况和正确的情况.

```js
class Left {
  static of(value) {
    return new Left(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return this; // !!!注意: 这里忽略 fn,直接返回自身
  }
}

class Right {
  static of(value) {
    return new Right(value);
  }

  constructor(value) {
    this._value = value;
  }

  map(fn) {
    return Right.of(fn(this._value)); // !!!注意: 这里返回新的 Right 函子
  }
}

const parseJSON = (str) => {
  try {
    return Right.of(JSON.parse(str));
  } catch (e) {
    return Left.of({ error: e.message });
  }
};

parseJSON("{ name: zs }").map((x) => x.name.toUpperCase()); // Left({ error: "Unexpected token n in JSON at position 2" })
```

### IO 函子

- IO 函子的作用是延迟执行,把不纯的操作交给调用者处理.

```js
class IO {
  static of(value) {
    return new IO(function () {
      return value;
    });
  }

  constructor(fn) {
    this._value = fn; // 保存函数
  }

  map(fn) {
    return new IO(compose(fn, this._value)); // 将函数组合起来,作为新的IO函子的函数
  }
}
```

### Task 函子

- Task 函子的作用是用来处理异步操作的,它的内部也是使用的 IO 函子.

```js
class Task {
  static of(value) {
    return new Task(function (reject, resolve) {
      resolve(value);
    });
  }

  constructor(fn) {
    this._value = fn;
  }

  map(fn) {
    return new Task((reject, resolve) => {
      this._value(reject, (data) => {
        resolve(fn(data));
      });
    });
  }
}
```
