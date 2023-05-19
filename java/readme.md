### java 项目结构

#### 第一层结构: 项目(project)

包括:.idea 文件夹(项目配置文件夹),out 文件夹(编译后的文件夹),项目文件夹(二层项目结构'模块')

#### 第二层结构: 模块(module)

包括:模块名.iml 文件(模块配置文件),src 文件夹(第三层级'包')

#### 第三层级: 包(package)

包括:java 文件(第四层级'类')

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

- 一个单词:所有字母都小写,例如:com
- 多个单词:所有字母都小写,单词之间用.分割,例如:com.augurit

### idea 常用快捷模板

主方法 psvm
输出语句 sout(变量名.sout)
输出变量 soutv(变量名.soutv)
for 循环 fori(循环次数.fori)
逆序 for 循环 forr(循环次数.forr)
抽取变量 数据值.var

### idea 常用快捷键

- ctrl+/:单行注释
- ctrl+shift+/:多行注释
- ctrl+alt+l:格式化代码
- ctrl+alt+o:优化导入的类和包
- ctrl+alt+m:抽取方法
- alt+/:自动提示
- alt+enter:自动修正
- ctrl+shift+u:大小写转换
- alt+insert:生成构造/get/set/toString 等方法

### 调试程序(debug)

- F8:逐行执行程序, idea 中蓝色转折箭头(带下划线)
- F7:进入到方法中, idea 中蓝色向下箭头(带下划线)
- alt+shift+F7:强制进入到方法中, 包括 java 源码中的方法, idea 中红色向下箭头(带下划线)
- shift+F8:跳出方法, idea 中蓝色向上箭头(带下划线)
- F9:跳到下一个断点,如果没有下一个断点,那么就结束程序
- ctrl+F2:退出 debug 模式,停止程序
- 红色方块:结束调试

### 模块的导入和移除

导入:模块右键->Open Module Settings->Modules->+->选择要导入的模块->OK->Apply->OK

移除:模块右键->remove module

## 数组

- 说明: 在程序中存储同一种数据类型的多个元素的固定长度的数据结构
- 特点:

  - 一旦创建,长度不可变
  - 数据类型必须统一

- System.out.println(arr); // 隐式调用 arr.toString()方法,结果为`[I@1b6d3586`
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

- 动态初始化: 只指定长度,由系统给出初始化值
- 静态初始化: 给出初始化值,由系统决定长度(不能先声明后初始化)

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

- 说明: 数组的使用就是对数组元素的使用,下标从 0 开始,到数组长度-1 结束
- 语法: 数组名[下标]
- 作用: 用于给数组元素赋值和取值

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

## JVM 内存划分

- jdk6.0 以前:
  - 程序计数器(寄存器)
  - 本地方法栈
  - 虚拟机栈
  - 堆
  - 方法区
- jdk8.0 以后:JVM 内存+元空间

  - 程序计数器(寄存器)
  - 本地方法栈
  - 虚拟机栈
  - 堆(将原来的方法区和堆合并为一个内存区域)

- 程序计数器(寄存器):
  - 和计数器底层硬件相关,和开发没有直接关系
- 本地方法栈:
  - 用于存储本地方法(native 关键字修饰的方法,实际上是用 C 语言编写的方法)的内存空间
- 虚拟机栈:
  - 用于存储正在执行的方法的内存空间
  - 方法执行时,会自动开辟内存空间
  - 方法执行完毕后,会自动释放内存空间
- 方法区:
  - 用于存储类的信息,例如: 类的全限定名,类的修饰符,类的常量池,类的成员变量,类的成员方法,类的构造方法,类的静态变量,类的静态方法,类的抽象方法,类的接口,类的父类,类的子类,类的注解,类的字节码信息等
  - 运行期间,使用 java 命令运行字节码文件,会将字节码文件加载到方法区中
- 堆
  - 用于存储显式或隐式 new 创建的对象
  - 堆中的每块区域都有一个地址值,这个地址值就是对象的引用
  - 堆中的每块区域都有一个默认值(JVM 根据其类型决定的默认值,例如: int:0,boolean:false,引用类型:null,string:'\u0000')
  - 堆内存中有一个 GC(垃圾回收器),用于回收垃圾对象
    - 垃圾对象: 没有引用指向的对象
