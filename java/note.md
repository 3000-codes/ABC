# Java

## Java 基础

### Java 基础知识

- JVM : Java Virtual Machine , Java 虚拟机
- JRE : Java Runtime Environment , Java 运行环境,包含 JVM 和 Java 核心类库
- JDK : Java Development Kit , Java 开发工具包，包含 JRE 和开发工具

#### 编译与执行

```bash
# 编译: javac 类名.java
javac -encoding utf-8 Hello.java
# 执行: java 类名
java -Dfile.encoding=utf8 Hello

# 多个类文件编译
javac -encoding utf-8 -d ./dist Hello.java Person.java
```

### 输出语句

- 作用：在控制台输出信息
- 语法：
  - `System.out.println(值);` => 输出后换行,如果未指定值,则输出空行
  - `System.out.print(值);` => 输出后不换行，如果未指定值,编译报错
  - `System.out.printf(格式化字符串,值1,值2,...);` => 格式化输出

### 关键字与标识符

#### 关键字

- 作用：在程序中有特殊含义，不能用于定义常量和变量

#### 标识符

- 作用：给类、方法、变量、常量等起名字
- 规则：
  - 由字母、数字、下划线、$组成
  - 不能以数字开头
  - 不能是关键字
  - 区分大小写
  - 见名知意
- 规范（软性）
  - 类名：首字母大写，后面每个单词首字母大写（大驼峰）
  - 方法名：首字母小写，后面每个单词首字母大写（小驼峰）
  - 变量名：首字母小写，后面每个单词首字母大写（小驼峰）
  - 常量名：全部大写，每个单词用下划线连接（大蛇式）
  - 包名：全部小写，每个单词用点号连接
  - 测试方法：全部小写，单词间用下划线连接（小蛇式）

### 数据类型

强类型语言：变量必须先定义后使用
分类：

- 基本数据类型（1 字节=8 位）
  - 整数类型：byte(1 字节)、short(2 字节)、int(4 字节)、long(8 字节)，默认为 int
  - 浮点类型：float(4 字节)、double(8 字节)，默认为 double
  - 字符类型：char(2 字节),使用单引号,可以是字母、数字、符号、汉字等
    - 内码规则：由底层源码创建，一般使用 Unicode 编码，每个字符占 2 字节
    - 外码规则：由开发环境的编码决定，GBK 将占 2 个字节，UTF-8 的英文占 1 个字节，汉字占 3 个字节
  - 布尔类型：只有 true 和 false
    - 创建一个基本数据类型的 boolean 变量时，占 4 字节
    - 创建一个 boolean 数组时，占 1 字节
- 引用数据类型
  - 类
  - 接口
  - 数组

### 声明与赋值

#### 声明

- 作用：告诉 JVM 该变量的类型和名字
- 语法：`数据类型 变量名=初始值;`
- 注意 1：
  - 变量必须先声明后使用
  - 变量只能声明一次，但可以赋值多次
  - 变量在声明时可以赋值，也可以不赋值，但使用前必须赋值
  - 变量在同一个作用域内不能重名
  - 变量的作用域：从声明开始到所属的大括号结束
  - 变量的生命周期：从声明开始到所属的大括号结束
- 注意 2：
  - double 类型的变量赋值时，值后面可以加 D 或 d，推荐不加
  - long 类型的变量赋值时，值后面要加 L 或 l，建议使用大写 L
  - float 类型的变量赋值时，值后面要加 F 或 f，建议使用大写 F
  - char 类型的变量赋值时，值要用单引号括起来，只能写一个字符
  - char 类型还可以赋值为一个 Unicode 编码或 0-65535 之间的整数(其实是 ascii 码)
    - `char c='A';`
    - `char c='\u0041';` => A
    - `char c=65;` => A

### 类型转换

含义：将一个数据类型的变量的值赋值给另一个数据类型的变量
分类：

