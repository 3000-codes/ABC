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