- 名词解释:
  - 创建: 申请内存空间
  - 加载: 将字节码文件加载到方法区中

ps: 静态方法和静态变量再 jdk7.0 以后放到了堆中,之前放到了方法区中

## 面向对象

- 阶段一:基础思想(JavaSE,JDBC,)
- 阶段二:框架(接口,项目)
- 阶段三:切面(框架)

### 面向对象 VS 面向过程

- 面向对象: 万物皆对象,强调的是对象
- 面向过程: 强调的是步骤

### 面向对象的三大特征

- 封装: 隐藏对象的属性和实现细节,仅对外提供公共访问方式
- 继承: 使用已存在的类的定义作为基础建立新类的技术,新类的定义可以增加新的数据或新的功能,也可以用父类的功能,但不能选择性地继承父类
- 多态: 同一操作作用于不同的对象上面,可以产生不同的解释和不同的执行结果

### 类和对象

- 类: 用于描述具有相同属性和相同功能的对象的集合
- 对象: 对类的具体实现
- 类是对象的模板,对象是类的实体

### 类的设计与实现

#### 类的分类

- 系统(源码)提供
- 自定义

#### 类的设计

- 步骤:
  - 根据事务的属性和行为设计最基础的模板(抽象)
  - 在模板上添加封装思想
  - 结合需求,完成基础的 JavaBean 标准类设计
    - 构造器,静态,继承,抽象,最终,接口,内部类,枚举,注解,构造器代码块,静态代码块
    - 成员:字段,方法,内部类,枚举,注解
    - 工具:构造器,构造器代码块,静态代码块
  - 封装:
    - 在程序中,给不同内容添加不同权限的访问级别,提升程序的安全性和访问性
    - 访问级别: private,缺省,protected,public
- 类的成员:
  - 成员量(属性):常量,变量
    - 成员变量:声明在代码块外部的变量,包含`实例变量`和`静态变量`
    - 成员常量:声明在代码块外部的常量,包含`实例常量`和`静态常量`
  - 成员方法(行为):实例方法,静态方法
  - 内部类

#### 实例变量和局部变量

- 实例变量: 声明在代码块外部的变量
  - 存储在堆内存中
  - 有默认值,可以不声明,直接使用
  - 作用域:整个类
  - 生命周期:随着对象的创建而创建,随着对象的销毁而销毁
  - 随对象的创建而加载,每创建一个对象,就加载一次
  - 可以被修饰符修饰
- 局部变量: 声明在代码块内部的变量
  - 存储在栈内存中
  - 没有默认值,必须声明,赋值,然后使用
  - 作用域:从声明的位置开始,到所属的代码块结束
  - 生命周期:随着所属的代码块的执行而创建,随着所属的代码块的结束而销毁
  - 随所属的代码块的执行而加载,每执行一次,就加载一次
  - 只能被 final 修饰

#### this 关键字

- this: 代表当前对象
- this.成员变量: 访问当前对象的成员变量
- this.成员方法(): 访问当前对象的成员方法
- this(...params): 访问当前对象的构造器

#### static 关键字

- static: 静态的,共享的
- 可以修饰成员变量,成员方法,代码块,内部类
- 被 static 修饰的成员,不再属于对象,而是属于类,可以通过类名.成员的方式访问
- 被 static 修饰的成员,会随着类的加载而加载,随着类的消失而消失
- 静态代码块: 随着类的加载而加载,只加载一次,用于初始化静态成员

##### 单例模式

- 单例模式: 保证一个类只有一个对象
- 将构造器私有化,防止外部创建对象
- 提供一个静态方法,用于获取对象
- 两种方式:
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

- private:
  - 私有的,只能在`本类`中访问,子类也不能访问
  - 修饰成员变量,成员方法,构造器
  - 如果外部需要访问,可以通过提供公共的访问方式
- 缺省:
  - 没有修饰符,只能在`本包`中访问,如果不同包中的子类也不能访问
  - 修饰成员变量,成员方法,构造器