- 自动类型转换：隐式类型转换，小类型转换为大类型
  - byte、short、char => int => long => float => double
  - byte、short、char 之间不会相互转换，他们三者在计算时首先转换为 int 类型
- 强制类型转换：显式类型转换，大类型转换为小类型
  - 语法：`目标类型 变量名=(目标类型)值;`
  - 注意：强制类型转换可能会发生精度损失
  - 溢出：超出了目标类型的取值范围，结果不正确
- 特例：boolean 类型不能转换为其他类型，其他类型也不能转换为 boolean 类型

面试题：
在内存中，float 占据 4 个字节，long 占据 8 个字节，为什么 float 可以存储 long 的数据？

- 基本数据类型的转换只与取值范围有关，与占用的字节数无关
- float 是基于 IEEE 754 浮点数标准的单精度浮点数，long 是带符号的 64 位整数
- long 的取值范围是-2^63~2^63-1，float 的取值范围是-3.4E38~3.4E38

### 运算符

#### 算术运算符

- 作用：进行算术运算
- 分类：
  - 一元运算符：只需要一个操作数
    - `+`：正号
    - `-`：负号
    - `++`：自增 1
    - `--`：自减 1
  - 二元运算符：需要两个操作数
    - `+`：加法
    - `-`：减法
    - `*`：乘法
    - `/`：除法
    - `%`：取余
  - 三元运算符：需要三个操作数
    - `? :`：三元运算符，也叫条件运算符

#### 赋值运算符

- 作用：将右边的值赋值给左边的变量

#### 比较运算符

- 作用：比较两个值的大小
- 分类：
  - 一元运算符：只需要一个操作数
    - `>`：大于
    - `<`：小于
    - `>=`：大于等于
    - `<=`：小于等于
  - 二元运算符：需要两个操作数
    - `==`：等于
    - `!=`：不等于

#### 逻辑运算符

- 作用：进行逻辑运算

- 分类：

  - 一元运算符：只需要一个操作数
    - `!`：逻辑非
  - 二元运算符：需要两个操作数
    - `&`：逻辑与, 无论第一个操作数是 true 还是 false，都会计算第二个操作数
    - `|`：逻辑或, 无论第一个操作数是 true 还是 false，都会计算第二个操作数
    - `&&`: 短路与, 只有第一个操作数为 true，才会计算第二个操作数
    - `||`: 短路或, 只有第一个操作数为 false，才会计算第二个操作数

- 注意：
  - 逻辑运算符只能用于 boolean 类型的变量或值
  - 逻辑运算符的短路问题
    - 逻辑与运算符：只要有一个操作数为 false，结果就为 false，此时不再计算第二个操作数
    - 逻辑或运算符：只要有一个操作数为 true，结果就为 true，此时不再计算第二个操作数

#### 位运算符

