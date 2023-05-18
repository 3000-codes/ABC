
### java项目结构

#### 第一层结构: 项目(project)

包括:.idea文件夹(项目配置文件夹),out文件夹(编译后的文件夹),项目文件夹(二层项目结构'模块')

#### 第二层结构: 模块(module)

包括:模块名.iml文件(模块配置文件),src文件夹(第三层级'包')

#### 第三层级: 包(package)

包括:java文件(第四层级'类')

##### 作用
package: 多级文件夹

好处:分类管理,方便查找,避免重名

必须在第一行声明

```java
package com.augurit.agcim.datastore.admin.utils;

public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
规范:
+ 一个单词:所有字母都小写,例如:com
+ 多个单词:所有字母都小写,单词之间用.分割,例如:com.augurit

### idea常用快捷模板

主方法            psvm
输出语句          sout(变量名.sout)
输出变量          soutv(变量名.soutv)
for循环           fori(循环次数.fori)
逆序for循环       forr(循环次数.forr)
抽取变量          数据值.var

### idea常用快捷键

+ ctrl+/:单行注释
+ ctrl+shift+/:多行注释
+ ctrl+alt+l:格式化代码
+ ctrl+alt+o:优化导入的类和包
+ ctrl+alt+m:抽取方法
+ alt+/:自动提示 
+ alt+enter:自动修正
+ ctrl+shift+u:大小写转换
+ alt+insert:生成构造/get/set/toString等方法

### 调试程序(debug)

+ F8:逐行执行程序, idea中蓝色转折箭头(带下划线)
+ F7:进入到方法中, idea中蓝色向下箭头(带下划线)
+ alt+shift+F7:强制进入到方法中, 包括java源码中的方法, idea中红色向下箭头(带下划线)
+ shift+F8:跳出方法, idea中蓝色向上箭头(带下划线)
+ F9:跳到下一个断点,如果没有下一个断点,那么就结束程序
+ ctrl+F2:退出debug模式,停止程序
+ 红色方块:结束调试

### 模块的导入和移除

导入:模块右键->Open Module Settings->Modules->+->选择要导入的模块->OK->Apply->OK

移除:模块右键->remove module


## 数组

+ 说明: 在程序中存储同一种数据类型的多个元素的固定长度的数据结构
+ 特点:
    - 一旦创建,长度不可变
    - 数据类型必须统一

+ System.out.println(arr); // 隐式调用arr.toString()方法,结果为`[I@1b6d3586`
    - `[I`: 一维数组
    - `@`: 分隔符
    - `1b6d3586`: 十六进制的哈希值

### 数组的声明和初始化

数组的声明

```java
// 声明方式1(推荐): 数据类型[] 数组名;
int[] arr1;

// 声明方式2: 数据类型 数组名[];
int arr2[];

```

数组的初始化:
+ 动态初始化: 只指定长度,由系统给出初始化值
+ 静态初始化: 给出初始化值,由系统决定长度(不能先声明后初始化)

```java
// 动态初始化: 数据类型[] 数组名=new 数据类型[数组长度];
int[] arr1=new int[3];

// 静态初始化: 数据类型[] 数组名={元素1,元素2,元素3,...};
int[] arr3={1,2,3};
int[] arr4=new int[]{1,2,3};
int[] arr5={1,2,(int)3.14}; // 允许小数转换为整数

// 声明,初始化二维数组
int[][] arr6=new int[3][3]; // 3行3列
int[][] arr6={{1,2,3},{4,5,6},{7,8,9}};
int[][] arr7=new int[][]{{1,2,3},{4,5,6},{7,8,9}};
```

### 数组的使用

+ 说明: 数组的使用就是对数组元素的使用,下标从0开始,到数组长度-1结束
+ 语法: 数组名[下标]
+ 作用: 用于给数组元素赋值和取值

```java
int[] arr={1,2,3};
System.out.println(arr[0]); // 1
arr[0]=10;
System.out.println(arr[0]); // 10
```

### 数组的方法(查询相关)

```java
int[] arr={1,2,3};

// 1. 遍历: for循环
for(int i=0;i<arr.length;i++){
    System.out.println(arr[i]);
}
```

## JVM内存划分

+ jdk6.0以前:
    - 程序计数器(寄存器)
    - 本地方法栈
    - 虚拟机栈
    - 堆
    - 方法区
+ jdk8.0以后:JVM内存+元空间
    - 程序计数器(寄存器)
    - 本地方法栈
    - 虚拟机栈
    - 堆(将原来的方法区和堆合并为一个内存区域)

+ 程序计数器(寄存器): 
    - 和计数器底层硬件相关,和开发没有直接关系
+ 本地方法栈: 
    - 用于存储本地方法(native关键字修饰的方法,实际上是用C语言编写的方法)的内存空间
+ 虚拟机栈:
    - 用于存储正在执行的方法的内存空间
    - 方法执行时,会自动开辟内存空间
    - 方法执行完毕后,会自动释放内存空间
+ 方法区:
    - 用于存储类的信息,例如: 类的全限定名,类的修饰符,类的常量池,类的成员变量,类的成员方法,类的构造方法,类的静态变量,类的静态方法,类的抽象方法,类的接口,类的父类,类的子类,类的注解,类的字节码信息等
    - 运行期间,使用java命令运行字节码文件,会将字节码文件加载到方法区中
+ 堆
    - 用于存储显式或隐式new创建的对象
    - 堆中的每块区域都有一个地址值,这个地址值就是对象的引用
    - 堆中的每块区域都有一个默认值(JVM根据其类型决定的默认值,例如: int:0,boolean:false,引用类型:null,string:'\u0000')
    - 堆内存中有一个GC(垃圾回收器),用于回收垃圾对象
        * 垃圾对象: 没有引用指向的对象
+ 名词解释:
    + 创建: 申请内存空间
    + 加载: 将字节码文件加载到方法区中

ps: 静态方法和静态变量再jdk7.0以后放到了堆中,之前放到了方法区中

## 面向对象

+ 阶段一:基础思想(JavaSE,JDBC,)
+ 阶段二:框架(接口,项目)
+ 阶段三:切面(框架)

### 面向对象VS面向过程

+ 面向对象: 万物皆对象,强调的是对象
+ 面向过程: 强调的是步骤

### 面向对象的三大特征

+ 封装: 隐藏对象的属性和实现细节,仅对外提供公共访问方式
+ 继承: 使用已存在的类的定义作为基础建立新类的技术,新类的定义可以增加新的数据或新的功能,也可以用父类的功能,但不能选择性地继承父类
+ 多态: 同一操作作用于不同的对象上面,可以产生不同的解释和不同的执行结果

### 类和对象

+ 类: 用于描述具有相同属性和相同功能的对象的集合
+ 对象: 对类的具体实现
+ 类是对象的模板,对象是类的实体

### 类的设计与实现

#### 类的分类

+ 系统(源码)提供
+ 自定义

#### 类的设计

+ 步骤:
    - 根据事务的属性和行为设计最基础的模板(抽象)
    - 在模板上添加封装思想
    - 结合需求,完成基础的JavaBean标准类设计
        * 构造器,静态,继承,抽象,最终,接口,内部类,枚举,注解,构造器代码块,静态代码块
        * 成员:字段,方法,内部类,枚举,注解
        * 工具:构造器,构造器代码块,静态代码块
    - 封装: 
        * 在程序中,给不同内容添加不同权限的访问级别,提升程序的安全性和访问性
        * 访问级别: private,缺省,protected,public
+ 类的成员:
    - 成员量(属性):常量,变量
        * 成员变量:声明在代码块外部的变量,包含`实例变量`和`静态变量`
        * 成员常量:声明在代码块外部的常量,包含`实例常量`和`静态常量`
    - 成员方法(行为):实例方法,静态方法
    - 内部类

#### 实例变量和局部变量

+ 实例变量: 声明在代码块外部的变量
    - 存储在堆内存中
    - 有默认值,可以不声明,直接使用
    - 作用域:整个类
    - 生命周期:随着对象的创建而创建,随着对象的销毁而销毁
    - 随对象的创建而加载,每创建一个对象,就加载一次
    - 可以被修饰符修饰
+ 局部变量: 声明在代码块内部的变量
    - 存储在栈内存中
    - 没有默认值,必须声明,赋值,然后使用
    - 作用域:从声明的位置开始,到所属的代码块结束
    - 生命周期:随着所属的代码块的执行而创建,随着所属的代码块的结束而销毁
    - 随所属的代码块的执行而加载,每执行一次,就加载一次
    - 只能被final修饰

#### this关键字

+ this: 代表当前对象
+ this.成员变量: 访问当前对象的成员变量
+ this.成员方法(): 访问当前对象的成员方法
+ this(...params): 访问当前对象的构造器

#### static关键字

+ static: 静态的,共享的
+ 可以修饰成员变量,成员方法,代码块,内部类
+ 被static修饰的成员,不再属于对象,而是属于类,可以通过类名.成员的方式访问
+ 被static修饰的成员,会随着类的加载而加载,随着类的消失而消失
+ 静态代码块: 随着类的加载而加载,只加载一次,用于初始化静态成员

##### 单例模式

+ 单例模式: 保证一个类只有一个对象
+ 将构造器私有化,防止外部创建对象
+ 提供一个静态方法,用于获取对象
+ 两种方式:
    - 延迟加载模式(懒汉模式): 第一次使用时创建对象
    - 立即加载模式(饿汉模式): 类加载时就创建对象,缺点:可能该对象永远不会使用,浪费内存

```java
// 饥汉模式(迫不及待) : 类加载时就创建对象
class Singleton {
    private static Singleton instance = new Singleton();
    private Singleton() {}
    public static Singleton getInstance() {
        return instance;
    }
}
// 懒汉模式(非诚勿扰) : 第一次使用时创建对象
class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
// 使用
Singleton s = Singleton.getInstance();
```

#### 权限修饰符

+ private: 
    - 私有的,只能在`本类`中访问,子类也不能访问
    - 修饰成员变量,成员方法,构造器
    - 如果外部需要访问,可以通过提供公共的访问方式
+ 缺省:
    - 没有修饰符,只能在`本包`中访问,如果不同包中的子类也不能访问
    - 修饰成员变量,成员方法,构造器
+ protected:
    - 受保护的,只能在`本包`中访问,在子类中或同一个包中可见
    - 修饰成员变量,成员方法,构造器
+ public:
    - 公共的,可以在`任意位置`访问
    - 修饰成员变量,成员方法,构造器

#### 构造器

+ new 关键字通过构造器创建对象进行内存空间的申请
+ 初始化实例
+ 对需要参数的构造器进行赋值
+ 返回对象的引用
+ 如果没有提供构造器,系统会提供一个无参构造器,如果提供了构造器,系统不会提供无参构造器
+ 支持重载
+ 格式
    - 构造器的名称必须和类名一致
    - 构造器没有返回值类型
```java
权限修饰符 类名(参数列表){
    //构造器代码块
}
```

#### 构造器代码块

+ 每次调用构造器都会执行构造器代码块
+ 优先于构造器执行
+ 多个构造器代码块,按照顺序执行
+ 可以将相同的代码放到构造器代码块中,减少代码的冗余


#### JavaBean标准

+ 程序员间的约定
+ 一个类要想成为JavaBean标准类,必须满足以下条件:
    - 类必须被public修饰
    - 一个文件只允许包含一个类
    - 必须提供空参构造器
    - 成员变量必须使用private修饰
    - 提供公共的访问方式(get,set)
+ 可有可无的条件:
    - 提供有参构造器
    - 构造器代码块
    - 静态代码块
    - toString方法,hashCode方法,equals方法
    - 内部类
+ 作用: 封装数据

#### 匿名对象

+ 匿名对象: 没有名字的对象
+ 匿名对象的使用场景:
    - 当对象只需要使用一次的时候
    - 当对象作为参数传递的时候
+ 匿名对象的使用注意事项:
    - 匿名对象只能调用一次方法
    - 匿名对象不能赋值给一个变量
    - 匿名对象可以作为参数传递
    - 匿名对象可以作为方法的返回值

```java
new 类名().成员方法();
```

#### package 和 import关键字

+ package 作用: 声明类所在的包,声明在第一行
+ 格式: `package 包名;`

+ import 作用: 导入指定包下的类或者接口
+ 格式: 
    - `import 包名.类名;` : 导入指定包下的指定的类或者接口
    - `import 包名.*;` : 导入指定包下的所有类或者接口

### 继承

+ 继承: 子类继承父类的属性和行为
+ 作用: 提高代码的复用性和拓展性
+ 语法: `class 子类 extends 父类 {}`（子类与父类是is-a的关系）
+ 只支持单继承,不支持多继承
+ 所有的类都默认继承Object类（Object类是所有类的父类）

+ 子类继承父类的私有成员,受限于访问权限,不能直接访问，但是可以通过父类提供的公共的访问方式访问
+ 子类继承父类的构造器,通过super关键字调用父类的构造器

#### 方法重写(10-方法的重写)

+ 子类继承父类的方法,可以对父类的方法进行重写，重写后的方法可以满足子类的需求
+ 重写的方法必须和父类的方法具有相同的`方法名,参数列表和返回值类型`
+ 重写的方法`不能使用比父类更严格的访问权限`,可以使用比父类更宽松的访问权限

## 核心类

### System类

System类包含了一些有用的类字段和方法,它不能被实例化,提供了标准输入,标准输出和错误输出流,提供了访问外部定义的属性和环境变量的方法

该类位于java.lang包中,所以不需要导入

#### System类的常用方法

 + `public static PrintStream err` : 标准错误输出流
 + `public static PrintStream out` : 标准输出流
 + `public static InputStream in` : 标准输入流
+ `public static void exit(int status)` : 终止当前运行的Java虚拟机,非零表示异常终止
+ `public static long currentTimeMillis()` : 返回当前时间(以毫秒为单位)
+ `public static void gc()` : 运行垃圾回收器
+ `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)` : 将数组中指定的数据拷贝到另一个数组中
+ `public static long nanoTime()` : 返回最准确的可用系统计时器的当前值(以毫微秒为单位)
+ `public static void runFinalization()` : 强制调用已经失去引用的对象的finalize方法
+ `public static Properties getProperties()` : 获取当前系统的属性集
+ `public static String getProperty(String key)` : 获取指定键指示的系统属性
+ `public static String getenv(String name)` : 获取指定的环境变量的值
+ `public static void load(String filename)` : 加载指定的文件名的动态库

### Scanner类

+ 用于获取键盘输入,可以获取基本类型的值和字符串值
+ 位于java.util包中,需要导入
+ 构造器
    - `public Scanner(InputStream source)` : 构造一个新的Scanner,它生成的值是从指定的输入流扫描的
    - `public Scanner(String source)` : 构造一个新的Scanner,它生成的值是从指定的字符串扫描的
+ 常用方法
    - `public boolean hasNext()` : 判断是否还有下一个输入项
    - `public String next()` : 读取下一个输入项,遇到空格,tab,回车结束
    - `public int nextInt()` : 读取下一个int类型的值,
    - `public double nextDouble()` : 读取下一个double类型的值
    - `public String nextLine()` : 读取下一行,在该方法前不能有`非nextLine的其他`的输入项
    - `public boolean hasNextLine()` : 判断是否还有下一行
    - `public void close()` : 关闭此扫描器(关闭后不可再使用)

### Math类

+ 位于java.lang包中,不需要导入
+ 包含用于执行基本数学运算的方法,如初等指数,对数,平方根和三角函数
+ 随机数生成器的方法

```java
double d = Math.random(); //返回带正号的double值,大于等于0.0且小于1.0
```

### Arrays类

+ 位于java.util包中,需要导入
+ 提供了操作数组的方法
    - `public static String toString(int[] a)` : 返回指定数组内容的字符串表示形式
    - `public static int[] copyOf(int[] original, int newLength)` : 将指定数组的指定长度复制到一个新数组中
    - `public static int binarySearch(int[] a, int key)` : 使用二分搜索法搜索指定数组的指定值
    - `public static void sort(int[] a)` : 对指定的int类型数组按数字升序进行排序,unicode码升序
    - `public static T[] sort(T[] a, Comparator<? super T> c)` : 对指定的对象数组按指定的Comparator进行排序
        * 自然排序: 实现`Comparable<T>`接口,重写`compareTo(T o)`方法
        * 自定义排序: 实现`Comparator<? super T>`接口,重写`compare(T o1, T o2)`方法

### BigInteger类

+ 位于java.math包中,需要导入
+ 不可变的任意精度整数
+ 针对大整数的运算,不会丢失精度
+ 构造器
    - `public BigInteger(String val)` : 通过字符串构造一个BigInteger对象
+ 常用方法
    - 和Math类似,提供了大整数的运算方法
    - 还提供了位运算方法 `and`, `andNot`, `or`, `xor`, `not`, `shiftLeft`, `shiftRight`

### BigDecimal类

+ 位于java.math包中,需要导入
+ 不可变的,任意精度的有符号十进制数(包括整数和小数)
+ 构造器
    - `public BigDecimal(String val)` : 通过字符串构造一个BigDecimal对象
+ 常用方法
    - 和Math类似,提供了大整数的运算方法
    - 还提供了位运算方法 `and`, `andNot`, `or`, `xor`, `not`, `shiftLeft`, `shiftRight`