- protected:
  - 受保护的,可以在`本包`中访问,不同包中的`子类`也可以访问
  - 修饰成员变量,成员方法,构造器
- public:
  - 公共的,可以在本项目的`任意位置`访问
  - 修饰成员变量,成员方法,构造器
- 修饰对象:
  - 类文件(class,interface,enum,annotation)的修饰符只能是 public(推荐) 或 缺省
  - 成员变量:都可以,推荐 private
  - 成员方法:都可以,推荐 public 和 private
  - 内部类:都可以,推荐 private 和缺省
  - 构造器:都可以,推荐 public 和 private
  - 代码块:只能 缺省
  - 静态代码块:只能 缺省

#### final 关键字

- final: 最终的,不可变的
- 修饰类: 不能被继承
- 修饰方法: 不能被重写
- 修饰变量: 不能被重新赋值,只能赋值一次(标识符需要全部大写,多个单词用下划线隔开)
- 修饰参数: 不能被重新赋值,只能赋值一次(标识符需要全部大写,多个单词用下划线隔开)

```java
byte b1=3;
byte b2=4;
byte b3=b1+b2; // 编译错误

final byte b1=3;
final byte b2=4;
byte b3=b1+b2; // 正确

final byte b1;
b1=3;
final byte b2;
b2=4;
byte b3=b1+b2; // 编译错误
```

#### 构造器

- new 关键字通过构造器创建对象进行内存空间的申请
- 初始化实例
- 对需要参数的构造器进行赋值
- 返回对象的引用
- 如果没有提供构造器,系统会提供一个无参构造器,如果提供了构造器,系统不会提供无参构造器
- 支持重载
- 格式
  - 构造器的名称必须和类名一致
  - 构造器没有返回值类型

```java
权限修饰符 类名(参数列表){
    //构造器代码块
}
```

#### 构造器代码块

- 每次调用构造器都会执行构造器代码块
- 优先于构造器执行
- 多个构造器代码块,按照顺序执行
- 可以将相同的代码放到构造器代码块中,减少代码的冗余

#### JavaBean 标准

- 程序员间的约定
- 一个类要想成为 JavaBean 标准类,必须满足以下条件:
  - 类必须被 public 修饰
  - 一个文件只允许包含一个类
  - 必须提供空参构造器
  - 成员变量必须使用 private 修饰
  - 提供公共的访问方式(get,set)
- 可有可无的条件:
  - 提供有参构造器
  - 构造器代码块
  - 静态代码块
  - toString 方法,hashCode 方法,equals 方法
  - 内部类
- 作用: 封装数据

#### 匿名对象

- 匿名对象: 没有名字的对象
- 匿名对象的使用场景:
  - 当对象只需要使用一次的时候
  - 当对象作为参数传递的时候
- 匿名对象的使用注意事项:
  - 匿名对象只能调用一次方法
  - 匿名对象不能赋值给一个变量
  - 匿名对象可以作为参数传递
  - 匿名对象可以作为方法的返回值

```java
new 类名().成员方法();
```

#### package 和 import 关键字

- package 作用: 声明类所在的包,声明在第一行
- 格式: `package 包名;`

- import 作用: 导入指定包下的类或者接口
- 格式:
  - `import 包名.类名;` : 导入指定包下的指定的类或者接口
  - `import 包名.*;` : 导入指定包下的所有类或者接口

### 继承

- 继承: 子类继承父类的属性和行为
- 作用: 提高代码的复用性和拓展性
- 语法: `class 子类 extends 父类 {}`（子类与父类是 is-a 的关系）
- 只支持单继承,不支持多继承
- 所有的类都默认继承 Object 类（Object 类是所有类的父类）

- 子类继承父类的私有成员,受限于访问权限,不能直接访问，但是可以通过父类提供的公共的访问方式访问
- 子类继承父类的构造器,通过 super 关键字调用父类的构造器

#### 继承关系中的构造器

- 子类继承父类,子类的构造器默认会调用父类的无参构造器
- 如果父类没有无参构造器,子类必须通过 super 关键字调用父类的有参构造器
- 如果父类没有无参构造器,子类也没有通过 super 关键字调用父类的有参构造器,编译报错
- 子类继承父类的构造器,通过 super 关键字调用父类的构造器
- super 关键字必须放在子类构造器的第一行