- 作用：对整数类型的值进行二进制运算
- 补充知识点：[原码，反码，补码](#原码，反码，补码)
- 分类：
  - 一元运算符：只需要一个操作数
    - `~`：按位取反
  - 二元运算符：需要两个操作数
    - `&`：按位与
    - `|`：按位或
    - `^`：按位异或
    - `<<`：左移
    - `>>`：右移
    - `>>>`：无符号右移

#### 其他运算符

- 作用：对常量和变量进行运算
- 分类：
  - 一元运算符：只需要一个操作数
    - `()`：强制类型转换运算符
    - `[]`：数组索引运算符
    - `.`：成员访问运算符
    - `new`：创建对象运算符
  - 二元运算符：需要两个操作数
    - `instanceof`：判断对象是否为某个类的实例

### 运算符的优先级和结合性

- 优先级：同一表达式中，高优先级的运算符先于低优先级的运算符进行运算
- 结合性：同一表达式中，从左往右的结合性，或者从右往左的结合性

#### 运算符的使用细节

##### `+`运算符的特殊用法

- 作用：
  - 加法运算符：正常的加法运算
  - 字符串连接符：将任意类型的数据转换为字符串类型，然后进行连接操作
- 注意：
  - 如果`+`运算符两边都是数值类型，则进行加法运算
  - 如果`+`运算符两边有一个是字符串，则进行字符串连接操作
  - 如果`+`运算符两边都是字符串，则进行字符串连接操作

##### 一元运算符`++`和`--`的使用细节

- 作用：对变量进行自增 1 或自减 1
- 使用细节：
  - `++`和`--`既可以放在变量的前面，也可以放在变量的后面
  - 如果`++`和`--`放在变量的后面，先赋值，再自增 1 或自减 1
  - 如果`++`和`--`放在变量的前面，先自增 1 或自减 1，再赋值
  - `++`和`--`只能作用于变量，不能作用于常量或表达式
  - `++`和`--`既可以作用于基本数据类型的变量，也可以作用于引用数据类型的变量
  - `++`和`--`作用于引用数据类型的变量时，不改变对象的地址，只改变对象的内容

### 流程控制语句

- 作用：控制程序的执行流程
- 分类：
  - 顺序结构，从上往下依次执行
  - 选择结构，根据条件选择性的执行某一段代码
  - 循环结构，根据条件重复执行某一段代码

#### 选择结构

- 作用：根据条件选择性的执行某一段代码
- 分类：
  - 单选择结构：只有一个条件，根据条件的布尔值选择性的执行某一段代码
    - `if`语句
  - 双选择结构：有两个条件，根据条件的布尔值选择性的执行某一段代码
    - `if...else`语句
  - 多选择结构：有多个条件，根据条件的布尔值选择性的执行某一段代码
    - `if...else if...else`语句
    - `switch...case`语句

#### 循环结构

- 作用：根据条件重复执行某一段代码
- 分类：
  - `while`循环
  - `do...while`循环
  - `for`循环
  - `for...each`循环，增强 for 循环，用于遍历数组或集合

##### `break`和`continue`关键字

- 作用：控制循环结构的执行流程
- `break`关键字：
  - 作用：跳出循环结构，终止循环结构的执行
  - 使用场景：在循环结构中，根据某个条件跳出循环
- `continue`关键字：
  - 作用：跳过循环体中剩余的语句，继续下一次循环
  - 使用场景：在循环结构中，根据某个条件跳过循环体中剩余的语句

注意：这两个关键字后面不能有其他语句，因为这两个关键字后面的语句永远不会执行，编译器会报错

### 函数（方法）

- 作用：将一段代码封装成一个独立的功能，供其他程序调用
- 分类：
  - 内置函数：由 Java 语言提供的函数
  - 自定义函数：由程序员根据需求自己定义的函数
- 定义格式：

```java
修饰符 返回值类型 函数名(参数列表) {
    函数体
}
```

- 说明：
  - 修饰符：public static
  - 返回值类型：函数执行完毕后，返回的结果的数据类型
  - 函数名：符合标识符的命名规则，见名知意
  - 参数列表：函数执行时需要的数据，如果没有参数，可以省略参数列表，如果有多个参数，使用逗号隔开
  - 函数体：函数的功能代码
- 函数的创建必须确定三个要素：
  - 函数名
  - 参数列表
  - 返回值类型

#### 函数参数

- 作用：用于接收调用者传递给函数的数据
- 分类：
  - 形式参数：定义函数时，函数名后面小括号中的参数，简称形参
  - 实际参数：调用函数时，函数名后面小括号中的参数，简称实参
  - 形参和实参的数据类型必须一致
- 注意：
  - 形参只有在函数内部有效，函数执行结束后，会释放内存空间，形参会消失
  - 实参只有在函数调用时有效，函数执行结束后，会释放内存空间，实参会消失
- 形参和实参的传递方式：
  - 值传递：基本数据类型的变量，传递的是数据值
  - 引用传递：引用数据类型的变量，传递的是地址值
- 动态参数列表：
  - 作用：在定义函数时，不确定参数的个数，可以使用动态参数列表
  - 格式：数据类型...变量名
  - 注意：
    - 动态参数列表必须位于形参的最后一位
    - 动态参数列表在函数内部其实是一个数组
    - 调用函数时，可以传递任意个参数，包括 0 个参数
    - 调用函数时，如果传递的实参是一个数组，可以在数组前面加上`...`，将数组中的元素作为实参传递给函数

#### 函数重载

- 作用：在同一个类中，允许存在多个同名函数，只要它们的参数列表或者参数类型不同即可
- 当参数符合多个函数的参数列表时，会报错

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(sum(10, 20));
        System.out.println(sum(10, 20, 30));
        System.out.println(sum(10, 20, 30, 40));
    }

    public static int sum(int a, int b) {
        return a + b;
    }

    public static String sum(String a, String b) {
        return a + b;
    }

    public static int sum(int a, int b, int c) {
        return a + b + c;
    }

    public static int sum(int a, int b, int c, int d) {
        return a + b + c + d;
    }
}
```

#### 栈内存与函数调用

- 栈内存：JVM 在运行程序时，会在内存中开辟一块空间，用于存储局部变量，这块内存空间就是栈内存
- 函数调用：当程序调用一个函数时，JVM 会在栈内存中开辟一块空间，用于存储函数中的局部变量，当函数执行完毕后，JVM 会自动释放该函数对应的栈内存空间

#### 递归函数

- 作用：在函数内部调用函数本身，或者多个函数间互相调用
- 注意：
  - 递归函数必须有结束条件，否则会出现栈内存溢出
  - 递归次数不能太多，否则会出现栈内存溢出
  - 构造方法不能使用递归调用，否则会出现栈内存溢出

```java
public class Demo {
    public static void main(String[] args) {
        System.out.println(sum(100));
    }

