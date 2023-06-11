# Java

## String

### string 类为什么将底层`char[]`改为`byte[]`?

- jdk9 引入 Graal 编译器，它使用了一种`紧凑字符串`的新表达形式，以`byte[]`存储字符串，节省了一些空间，并提高了性能
- char 需要先转为 byte，再转为 二进制(时间复杂度：比 byte 多了一步转换)
- char 根据编码格式不同，占用的字节数不同，而 byte 是固定的(时间复杂度：byte 是固定的，不会随着编码格式的不同而改变)

### string 为什么可以存储中文

JVM 底层是 UTF-16 编码，只要是 Unicode 编码，都可以存储

### string 内容的最大长度：

2^16-1=65535

### 字符串的比较

- `==`比较的是地址,注意常量优化机制(常量池)
- `equals()`比较的是内容
- `compareTo()`比较的是内容，返回值为`int`，如果相等返回`0`，如果不相等返回他们之间的`长度差值`

```java

String s1 = "abc";
String s2 = "abc";
System.out.println(s1 == s2); // true 两个字符串都是常量，编译期就可以确定，所以指向同一个地址
System.out.println(s1.equals(s2)); // true 比较的是内容

String s3 = new String("abc");
String s4 = new String("abc");
System.out.println(s3 == s4); // false 两个字符串都是对象，指向堆内存中的不同地址
System.out.println(s3.equals(s4)); // true 比较的是内容

System.out.println(s1==s3); // false 一个是常量，一个是对象
System.out.println(s1.equals(s3)); // true 比较的是内容

String str5 = "a";
String str6 = "bc";
String str7 = "abc";
System.out.println(str7 == "a" + "bc"); // true 两个字符串都是常量，编译期就可以确定，所以指向同一个地址
System.out.println(str7 == str5 + str6); // false 两个对象，指向堆内存中的不同地址

```

### 自定义常量

```java
    public static final String str1 = "HelloWorld";
    public static final String str2 = "HelloWorld";
    public static final String str3 = "Hello";
    public static final String str4 = "World";
    public static final String str5;
    public static final String str6;
    public static final String str7;
    public static final String str8;

    static {
        str5 = "HelloWorld";
        str6 = "HelloWorld";
        str7 = "Hello";
        str8 = "World";
    }

    public static void main(String[] args) {
        System.out.println(str1 == str2); // true
        System.out.println(str5 == str6); // true
        System.out.println(str1 == str5); // true
        System.out.println("===========================");
        System.out.println(str1 == str3 + str4); // true 编译期拼接好了
        System.out.println(str5 == str7 + str8); // false 运行时拼接
    }
```

### String 对象个数

```java
String str1="HelloWorld"; // 创建了一个对象(常量池)

String str2=new String("HelloWorld"); // 创建了两个对象(常量池+堆内存)

String str3="Hello"+"World"; // 创建了一个对象(常量池),编译期就可以确定

String str4="Hello"; // 创建了一个对象(常量池)
String str5="World"; // 创建了一个对象(常量池)
String str6="Hello"; // 与str4指向同一个对象(常量池),编译期就可以确定
String str7=str4+str5; // 创建了一个对象(堆内存),运行期才可以确定
```

### 包装类型的比较

- 整数类型的包装类(`Integer`)底层缓存了`-128~127`之间的 Integer 数组，超过这个范围，会 new 一个对象
- int 和 Integer 比较，Integer 会自动拆箱为 int(从简原则)，然后进行比较

- 字符类型缓存了`0~127`之间的数 character 数组，超过这个范围，会 new 一个对象

- boolean 类型缓存了`true`和`false`两个对象

- 浮点类型没有缓存

```java
Integer i1 = 100;
Integer i2 = 100;

Integer i3 = new Integer(100);
Integer i4 = new Integer(100);

int i5 = 100;
int i6 = 100;

Integer i7 = 200;
Integer i8 = 200;

System.out.println(i1 == i2); // true
System.out.println(i1 == i3); // false
System.out.println(i3 == i4); // false
System.out.println(i1 == i5); // true
System.out.println(i7 == i8); // false Integer支持-128~127之间的数，会从常量池中取，超过这个范围，会new一个对象
```

## Collection

### HashSet 如何保证元素唯一性

- HashSet 底层是 HashMap，HashSet 的 add 方法，实际上是调用了 HashMap 的 put 方法
- 获取元素的 hashcode，然后计算 hash 值（hashcode 的高 16 位异或低 16 位），然后与`table.length-1`进行与运算，得到数组下标
- 如果数组下标对应的位置没有元素（null），封装成链表对象，添加到数组下标对应的位置
- 如果数组下标对应的位置有元素，将元素的 hash 值与链表对象的每个元素的 hash 值进行比较，如果发生碰撞，继续比较 equals 方法，如果 equals 方法返回 true，说明元素重复，不添加，如果 equals 方法返回 false，说明元素不重复，添加到链表的最后

```java
public boolean add(E e) {
    return map.put(e, PRESENT)==null;
}
```

### HashSet 的重写 hashCode 方法计算中间量为什么是 31

- 不易过大：增加计算的时间
- 不易过小：容易发生碰撞
- 31 是一个质数，质数的特点是只能被 1 和自己整除，这样可以尽可能的避免碰撞
- 泊松分布，29 和 31 的碰撞率最低
- 31 可以被 JVM 优化，31 \* i = (i << 5) - i，这样可以提高运算效率