#### 方法重写

- 子类继承父类的方法,可以对父类的方法进行重写，重写后的方法可以满足子类的需求
- 重写的方法必须和父类的方法具有相同的`方法名,参数列表`,可以有不同的返回值类型
  - void 和基本数据类型的返回值类型必须相同
  - 引用数据类型的返回值类型可以是父类的返回值类型或者子类的返回值类型(包括 null)
- 重写的方法`不能使用比父类更严格的访问权限`,可以使用比父类更宽松的访问权限
- 重写的方法`不能使用比父类更严格的异常`,可以使用比父类更宽松的异常
- 重写的方法`不能使用static修饰`,因为静态方法是属于类的,不属于对象
- 重写的方法`不能使用final修饰`,因为 final 修饰的方法不能被重写
- 父类与子类不在同一个包中,子类重写父类的方法时,访问权限不能使用 `private 和 default`,可以使用 protected 和 public
- 重写注解: `@Override`,用于检测是否是重写的方法

### 抽象

- 为了让子类更加灵活,可以重写父类的方法,但是父类的方法可能没有方法体,这时候就需要使用抽象类
- 抽象类: 使用 abstract 关键字修饰的类,不能被实例化,只能被继承
- 抽象方法: 使用 abstract 关键字修饰的方法,没有方法体,只有方法的声明,必须被子类重写
- 抽象类的子类必须重写抽象类的所有抽象方法,除非子类也是抽象类
- 抽象类可以含有构造器,构造器的作用是为了子类创建对象时初始化父类的成员变量

```java
public abstract class SuperClass {
    public abstract void method(); // 抽象方法,没有方法体
}

public class SubClass extends SuperClass {
    @Override
    public void method() {}// 重写抽象方法
}
```

### 接口

- 使用 interface 关键字修饰的类,只能被实现
- 没有构造器,不能被实例化
- 数据和方法的集合(标准),没有方法体,只有方法的声明
- 程序设计的标准,提高代码的复用性和拓展性
- 多态和内部类的前提
- 接口间可以多继承,类和接口之间可以多实现
- 类与接口是实现关系,类实现接口,接口不能实现类
  - 声明接口: `public interface 接口名 {}`
  - 实现接口: `public class 类名 implements 接口名 {}`
  - 实现接口中的抽象方法: `public void method() {}`
  - 在测试类中创建实现类的对象,调用实现类中的方法
- 可以同时实现多个接口,用逗号隔开
- 可以同时继承父类和实现接口:先继承父类,再实现接口

#### 接口的成员

- 成员变量: 只能是常量,默认使用 public static final 修饰,**必须初始化**
- 构造器: **没有构造器**
- 成员方法: 只能是抽象方法,默认使用 public abstract 修饰,**不能有方法体**
- 默认方法: 使用 default 关键字修饰,可以有方法体,可以被实现类重写
  - `public default void method() {}`
  - 如果多接口中有相同的默认方法,实现类必须重写默认方法
  - 如果多接口中需要调用某个接口的默认方法,可以使用 `接口名.super.默认方法名()`
- 静态方法: 使用 static 关键字修饰,可以有方法体,不能被实现类重写
  - `public static void method() {}`
  - 调用静态方法: `接口名.静态方法名()`

## 核心类

### System 类

System 类包含了一些有用的类字段和方法,它不能被实例化,提供了标准输入,标准输出和错误输出流,提供了访问外部定义的属性和环境变量的方法

该类位于 java.lang 包中,所以不需要导入

#### System 类的常用方法

- `public static PrintStream err` : 标准错误输出流
- `public static PrintStream out` : 标准输出流
- `public static InputStream in` : 标准输入流
- `public static void exit(int status)` : 终止当前运行的 Java 虚拟机,非零表示异常终止
- `public static long currentTimeMillis()` : 返回当前时间(以毫秒为单位)
- `public static void gc()` : 运行垃圾回收器
- `public static void arraycopy(Object src, int srcPos, Object dest, int destPos, int length)` : 将数组中指定的数据拷贝到另一个数组中
- `public static long nanoTime()` : 返回最准确的可用系统计时器的当前值(以毫微秒为单位)
- `public static void runFinalization()` : 强制调用已经失去引用的对象的 finalize 方法
- `public static Properties getProperties()` : 获取当前系统的属性集
- `public static String getProperty(String key)` : 获取指定键指示的系统属性
- `public static String getenv(String name)` : 获取指定的环境变量的值
- `public static void load(String filename)` : 加载指定的文件名的动态库