    public static int sum(int n) {
        if (n == 1) { // 结束条件
            return 1;
        }
        return n + sum(n - 1); // 递归调用
    }
}
```

### 字符串

- 作用：用于表示一串字符
- 定义格式：

```java
String 变量名 = "字符串"; // 直接赋值
String 变量名 = new String("字符串"); // 使用构造方法
String 变量名 = new String(char[] value); // 将字符数组转换成字符串
String 变量名 = new String(char[] value, int offset, int count); // 将字符数组的一部分转换成字符串
```

#### 字符串的方法

##### 基础方法

- `int length()`：获取字符串的长度
- `char charAt(int index)`：获取指定索引处的字符

##### 判断方法

- `boolean equals(Object obj)`：比较字符串的内容是否相同，与`==`的区别是，`==`比较的是两个对象的地址值是否相同，而`equals`比较的是两个对象的内容是否相同
- `boolean equalsIgnoreCase(String str)`：比较字符串的内容是否相同，忽略大小写
- `boolean startsWith(String prefix)`：判断字符串是否以指定的字符串开头
- `boolean endsWith(String suffix)`：判断字符串是否以指定的字符串结尾
- `boolean contains(String str)`：判断字符串中是否包含指定的字符串
- `boolean isEmpty()`：判断字符串是否为空

##### 查找方法

- `int indexOf(int ch)`：获取指定字符在字符串中第一次出现的索引
- `int indexOf(String str)`：获取指定字符串在字符串中第一次出现的索引
- `int indexOf(int ch, int fromIndex)`：获取指定字符在字符串中从指定位置开始第一次出现的索引
- `int indexOf(String str, int fromIndex)`：获取指定字符串在字符串中从指定位置开始第一次出现的索引
- `String substring(int beginIndex)`：获取从指定索引处开始到字符串末尾的子字符串
- `String substring(int beginIndex, int endIndex)`：获取从指定索引处开始到指定索引处结束的子字符串

##### 转换方法

- `char[] toCharArray()`：将字符串转换为字符数组
- `String toLowerCase()`：将字符串中的大写字母转换为小写字母
- `String toUpperCase()`：将字符串中的小写字母转换为大写字母
- `String trim()`：去除字符串两端的空白字符
- `String replace(char oldChar, char newChar)`：将字符串中的指定字符替换为新的字符
- `String replace(CharSequence target, CharSequence replacement)`：将字符串中的指定字符串替换为新的字符串
- `String[] split(String regex)`：将字符串按照指定的规则进行拆分

##### int 类型与 String 类型的相互转换

```java
// Integer.parseInt(str); 将字符串转换为int类型
int num = Integer.parseInt("100");
// Integer.valueOf(str).intValue();
int num = Integer.valueOf("100").intValue();