#### hashCode 和 equals 的关系

- 两个方法必须同时重写，否则会出现问题
- 如果两个对象的 hashCode 相同，equals 不一定相同
- 如果两个对象的 equals 相同，hashCode 一定相同

#### hashmap 存储过程

- 名词解释：
  - 桶元素：底层数组中的元素，可以是 null，链表，红黑树
  - 初始容量：哈希表在创建时的容量，即哈希表中桶的数量
  - 负载因子：哈希表在其容量自动增加之前可以达到多满的一种尺度，负载因子越高，空间利用率越高，但是冲突机会越大
  - 阈值：扩容的临界值，等于容量乘以负载因子
- 涉及到的成员常量，成员变量，局部变量

  - serialVersionUID ：API 中针对类的序列化的版本号
  - DEFAULT_INITIAL_CAPACITY ：默认的初始容量，必须是 2 的幂次方
  - MAXIMUM_CAPACITY ：最大容量，必须是 2 的幂次方
  - DEFAULT_LOAD_FACTOR ：默认的负载因子
  - TREEIFY_THRESHOLD ：链表转红黑树的阈值
  - UNTREEIFY_THRESHOLD ：红黑树转链表的阈值
  - table ：底层的数组，长度必须是 2 的幂次方
  - entrySet ：存储元素的集合
  - size ：元素的个数
  - modCount ：修改次数
  - threshold ：扩容的临界值，等于容量乘以负载因子
  - loadFactor ：负载因子

- 初始容和负载因子：取决于构造器，如果没有指定，就是默认值
  - `HashMap()`：初始容量 16，负载因子 0.75
  - `HashMap(int initialCapacity)`：指定初始容量，负载因子 0.75
  - `HashMap(int initialCapacity, float loadFactor)`：指定初始容量，负载因子
  - `HashMap(Map<? extends K, ? extends V> m)`：初始容量 m.size()，负载因子 0.75

## IO

### 路径分类

- 绝对路径：从盘符开始的路径
- 相对路径：相对于当前项目的路径
- 构造路径：构造器中传入的路径，可能是“绝对路径”，也可能是“相对路径”
  - 可以通过`file.getPath()`获取`构造路径`
  - 可以通过`file.getAbsolutePath()`获取`绝对路径`

### 文件的复制

- 边读边写：一边读取源文件，一边写入目标文件，这种方式效率最高
  - 以字节为单位，复制文件
  - 以字节数组为单位，复制文件
- 读完再写：先读取源文件，再写入目标文件，如果文件过大，会造成内存溢出

```java
try{
    // 1.创建输入流和输出流
    FileInputStream fis = new FileInputStream("D:\\a.txt");
    FileOutputStream fos = new FileOutputStream("D:\\b.txt");
    // 2.读取文件
    byte[] bytes = new byte[1024];
    int len = 0;
    while((len = fis.read(bytes)) != -1){
        // 3.写入文件
        fos.write(bytes, 0, len);
    }
    // 4.关闭流:先开后关，后开先关
    fos.close();
    fis.close();
}
```

### 字符流和字节流的区别

- 字节流：以字节为单位，读取文件，适合读取任何类型的文件
- 字符流：以字符为单位，读取文件，只适合读取文本文件

## 线程

### 单例模式的线程安全问题

### 线程状态

- NEW：新建状态，线程对象被创建，但是没有调用 start 方法
- RUNNABLE：运行状态，线程对象被创建，调用了 start 方法
- BLOCKED：阻塞状态，线程对象被创建，调用了 start 方法，但是没有获取到资源
- WAITING：等待状态，线程对象调用了 wait 方法，进入等待状态
- TIMED_WAITING：超时等待状态，线程对象调用了 sleep 方法，进入超时等待状态
- TERMINATED：终止状态，线程对象执行完毕，进入终止状态

- 线程转换规则
  - NEW -> RUNNABLE : 调用 start 方法
  - RUNNABLE -> BLOCKED : 获取不到资源
  - RUNNABLE -> WAITING : 调用 wait 方法
  - RUNNABLE -> TIMED_WAITING : 调用 sleep 方法
  - RUNNABLE -> TERMINATED : 执行完毕
  - BLOCKED -> RUNNABLE : 获取到资源
  - WAITING -> RUNNABLE : 调用 notify 方法 或 调用 notifyAll 方法
  - WAITING -> BLOCKED : 调用 notify 方法 或 调用 notifyAll 方法, 但是获取不到资源(多线程)
  - TIMED_WAITING -> RUNNABLE : 休眠时间到了
  - TIMED_WAITING -> BLOCKED : 休眠时间到了，但是获取不到资源(多线程)

## JDBC

### 为什么不推荐使用 statement

- SQL 注入问题: 用户输入的数据，拼接到 SQL 语句中，可能会导致 SQL 注入
- 频繁的创建和销毁资源，影响性能

## MyBatis

### #{} 和 ${} 的区别

- #{}：预编译处理，防止 SQL 注入，只能替换值，不能替换表名和列名，关键字
- ${}：字符串替换，可能会导致 SQL 注入，可以替换任意内容
- 开启控制台日志输出
  - `#{}`预编译处理，替换成 ?，然后传递参数
  - `${}`字符串替换，直接替换成参数的值
- 尽量使用 #{}，防止 SQL 注入
