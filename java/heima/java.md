# java

### java SE, java EE, java ME

- java SE: java standard edition, 标准版, 包含了java语言的基础类库, 包括了面向对象, 基本数据类型, 集合框架, IO/NIO, 网络编程, 多线程, 反射, 注解, 泛型, 枚举, Lambda表达式, Stream流, JDBC等

- java EE: java enterprise edition, 企业版, 包含了java SE的所有内容, 并且还包含了一些企业级的API, 包括了Servlet, JSP, JSTL, EL, Filter, Listener, JDBC, JNDI, EJB, JMS, JTA, JAX-WS, JAX

- java ME: java micro edition, 微型版, 主要用于嵌入式设备, 包括了java SE的部分内容, 但是没有IO/NIO, 反射, 注解, 泛型, 枚举, Lambda表达式, Stream流, JDBC等

### JDK, JRE, JVM   

- JDK: java development kit, java开发工具包, 包含了java开发工具, java API类库, java运行环境, 以及java程序打包工具等

- JRE: java runtime environment, java运行环境, 包含了java API类库, java运行环境, 以及java程序打包工具等

- JVM: java virtual machine, java虚拟机, 用于执行java字节码的虚拟计算机, 用于实现java的跨平台特性

## 数据类型

### 基本数据类型

- 整数类型: byte, short, int, long
- 浮点类型: float, double
- 字符类型: char
- 布尔类型: boolean

### 引用数据类型

- 类: class
- 接口: interface
- 数组: []

### 变量

- 定义: 用于存储数据的内存空间, 该空间的数据类型是确定的, 但是数据的值是可以变化的
- 格式: 数据类型 变量名 = 初始化值
- 注意: 变量必须先定义后使用, 变量定义后必须赋值才能使用, 变量只能在作用域内使用, 变量只能赋值对应类型的值

### 常量

- 定义: 用于存储数据的内存空间, 该空间的数据类型是确定的, 但是数据的值是不可以变化的
- 格式: final 数据类型 常量名 = 初始化值
- 注意: 常量必须先定义后使用, 常量定义后必须赋值才能使用, 常量只能在作用域内使用, 常量只能赋值对应类型的值

### 数据类型转换

- 自动类型转换: 小类型转换为大类型
    - byte, short, char -> int -> long -> float -> double
- 强制类型转换: 大类型转换为小类型
    - double -> float -> long -> int -> char, short, byte