// String.valueOf(num); 将int类型转换为字符串，valueOf必须传入值，否则会报错
String str = String.valueOf(100);
// Integer.toString(num); 将int类型转换为字符串
String str = Integer.toString(100);
// num + ""; 将int类型转换为字符串，耗时比较长，不推荐使用
String str = 100 + "";
```

### 数组

- 作用：用于存储多个数据
- 定义格式：

```java
数据类型[] 数组名 = new 数据类型[数组长度];
```

- 说明：
  - 数据类型：数组中存储的数据的数据类型
  - 数组名：符合标识符的命名规则，见名知意
  - 数组长度：数组中能够存储的数据的个数，是一个 int 类型的整数
- 举例：

```java
int[] arr = new int[3];
```

- 说明：
  - int：数组中存储的数据的数据类型是 int 类型
  - arr：数组名
  - 3：数组长度是 3，数组中能够存储的数据的个数是 3
- 注意：
  - 数组中存储的数据的数据类型必须一致
  - 数组的长度一旦确定，就不能修改

#### 数组的动态操作（通过动态参数列表实现）

- 动态扩容：将元素插入元素结尾
- 动态删除：将元素从数组中删除
- 动态插入：将元素插入到指定位置

### 初始化

- 没有继承关系的实例化过程
  - 隐式加载实例成员和构造器代码块（按照代码顺序）
  - 构造器
- 继承关系的实例化过程
  - 隐式加载父类实例成员和构造器代码块（按照代码顺序）
  - 父类构造器
  - 隐式加载子类实例成员和构造器代码块（按照代码顺序）
  - 子类构造器

## 补充

### 原码，反码，补码

- 原码：将一个整数转换成二进制数，最高位是符号位，0 表示正数，1 表示负数，其余位表示数值的绝对值
- 反码：正数的反码是其本身，负数的反码是在其原码的基础上，符号位不变，其余位取反
- 补码：正数的补码是其本身，负数的补码是在其反码的基础上，最后一位加 1
- 反码是原码与补码的中间产物

#### 转换规则

- 原始数据=>原码:
  - 正数：二进制表示
  - 负数：符号位为 1，其余位取反
- 原码=>反码:
  - 正数：原码=反码
  - 负数：符号位不变，其余位取反
- 反码=>补码:
  - 正数：反码=补码
  - 负数：反码+1=补码
- 补码=>反码:
  - 正数：补码=反码
  - 负数：补码-1=反码
- 反码=>原码:
  - 正数：反码=原码
  - 负数：符号位不变，其余位取反
- 原码=>原始数据:
  - 正数：二进制转十进制
  - 负数：符号位为 1，其余位取反，二进制转十进制，再加负号

#### 举例

- 举例 1：求-5 的原码，反码，补码
  - 原码：10000101
  - 反码：11111010
  - 补码：11111011

### idea 配置

- 设置编码格式：File->Settings->Editor->File Encodings->Global Encoding 和 Project Encoding,default enco...都设置为 UTF-8
- 设置自动编译：File->Settings->Build,Execution,Deployment->Compiler->Build project automatically

### 网络编程

计算机网络:是指将地理位置不同的多台计算机和外部设备通过通信线路连接起来，以功能完善的网络软件实现资源共享和信息传递的系统。

网络编程:直接或间接的通过网络协议与其他计算机实现数据交换，进行通信的过程。

需要解决的问题：

- 如何准确的定位网络上一台或多台主机；定位主机上的特定的应用
- 找到主机后如何可靠高效的进行数据传输

网络编程的两个要素：

- 通信协议
  - OSI 七层模型:应用层，表示层，会话层，传输层，网络层，数据链路层，物理层
  - TCP/IP 四层模型:应用层(前三层 OSI)，传输层，网络层，物理+数据链路层
- IP 地址
  - IP 地址用来唯一的标识网络上的计算机
  - IP 分为 IPv4 和 IPv6
  - IPv4 是一个 32 位的整数，通常被分为 4 个字节
  - IPv6 是一个 128 位的整数，通常被分为 8 个字节

数据的封装与拆包

- 数据封装：将数据按照一定的格式打包成数据包
- 数据拆包：将数据包拆分成一个个的数据包

#### InetAddress 类

- 用来表示 IP 地址
- 不能直接创建，只能通过静态方法获取
- 常用方法：
  - `getLocalHost()`：获取本机 IP 地址
  - `getByName(String host)`：根据主机名或者 IP 地址的字符串表示获取对应的 IP 地址
  - `getHostAddress()`：获取 IP 地址的字符串表示
  - `getHostName()`：获取主机名

### TCP 通信

- 使用 TCP 协议前，必须先建立 TCP 连接，形成传输数据通道
- 传输前，采用“三次握手”方式，点对点通信，是可靠的
- TCP 协议进行通信的两个应用进程：客户端、服务端
- 在连接中可进行大数据量的传输
- 传输完毕，需释放已建立的连接，效率低

#### "三次握手"与"四次挥手"

- 三次握手: 客户端发送带有 SYN 标志的数据包给服务器，服务器接收后回复一个带有 SYN/ACK 标志的数据包以示传达确认信息，客户端再回复一个带有 ACK 标志的数据包，代表“握手”结束
- 四次挥手: 客户端发送一个 FIN 标志的数据包给服务器，服务器接收后回复一个带有 ACK 标志的数据包以示传达确认信息，服务器再回复一个带有 FIN 标志的数据包给客户端，客户端接收后回复一个带有 ACK 标志的数据包以示传达确认信息，服务器再回复一个带有 ACK 标志的数据包给客户端，代表“挥手”结束

### UDP

- 将数据、源、目的封装成数据包，不需要建立连接
- 每个数据报的大小限制在 64K 内
- 因无连接，是不可靠的
- 可以广播发送
- 发送数据结束时无需释放资源，开销小，速度快

### Socket

- Socket 是网络上运行的程序之间双向通信链路的终结点，是一种特殊的文件，可以通过它向网络发送或者接收数据，实现进程之间的通信
- Socket 是 TCP/IP 协议的一个实现，是对 TCP/IP 协议的封装和应用，是一组接口
- Socket 编程：是指使用 Socket 套接字进行网络通信的编程，通常也称作套接字编程，是对 TCP/IP 协议的封装

```java
public void client(){
  // 1. 创建 Socket 对象，指明服务器端的 IP 和端口号
  InetAddress inet = InetAddress.getByName("127.0.0.1");
  Socket  socket = new Socket(inet, 8899);
  // 2. 获取一个输出流，用于输出数据
  OutputStream os = socket.getOutputStream();
  // 3. 写出数据的操作
  os.write("你好，我是客户端 MM".getBytes());
  // 4. 资源的关闭
  os.close();
  socket.close();
}

