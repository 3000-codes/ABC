# 跟着官网学 React

## 1. 起步

## 1.1. 快速入门

### 1.1.1. 创建和嵌套组件

React 应用是由组件构成的.一个组件是 UI 的一部分,它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。

React 组件是返回标签的 JavaScript 函数

```jsx
// 创建一个按钮组件
function MyButton() {
  return <button>I'm a button</button>;
}
// 嵌套组件:将我们的按钮组件嵌套在我们的App组件中
function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
```

我们可以注意到:

- React 组件必须以大写字母开头，而 HTML 标签则必须是小写字母。
- React 组件也可以自闭合，就像 HTML 标签一样。例如，`<MyButton />`。

### 1.1.2. 使用 JSX

上面所使用的标签语法被称为 JSX。它是可选的，但大多数 React 项目会使用 JSX

JSX 比 HTML 更加严格。你必须闭合标签，如 `<br />`。你的组件也不能返回多个 JSX 标签。你必须将它们包裹到一个共享的父级(`根元素`)中，比如 `<div>...</div>` 或使用空的` <>...</>`(`Fragment`) 包裹

- JSX 虽然看起来很像 HTML，但在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来。这就是为什么多个 JSX 标签必须要用一个父元素或者 Fragment 来包裹。

部分 HTML 属性在 JSX 中有所不同。例如，`class`属性在 JSX 中被称为`className`，`for`属性被称为`htmlFor`。

### 1.1.3. 显示数据(Props 和 State)

JSX 会让你把标签放到 JavaScript 中。而**大括号**会让你 **“回到”** JavaScript 中，这样你就可以从你的代码中嵌入一些变量并展示给用户。

你也可以把更为复杂的表达式放入 JSX 的大括号内。例如，`2 + 2`，`user.firstName`，或者 `formatName(user)` 都是合法的。

`{{}}` 里面的内容:外层的大括号表示我们要在 JSX 中插入一个 JavaScript 表达式，而内层的大括号表示我们要创建一个对象字面量。

```jsx
function MyButton() {
  const buttonText = "Click me, please";
  return <button>{buttonText}</button>;
}
```

#### 大括号的使用

用作 JSX 标签内的文本：`<h1>{name}'s To Do List</h1>` 是有效的，但是 `<{tag}>Gregorio Y. Zara's To Do List</{tag}>` 无效

用作紧跟在 = 符号后的 属性：`src={avatar}` 会读取 `avatar` 变量，但是 `src="{avatar}"` 只会传一个字符串 `{avatar}`。

在 JSX 中传入对象或者 CSS 样式: `<div style={{ color: "red" }} />`，注意:外层的大括号表示我们要在 JSX 中插入一个 JavaScript 表达式，而内层的大括号表示我们要创建一个对象字面量。

### 1.1.4. 条件渲染

在 React 中，没有特殊的语法来编写条件。因此，你将使用与编写常规 JavaScript 代码时相同的技术。

- `if/else-if/else`语句
- 三元运算符
- 逻辑与运算符 `&&`和逻辑,需要注意的是`0`作为条件结果虽然是`falsely`,但是最终结果还是`0`,所以不要用`0`作为条件

```jsx
// if/else-if/else
if (condition) {
  return <div>A</div>;
} else {
  return <div>B</div>;
}

// 三元运算符
return condition ? <div>C</div> : <div>D</div>;

// 逻辑与运算符
return condition && <div>E</div>;
```

### 1.1.5. 循环渲染

通常可以使用`map`方法来循环渲染

```jsx
const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];
const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
));

return <ul>{listItems}</ul>;
```

注意:

- `<li>` 有一个 key 属性。对于列表中的每一个元素，你应该传递一个字符串或者数字给 key，用于在其兄弟节点中唯一标识该元素。通常，key 应该来自你的数据，比如，数据库中的 ID。如果你在后续插入、删除或重新排序这些项目，React 将依靠你提供的 key 来思考发生了什么。
- `map`的本质是返回了`jsx数组`,所以我们也可以使用其他遍历方法返回`jsx数组`,然后渲染

### 1.1.6. 事件处理

可以通过在组件中声明 事件处理 函数来响应事件

```jsx
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

注意:

- 绑定事件为`on+首字母大写`
- 在`onClick={handleClick}`中`handleClick`后面没加`()`,即不需要调用;我们只需要将一个函数传递给该事件,事件被触发时将会调用函数

### 1.1.7. 状态 state

状态是一个组件的内部数据。它可以只能在自身内部修改。

状态是一个普通的 JavaScript 对象，它可以包含任何类型的数据。状态是可变的，因此它们通常用于跟踪可能发生变化的数据。

状态是通过`useState`钩子来创建的

```jsx
function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>{count}</button>;
}
```

注意:

- 每个状态都有一个对应的`setter`函数,用于更新状态
- `useState`钩子接收一个参数,该参数为状态的初始值
- 每个组件都有自己的状态,状态之间是相互独立的

### 1.1.8. 使用 HOOK

以 use 开头的函数被称为 `Hook`,你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。如果你想在一个条件或循环中使用 useState，请提取一个新的组件并在组件内部使用它。

### 1.1.9. prop

prop 是父组件传递给子组件的数据。子组件通过 props 来接收数据。

```jsx
function MyButton(props) {
  return <button>{props.text}</button>;
}
```

注意:

- prop 是父子组件之间通信的方式,兄弟组件之间通信可以通过父组件作为中间件来实现
- prop 是只读的,不能在子组件中修改,如果需要修改,可以通过父组件传递一个函数给子组件,子组件调用该函数来修改父组件的状态,从而达到修改 prop 的目的

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <Child count={count} handleClick={handleClick} />
      <Child count={count} handleClick={handleClick} />
    </div>
  );
}
```

### 1.1.10. 组合组件

组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节。

每一个 UI 模块都是一个组件,将组件组合在一起,就可以构建出复杂的 UI 界面,同时组件之间是相互独立的,可以复用

不要在组件中声明组件,这样会导致渲染很慢,并且导致 bug(state 重置)

```jsx
// 错误示范
function Parent() {
  function Child() {
    return <div>Child</div>;
  }
  return <Child />;
}
// 正确示范
function Child() {
  return <div>Child</div>;
}
function Parent() {
  return <Child />;
}
```

我们可以将组件抽离出来,放在单独的文件中,然后通过`import`导入,这样可以提高代码的复用性和可维护性
