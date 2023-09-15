### var

var 没有块级作用域，定义后在当前闭包中都可以访问，如果变量名重复，就会覆盖前面定义的变
量，并且也有可能被其他人更改。

```js
if (true) {
  var a = "a"; // 期望a是某一个值
}
console.log(a); //'a'
```

### iife 与代码块

iife 内部是函数作用域,不会污染全局
代码块作用域,可能会影响(var)

### 必传值

```js
const [a = "a", b = "b", c = new Error("C必须指定")] = [1, , 3]; // Error('C必须指定')
const fn = (p = new Error("C必须指定")) => {};
fn(); // Error('C必须指定')
```

### 判断数据类型(typeof 陷阱)

### 转为数字

- `+`:es5 之前的数据类型可以转化为数字或 NaN,之后的新数据类型(bigint/symbol)会抛出异常
- `>>0`(有符号右移): 各种数据类型都能转化为数字,但是最大的正整数会溢出,结果为-1(二进制转码)
- `>>>0`(无符号右移):各种数据类型都能转化为数字,但是最大的正整数会被截取(二进制转码)

#### parseInt 的参数

parseInt 函数有 2 个参数:

- 需要转化的字符串
- 转换目标的进制,2-36,不传或 0 会被当作 10 进制

### falsy 值

undefined,null,NaN,0,''

### 宽松比较

- NaN 结果永远是 false
- null 与 undefined,这二者等价,与其他任何类型都为 false
- Symbol 与 Symbol.for ?
- bigint ?
- Boolean 与其他类型比较,先转为数字,其他类型再调用 valueof/toString
- 数字与字符串,先转数字
- 基础类型与对象类型,对象类型调用 valueof/toString
- 对象间比较,false

### `+`规则

- `[]+[]`:两个数组都不是数字,所以都调用 tostring 方法转为`''+''`,结果是''
- `{}+[]`:第一个`{}`被识别为代码块,即转化为`+''`,`''`转化为数字的结果为 0
- `[]+{}`:所以都调用 tostring 方法转为`''+[object Object]`结果是[object Object]
- `{}+{}`,第一个代码块,第二个调用 tostring 方法转为`[object Object]`,即转化为`+[object Object]`,结果 NaN

### 判断数据类型的方法及缺陷

- typeof:只能判断基础数据类型的引用类型,陷阱:null 的结果是 object
- constructor:可能会被改写
- instanceof,右操作数必须是函数或者 class,iframe 间的实例类型不共享
- isPrototypeOf,基本等同于 instanceOf
- toString,自定义类型,如未设置 tagName,则默认返回[object object]
- 鸭子类型检查:如果二者间存在相同相似的方法,不准确
- Symbol.toStringTag
- 等比较:仅限于部分特殊值

## 对象

### 普通属性,排序属性,隐藏类

```js
const obj = {};
obj.p1 = "p1";
obj.p6 = "p6";
obj.p2 = "p2";
obj[1] = 1;
obj[6] = 6;
obj[2] = 2;

for (let p in obj) {
  console.log(p, obj[p]);
}
```

结果为优先遍历数字属性,再按注入顺序遍历

- 数字在 v8 中被成为排序属性(element)
- 字符串作为普通属性=>list=>map 的顺序存储
- 隐藏类,对象存储在 v8 中的存储结构

### 属性与属性描述,属性控制

- Object.defineProperty,Object.defineProperties
  - configurable:可配置,权限最高,设为 false 后只能修改`writable`与`value`,该属性的增删配置的操作均被拒绝
  - writable:可写
  - enumerable:可遍历
  - value:值
  - 上述描述符的默认值均为 false,value 默认值为 undefined
- Object.getOwnPropertyDescription 获取属性描述
- Object.preventExtensions,禁止对象添加新的属性,但是之前的属性可以随意删改
- Object.isExtensble,判断对象是否可拓展
- Object.seal:等于`preventExtensions`+`configurable:false`,即不可添加新属性,且已有属性无法删除
- Object.isSeal
- Object.freeze:冻结,任何操作均被拒绝
- Object.isFrozen

### 访问原型

- 1. `prototype` :`Class.prototype`
- 2. `__proto__` : `clazz.__proto__`
- 3. `instanceOf`: `clazz instanceOf Class`
  - Object instanceof Function
  - Object instanceof Object
  - Object instanceof Function
  - Function instanceof Function
- 4. `Object.getPrototypeOf`和 `Reflect.getPrototypeOf`: `Object.getPrototypeOf(clazz)`
- 5. `Object.setPrototypeOf`和 `Reflect.setPrototypeOf`: `Object.setPrototypeOf(clazz,Class)`
- 6. `Object.isPrototypeOf`和 `Reflect.isPrototypeOf`: `Class.prototype.isPrototypeOf(clazz)`
- 7. `Object.create`:`clazz=Object.create(Class)`

### 属性获取

- for...in :获取普通属性和原型属性
- Object.keys:普通属性
- Object.getOwnPropertyNames:普通属性和不可枚举属性
- Object.getOwnPropertySymbols:不可枚举属性和 symbol 属性
- Reflect.ownKeys:除原型属性

### 类型转换

- Symbol.toPrimitive:default(+,==,!=的 hint)
- valueOf
- toString

### JSON 与 toJSON

JSON 只允许存储字符串,数字,不二,null 类型的值,不符合的值将被忽略或转化了 null(bigint 报错)

### 深克隆

- JSON 克隆:部分值的类型不支持,不支持循环引用,不支持不可枚举和 symbol
- postMessage:需要多个环境,部分类型不支持,不支持循环引用,异步
- 手写克隆
  - 数组自定义属性
  - 对象层级过深-爆栈
  - 循环引用
  - Symbol 键值