public void server(){
  // 1. 创建服务器端的 ServerSocket，指明自己的端口号
  ServerSocket ss = new ServerSocket(8899);
  // 2. 调用 accept() 表示接收来自于客户端的 Socket
  Socket socket = ss.accept();
  // 3. 获取输入流
  InputStream is = socket.getInputStream();
  // 4. 读取输入流中的数据
  ByteArrayOutputStream baos = new ByteArrayOutputStream();
  byte[] buffer = new byte[1024];
  int len;
  while ((len = is.read(buffer)) != -1) {
    baos.write(buffer, 0, len);
  }
  System.out.println(baos.toString());
  // 5. 关闭资源
  baos.close();
  is.close();
  socket.close();
  ss.close();
}
```

```java
public void client(){
  DatagramSocket socket = new DatagramSocket(); // 创建 DatagramSocket 对象
  String str = "UDP方式发送数据";
  byte[] data = str.getBytes();
  InetAddress inet = InetAddress.getByName("127.0.0.1");
  DatagramPacket packet = new DatagramPacket(data, 0, data.length, inet, 9090); // 创建 DatagramPacket 对象，包含将要发送的数据
  socket.send(packet);
  socket.close();
}

public void server(){
  DatagramSocket socket = new DatagramSocket(9090);
  byte[] buffer = new byte[100];
  DatagramPacket packet = new DatagramPacket(buffer, 0, buffer.length);
  socket.receive(packet);
  System.out.println(new String(packet.getData(), 0, packet.getLength()));
  socket.close();
}
```

### URL

- URL：统一资源定位符，表示 Internet 上某一资源的地址
- URL 的基本结构：`协议://主机名:端口号/文件名#片段名?参数列表`
- 构造器和常用方法
- `public URL(String protocol, String host, int port, String file)`
- `public URL(String protocol, String host, String file)`
- `public URL(String protocol, String host, int port, String file, URLStreamHandler handler)`
- `public URLConnection openConnection()` // 创建一个 URLConnection 对象，它表示到 URL 所引用的远程对象的连接,之后通过该实例读取或写入对象
- `public final InputStream openStream()` // 打开此 URL 的连接并返回一个用于从该连接读入的 InputStream
- `public final String getProtocol()` // 获取该 URL 的协议名
- `public final String getHost()` // 获取该 URL 的主机名
- `public final String getPort()` // 获取该 URL 的端口号
- `public final String getPath()` // 获取该 URL 的文件路径
- `public final String getFile()` // 获取该 URL 的文件名
- `public final String getRef()` // 获取该 URL 在文件中的相对位置
- `public final String getQuery()` // 获取该 URL 的查询名