### Scanner 类

- 用于获取键盘输入,可以获取基本类型的值和字符串值
- 位于 java.util 包中,需要导入
- 构造器
  - `public Scanner(InputStream source)` : 构造一个新的 Scanner,它生成的值是从指定的输入流扫描的
  - `public Scanner(String source)` : 构造一个新的 Scanner,它生成的值是从指定的字符串扫描的
- 常用方法
  - `public boolean hasNext()` : 判断是否还有下一个输入项
  - `public String next()` : 读取下一个输入项,遇到空格,tab,回车结束
  - `public int nextInt()` : 读取下一个 int 类型的值,
  - `public double nextDouble()` : 读取下一个 double 类型的值
  - `public String nextLine()` : 读取下一行,在该方法前不能有`非nextLine的其他`的输入项
  - `public boolean hasNextLine()` : 判断是否还有下一行
  - `public void close()` : 关闭此扫描器(关闭后不可再使用)

### Math 类

- 位于 java.lang 包中,不需要导入
- 包含用于执行基本数学运算的方法,如初等指数,对数,平方根和三角函数
- 随机数生成器的方法

```java
double d = Math.random(); //返回带正号的double值,大于等于0.0且小于1.0
```

### Arrays 类

- 位于 java.util 包中,需要导入
- 提供了操作数组的方法
  - `public static String toString(int[] a)` : 返回指定数组内容的字符串表示形式
  - `public static int[] copyOf(int[] original, int newLength)` : 将指定数组的指定长度复制到一个新数组中
  - `public static int binarySearch(int[] a, int key)` : 使用二分搜索法搜索指定数组的指定值
  - `public static void sort(int[] a)` : 对指定的 int 类型数组按数字升序进行排序,unicode 码升序
  - `public static T[] sort(T[] a, Comparator<? super T> c)` : 对指定的对象数组按指定的 Comparator 进行排序
    - 自然排序: 实现`Comparable<T>`接口,重写`compareTo(T o)`方法
    - 自定义排序: 实现`Comparator<? super T>`接口,重写`compare(T o1, T o2)`方法

### BigInteger 类

- 位于 java.math 包中,需要导入
- 不可变的任意精度整数
- 针对大整数的运算,不会丢失精度
- 构造器
  - `public BigInteger(String val)` : 通过字符串构造一个 BigInteger 对象
- 常用方法
  - 和 Math 类似,提供了大整数的运算方法
  - 还提供了位运算方法 `and`, `andNot`, `or`, `xor`, `not`, `shiftLeft`, `shiftRight`

### BigDecimal 类

- 位于 java.math 包中,需要导入
- 不可变的,任意精度的有符号十进制数(包括整数和小数)
- 构造器
  - `public BigDecimal(String val)` : 通过字符串构造一个 BigDecimal 对象
- 常用方法
  - 和 Math 类似,提供了大整数的运算方法
  - 还提供了位运算方法 `and`, `andNot`, `or`, `xor`, `not`, `shiftLeft`, `shiftRight`

### Object 类

- Object 类是所有类的父类(包括数组)
- Object 类中的方法可以在所有类中使用
- 所有的接口都默认继承 Object 类的方法的抽象形式
- 构造器
  - `public Object()` : 构造一个新的 Object 对象
- 常用方法
  - `public String toString()` : 返回该对象的字符串表示,默认返回对象的地址值
  - `public boolean equals(Object obj)` : 指示其他某个对象是否与此对象"相等"
    - `==` : 比较引用类型变量的地址值是否相同,基本类型变量比较值是否相同
    - `equals`: 比较**引用类型**变量的地址值是否相同,如果重写了 equals 方法,比较的是重写后的内容