## Java8 新特性

- Lambda 表达式
- 强大的 Stream API
- 便于并行的并发 API

### Lambda 表达式

- Lambda 表达式是一个匿名函数，可以把 Lambda 表达式理解为是一段可以传递的代码（将代码像数据一样进行传递）
- 使用 Lambda 表达式可以使代码变的更加简洁紧凑
- Lambda 表达式的写法：`(形参列表) -> {方法体}`

```java
// 1. 无参，无返回值
Runnable r1 = () -> System.out.println("Hello Lambda!");
r1.run();

// 2. 有一个参数，并且无返回值
Consumer<String> con = (x) -> System.out.println(x);
con.accept("Hello Lambda!");

// 3. 数据类型可以省略，因为可由编译器推断得出，称为“类型推断”
Consumer<String> con1 = (x) -> System.out.println(x);
con1.accept("Hello Lambda!");

// 4. Lambda 若只需要一个参数时，参数的小括号可以省略
Consumer<String> con2 = x -> System.out.println(x);
con2.accept("Hello Lambda!");

// 5. Lambda 需要两个或以上的参数，多条执行语句，并且可以有返回值
Comparator<Integer> com = (x, y) -> {
  System.out.println("函数式接口");
  return Integer.compare(x, y);
};
```

#### 函数式接口

- 如果一个接口中，只声明了一个抽象方法，则此接口就称为函数式接口
- 函数式接口的实例，可以使用 Lambda 表达式来创建该接口的对象
- 为了保证一个接口是函数式接口，需要使用注解 `@FunctionalInterface` 修饰

  ```java
  @FunctionalInterface
  public interface MyInterface {
    void method1();
  }
  ```

- 四大核心函数式接口
  - `Consumer<T>`：消费型接口
    - `void accept(T t)`
  - `Supplier<T>`：供给型接口
    - `T get()`
  - `Function<T, R>`：函数型接口
    - `R apply(T t)`
  - `Predicate<T>`：断言型接口
    - `boolean test(T t)`

```java
// 消费型接口
public void happy(double money, Consumer<Double> con) {
  con.accept(money); // 花钱
}
// 调用
happy(10000, (m) -> System.out.println("买电脑花了" + m + "元"));
// 供给型接口
public List<Integer> getNumList(int num, Supplier<Integer> sup) {
  List<Integer> list = new ArrayList<>();
  for (int i = 0; i < num; i++) {
    Integer n = sup.get(); // 获取一个随机数
    list.add(n);
  }
  return list;
}
// 调用
List<Integer> list = getNumList(10, () -> (int) (Math.random() * 100));
// 函数型接口
public String strHandler(String str, Function<String, String> fun) {
  return fun.apply(str);
}
// 调用
String newStr = strHandler("\t\t\t 掐头去尾   ", (str) -> str.trim());
// 断言型接口
public List<String> filterStr(List<String> list, Predicate<String> pre) {
  List<String> strList = new ArrayList<>();
  for (String str : list) {
    if (pre.test(str)) {
      strList.add(str);
    }
  }
  return strList;
}
// 调用
List<String> list = Arrays.asList("Hello", "Lambda", "www", "ok");
List<String> strList = filterStr(list, (s) -> s.length() > 3); // 长度大于 3 的字符串
```

#### 方法引用

- 当要传递给 Lambda 体的操作，已经有实现的方法了，可以使用方法引用
- 方法引用可以看做是 Lambda 表达式深层次的表达，也就是说，方法引用就是 Lambda 表达式，也就是函数式接口的一个实例，通过方法的名字来指向一个方法，可以认为是 Lambda 表达式的一个语法糖
- 使用格式：`类（或对象）:: 方法名`
- 方法引用使用的要求：要求接口中的抽象方法的形参列表和返回值类型与方法引用的方法的形参列表和返回值类型相同（针对于情况一和情况二）
- 情况一：对象 :: 非静态方法
- 情况二：类 :: 静态方法
- 情况三：类 :: 非静态方法

```java
// 情况一：对象 :: 非静态方法
Consumer<String> con = (x) -> System.out.println(x);
PrintStream ps = System.out;
Consumer<String> con1 = ps::println;
// 调用
con1.accept("Hello Lambda!");
// 情况二：类 :: 静态方法
Comparator<Integer> com = (x, y) -> Integer.compare(x, y);
Comparator<Integer> com1 = Integer::compare;
// 调用
int compare = com1.compare(1, 2);
// 情况三：类 :: 非静态方法
BiPredicate<String, String> bp = (x, y) -> x.equals(y);
BiPredicate<String, String> bp1 = String::equals;
// 调用
boolean test = bp1.test("abc", "abc");
```

#### 构造器引用

- 格式：`类名 :: new`
- 需要调用的构造器的参数列表要与函数式接口中抽象方法的参数列表保持一致

```java
// 情况一：无参构造器
Supplier<Employee> sup = () -> new Employee();
Supplier<Employee> sup1 = Employee::new;
// 调用
Employee emp = sup1.get();
// 情况二：有参构造器
Function<Integer, Employee> fun = (x) -> new Employee(x);
Function<Integer, Employee> fun1 = Employee::new;
// 调用
Employee emp = fun1.apply(101);
```

#### 数组引用

- 格式：`类型[] :: new`

```java
Function<Integer, String[]> fun = (x) -> new String[x];
Function<Integer, String[]> fun1 = String[]::new;
// 调用
String[] arr = fun1.apply(10);
```
