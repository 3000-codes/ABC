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
- 私有(静态)方法(JDK9+): 使用 private 关键字修饰
  - `private void method() {}` | `private static void method() {}`
  - 私有方法只能在接口中使用,不能在实现类中使用
  - 私有静态方法可以在其他静态和非静态接口方法中使用
  - 私有非静态方法不能在私有静态方法内部使用

### 多态

- 多态: 同一种事物的多种形态,提高代码的复用性和拓展性
- 多态的前提: 继承,实现,重写
  - 父类引用指向子类对象: `父类名 对象名 = new 子类名();`
    - 实例化后的对象是子类对象,但是引用类型是父类类型,所以只能调用父类中的成员,不能调用子类中特有的成员
    - 如果所调用的方法被子类重写,那么调用的是子类重写后的方法
    - 如果想要调用子类中特有的成员,需要向下转型
  - 接口引用指向实现类对象: `接口名 对象名 = new 实现类名();`
- 多态的弊端: 不能使用子类特有的成员

#### 向下转型和向上转型

- 向下转型: 父类引用转为子类引用,需要强制类型转换
  - `子类名 对象名 = (子类名) 父类对象名;`
  - 如果父类引用指向的是子类对象,那么可以向下转型
  - 如果父类引用指向的不是子类对象,那么不能向下转型,会报错
- 向上转型: 子类对象转为父类引用,不需要强制类型转换
  - `父类名 对象名 = 子类对象名;`
  - 如果子类对象指向的是父类对象,那么可以向上转型
  - 如果子类对象指向的不是父类对象,那么不能向上转型,会报错
- instanceof 运算符: 判断对象是否是某个类的实例,返回 boolean 类型的值
  - `对象名 instanceof 类名`
  - 如果对象是该类的实例,返回 true,否则返回 false

### 内部类

- 内部类: 在类的内部定义的类
- 内部类的分类: 成员内部类,局部内部类,
- 成员内部类：
  - 实例成员内部类：
    - 四种权限修饰符都可以修饰，推荐使用 private 或缺省
    - 某些类不希望被其他类使用,可以将其定义在其他类的内部,使用 private 修饰,只能在当前类中使用
    - 在外部类的内部实例化内部类: `内部类名 对象名 = new 内部类名();`
    - 在外部类的外部实例化内部类: `外部类名.内部类名 对象名 = new 外部类名().new 内部类名();`
    - 不能在内部类中定义静态成员
    - 外部类可以直接访问内部类的成员,包括私有成员
    - 内部类访问外部类的成员,需要使用`外部类名.this.成员名`,`外部类名.super.成员名`
  - 静态成员内部类
    - 只能使用 static 修饰
    - 静态既可以声明实例成员,也可以声明静态成员
    - 外部类可以直接访问内部类的成员,包括私有成员
- 局部内部类：

  - 普通局部内部类

    - 定义`在方法中的类`,只能在当前方法中使用，使用时必须在其定义之后
    - 只能使用 缺省 修饰
    - 可以使用 final 或 abstract 修饰，不能使用 static 修饰
    - 可以访问外部类的成员,包括私有成员
    - 当内部类的实例变量或局部变量与外部方法的局部变量同名时,内部类访问无法方法的同名局部变量，
    - 内部类无法访问外部方法的非 final 局部变量

  - 匿名局部内部类
    - 没有类名,只有类体
    - `接口名 对象名 = new 接口名() {类体};`
    - 调用抽象父类或者接口作为参数的方法时,可以使用匿名内部类作为参数
    - 匿名内部类只能使用一次

```java
  // 接口
  public interface IInterface {
      void method();
  }

  public class Outer {
      public void method() {
        //匿名内部类
          IInterface i = new IInterface() {
              @Override
              public void method() {
                  System.out.println("匿名内部类");
              }
          };
          i.method();
      }
  }

 abstract class AbstractClass {
     public abstract void method();
 }

  public class Outer {
      public void method() {
          //匿名内部类
          AbstractClass a = new AbstractClass() {
              @Override
              public void method() {
                  System.out.println("匿名内部类");
              }
          };
          a.method();
      }
}
```

### 枚举类

- 枚举类: 一种特殊的类,用于表示一个有限的几个对象
- 枚举类的定义: `enum 枚举类名 {枚举值1(参数列表),枚举值2(参数列表),...}`
- 枚举类的构造方法默认使用 private 修饰,不能使用 public 修饰
- 使用枚举类: `枚举类名.枚举值`
- 枚举类的常用方法
  - `public String name()` : 获取枚举值的名称
  - `public int ordinal()` : 获取枚举值的序号
  - `public static 枚举类名 valueOf(String name)` : 将字符串转为枚举值
  - `public 枚举类名[] values()` : 获取枚举类的所有枚举值
- 枚举类的实现原理：枚举类的实现原理是使用类实现的,所以枚举类也是一种特殊的类,枚举值是枚举类的实例对象
- 注意事项：
  - 枚举类的所有枚举值必须在枚举类的第一行显示定义，使用`,`分隔
  - 枚举值的名称必须是大写字母。
  - 枚举类的构造方法默认使用 private 修饰,不能使用 public 修饰
  - 枚举值无法被重新赋值，默认被`public static final`修饰
  - 无法继承其他类,但可以实现接口
  - 可以使用`==`比较两个枚举值是否相等
  - 无法通过 new 实例化枚举类
  - 构造器方法实际上是枚举值的构造方法
  - 隐式继承于 java.lang.Enum 类，无法显式继承其他类，也不能被继承，但可以实现接口

```java
public enum Week {
  MONDAY("星期一", 1), // new Week("星期一", 1)
  TUESDAY("星期二", 2),
  WEDNESDAY("星期三", 3),
  THURSDAY("星期四", 4),
  FRIDAY("星期五", 5),
  SATURDAY("星期六", 6),
  SUNDAY("星期日", 7),
  ERROR("错误", -1);

  private String name;
  private int index;

  private Week(String name, int index) {
    this.name = name;
    this.index = index;
  }

  public static Week getWeek(int index) {
    for (Week week : Week.values()) {
      if (week.index == index) {
        return week;
      }
    }
    return null;
  }

  public String getName() {
    return name;
  }

  public int getIndex() {
    return index;
  }
}
```

### 包装类

- 基本数据类型与包装类的对应关系

  | 基本数据类型 | 包装类    |
  | ------------ | --------- |
  | byte         | Byte      |
  | short        | Short     |
  | int          | Integer   |
  | long         | Long      |
  | float        | Float     |
  | double       | Double    |
  | char         | Character |
  | boolean      | Boolean   |

- 基本数据类型与包装类的转换
  - 自动装箱：基本数据类型 -> 包装类
  - 自动拆箱：包装类 -> 基本数据类型
  - JDK 1.5 之前需要手动装箱和拆箱
- 基本数据类型、包装类、String 类之间的相互转换
  - 基本数据类型 -> String 类型：基本数据类型的值 + ""
  - String 类型 -> 基本数据类型：使用包装类的静态方法 parseXXX("数值类型的字符串")
  - String 类型 -> 包装类：使用包装类的构造器
  - 包装类 -> String 类型：包装类的对象 + ""

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

### String 类

- 位于 java.lang 包中,不需要导入
- 代表字符串,是一个不可变的字符序列
- 底层是一个数组（jdk8：`char[]`，jdk9：`byte[]`）且被`final`修饰,不能改变
- 构造器
  - `public String()` : 初始化一个新创建的 String 对象,表示**空字符**序列
  - `public String(char[] value)` : 通过字符数组来构造新的字符串对象
  - `public String(byte[] bytes)` : 通过字节数组来构造新的字符串对象
  - `public String(char[] value, int offset, int count)` : 通过字符数组的一部分来构造新的字符串对象
  - `public String(byte[] bytes, int offset, int length)` : 通过字节数组的一部分来构造新的字符串对象
  - `public String(String original)` : 通过字符串来构造新的字符串对象
  - `public String(StringBuffer buffer)` : 通过字符串缓冲区来构造新的字符串对象
  - `public String(StringBuilder builder)` : 通过字符串构建器来构造新的字符串对象
- 常用方法

  - 判断
    - 比较
      - `equals`比较的是内容
      - `==`比较的是地址值
      - `ignoreCase`忽略大小写,再比较内容
    - 判断是否包含
      - `contains`判断是否包含
      - `startsWith`判断是否以某个字符串开头
      - `endsWith`判断是否以某个字符串结尾
    - 判断字符串是否为空（isEmpty）
  - 获取
    - 获取字符串的长度（length）
    - 获取指定索引位置的字符（charAt）
    - 获取指定索引位置的字符的 ASCII 码值（codePointAt）
    - 获取指定字符的索引位置
      - indexOf 从前往后找
      - lastIndexOf 从后往前找
      - 找不到返回-1
    - 截取字符串
      - substring(int beginIndex),从指定索引位置开始截取到末尾
      - substring(int beginIndex, int endIndex),从指定索引位置开始截取到指定索引位置结束
    - 替换字符串（replace(char oldChar, char newChar)、replaceAll(String regex, String replacement)、replaceFirst(String regex, String replacement)）
  - 转换
    - 转换大小写
      - toUpperCase
      - toLowerCase
    - 转换为字符数组
      - toCharArray
    - 转换为字节数组
      - getBytes
  - 切割
    - split(String regex): 按照参数的规则,将字符串切割成若干部分

- 创建方式：
  - 字面量创建
  - 构造器创建

#### StringBuffer 类 与 StringBuilder 类（274）

- 相同点：
  - 都是继承于 AbstractStringBuilder 类
  - 都是可变的字符序列
  - 拥有一样的方法，功能有差异
- 不同点：
  - StringBuffer 的方法都被 synchronized 修饰，是线程安全的，适用于多线程，效率低
  - StringBuilder 的方法是线程不安全的，适用于单线程，效率高，一般使用这个；如果在多线程中使用，需要手动添加线程安全

### 日期时间类

- 第一代(JDK1.0)：Date , DateFormat , SimpleDateFormat
- 第二代(JDK1.1)：Calendar , GregorianCalendar
- 第三代(JDK1.8): LocalDate , LocalTime , LocalDateTime , DateTimeFormatter

#### Date 类

- Date 类表示特定的瞬间，精确到毫秒
- 构造器
  - `public Date()` : 分配 Date 对象并初始化此对象,以表示分配它的时间（精确到毫秒）
  - `public Date(long date)` : 分配 Date 对象并初始化此对象,以表示自从标准基准时间（称为“历元（epoch）”,即 1970 年 1 月 1 日 00:00:00 GMT）以来的指定毫秒数
- 常用方法
  - `public long getTime()` : 把日期对象转换成对应的时间毫秒值
  - `public void setTime(long time)` : 使用自 1970 年 1 月 1 日以来的毫秒数设置日期对象

#### 第一代的时间格式化和解析

- 格式化:Date->字符串:
- 解析:字符串->Date 对象

##### DateFormat 类

- 一个抽象类
- 常用方法
  - `public final string format(Date date)`:按照指定的模式,把 Date 对象转换为字符串
  - `public Date parse(String source)`:解析字符串成一个 Date 对象

##### SimpleDateFormat

- 针对 DateFormat 类的实现类,可以使用指定的模式字符串来创建 SimpleDateFormat 对象,模式字符串区分大小写
- 构造器
  - `public SimpleDateFormat(String pattern)` : 用给定的模式和默认语言环境的日期格式符号构造 SimpleDateFormat
- 常用方法
  - `public String format(Date date)` : 将 Date 格式化为日期/时间字符串
  - `public Date parse(String source)` : 从给定字符串的开始解析文本以生成日期

```java

Date date = new Date();
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String format = sdf.format(date);// 2020-03-24 15:46:24
System.out.println(format);

String str = "2020-03-24 15:46:24";
Date parse = sdf.parse(str);
System.out.println(parse); // Tue Mar 24 15:46:24 CST 2020
```

#### Calendar 类

- Calendar 类是一个抽象类,它为特定瞬间与一组诸如 YEAR、MONTH、DAY_OF_MONTH、HOUR 等日历字段之间的转换提供了一些方法,并为操作日历字段（例如获得下星期的日期）提供了一些方法
- Calendar 类无法直接创建对象使用,里边有一个静态方法叫 getInstance(),该方法返回了 Calendar 类的子类对象
- 常用方法
  - `public int get(int field)` : 返回给定日历字段的值
  - `public void set(int field, int value)` : 将给定的日历字段设置为给定值
  - `public abstract void add(int field, int amount)` : 根据日历的规则,为给定的日历字段添加或减去指定的时间量
  - `public Date getTime()` : 返回一个表示此 Calendar 时间值（从历元到现在的毫秒偏移量）的 Date 对象
  - `public final void setTimeZone(TimeZone value)` : 为此 Calendar 对象设置时区

```java
Calendar c = Calendar.getInstance();
int year = c.get(Calendar.YEAR);
int month = c.get(Calendar.MONTH);// 一月是0
int date = c.get(Calendar.DATE);
System.out.println(year + "年" + (month + 1) + "月" + date + "日"); // 2020年3月24日
```

#### LocalDateTime 类

- 日期时间类,表示一个日期时间对象
- 构造器 :私有化
- 常用方法
  - `LocalDateTime.now()` : 静态方法,返回当前时间
  - `public int getYear()` : 获取年份
  - `public int getMonthValue()` : 获取月份
  - `public int getDayOfMonth()` : 获取日
  - `public int getHour()` : 获取小时
  - `public int getMinute()` : 获取分钟
  - `public int getSecond()` : 获取秒
  - `public String format(DateTimeFormatter formatter)` : 按照指定的格式,把日期时间格式化为字符串
  - `public LocalDateTime parse(CharSequence text, DateTimeFormatter formatter)` : 按照指定的格式,把字符串解析为日期时间

```java
LocalDateTime ldt = LocalDateTime.now();
int year = ldt.getYear();
int month = ldt.getMonthValue();
int day = ldt.getDayOfMonth();
int hour = ldt.getHour();
int minute = ldt.getMinute();
int second = ldt.getSecond();
System.out.println(year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒"); // 2020年3月24日15时56分24秒
```

#### DateTimeFormatter 类

- 针对第三代的时间格式化和解析
- 构造器:私有化
- 常用方法
  - `public static DateTimeFormatter ofPattern(String pattern)` : 使用指定的模式创建格式化程序
  - `public String format(TemporalAccessor temporal)` : 使用此格式化程序格式化日期时间对象
  - `public <T> T parse(CharSequence text, TemporalQuery<T> query)` : 使用此格式解析文本以生成日期时间对象

```java
LocalDateTime ldt = LocalDateTime.now();
DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss");
String format = dtf.format(ldt);
System.out.println(format); // 2020年03月24日 16:00:00

String str = "2020年03月24日 16:00:00";
LocalDateTime parse = ldt.parse(str, dtf);
System.out.println(parse); // 2020-03-24T16:00
```

### 集合

数组和集合的区别

- 数组:存储的是同一类型的元素,长度是固定的,不能进行增删
- 集合:存储的是同一类型的元素,长度是可变的,可以进行增删
- 数组的元素可以是基本数据类型,也可以是引用数据类型
- 集合的元素只能是引用数据类型

集合框架体系结构

- 单例集合框架: 存储元素以'个'为单位
  - Collection 接口
    - List 接口
      - ArrayList 类
      - LinkedList 类
      - Vector 类
    - Set 接口
      - HashSet 类
      - LinkedHashSet 类
      - TreeSet 类
- 双列集合框架: 存储元素以'对'为单位
  - Map 接口
    - HashMap 类
    - LinkedHashMap 类
    - TreeMap 类
    - Hashtable 类
    - Properties 类

#### Iterator 接口

- Iterator 接口是单列集合框架中的顶层接口,里边定义了迭代器的常用方法
- 一个迭代器对象都只能遍历一次集合,如果需要再次遍历,需要重新获取迭代器对象
- 迭代过程中,集合不推荐进行修改操作,否则会抛出异常
- 常用方法
  - `public E next()` : 返回迭代的下一个元素,如果没有元素,则抛出异常
  - `public boolean hasNext()` : 如果仍有元素可以迭代,则返回 true
  - `public void remove()` : 从迭代器指向的 collection 中移除迭代器返回的最后一个元素（可选操作）

#### 泛型

- 泛型是一种广泛的类型,可以在类或方法中预支地使用未知的类型
- 泛型的好处
  - 提高安全性(将运行期的错误转换到编译期)
  - 省去强转的麻烦
- 泛型的使用
  - 定义类时,通过一个标识表示类中某个属性的类型或某个方法的返回值及参数类型
  - 这个标识只能是引用类型
  - 在使用时,确定泛型的类型
- 泛型通配符<?>
  - 任意类型,如果没有明确,那么就是 Object 类型
  - 限定类型的上限
    - 格式: `? extends 类型`
    - 代表使用的泛型只能是类型的子类/本身
  - 限定类型的下限
    - 格式: `? super 类型`
    - 代表使用的泛型只能是类型的父类/本身

```java
public class GenericClass<E> {
    private E name;

    public E getName() {
        return name;
    }

    public void setName(E name) {
        this.name = name;
    }
}

GenericClass<String> gc = new GenericClass<>();

```

#### Collection 接口

- Collection 是集合的顶层接口,它定义了集合框架的通用功能(集合中存储的单个对象的操作)
- 常用方法

  - `public boolean add(E e)` : 把给定的对象添加到当前集合中
  - `public void clear()` : 清空集合中所有的元素
  - `public boolean remove(E e)` : 把给定的对象在当前集合中删除
  - `public boolean contains(E e)` : 判断当前集合中是否包含给定的对象
  - `public boolean isEmpty()` : 判断当前集合是否为空
  - `public int size()` : 返回集合中元素的个数
  - `public Object[] toArray()` : 把集合中的元素,存储到数组中
  - `public Iterator<E> iterator()` : 获取迭代器,用于遍历集合中的元素
  - `public Stream<E> stream()` : 获取流对象,用于操作集合中的元素
  - `public void forEach(Consumer<? super E> action)` : 遍历集合中的元素

  ```java
  Collection<String> coll = new ArrayList<>();
  coll.add("张三");
  coll.add("李四");
  coll.add("王五");
  coll.add("赵六");

  coll.forEach(new Consumer<String>() { // 匿名内部类
      @Override
      public void accept(String s) {
          System.out.println(s);
      }
  });

  coll.forEach(s -> System.out.println(s)); // Lambda 表达式
  coll.forEach(System.out::println); // 方法引用

  // 获取stream流
  Stream<String> stream = coll.stream();
  stream.forEach(System.out::println);
  ```

#### Collections 类

- 针对集合操作的工具类
- 常用方法
  - `public static <T> boolean addAll(Collection<T> c, T... elements)` : 往集合中添加一些元素
  - `public static void shuffle(List<?> list)` : 打乱集合顺序
  - `public static <T> void sort(List<T> list)` : 将集合中元素按照默认规则排序
  - `public static <T> void sort(List<T> list，Comparator<? super T> )` : 将集合中元素按照指定规则排序
  - `public static <T> T max(Collection<? extends T> coll)` : 根据元素的自然顺序，返回最大的元素
  - `public static void reverse(List<?> list)` : 反转集合中元素的顺序
  - `public static void swap(List<?> list, int i, int j)` : 将指定集合中的 i 处元素和 j 处元素进行交换

#### List 接口

- List 接口继承 Collection 接口,是单列集合的一个重要分支,习惯性地会把实现了 List 接口的对象称为 List 集合
- 由 List 接口实现的类的特点:有序、可重复
- 提供了四种索引的实现方式:数组,链表,队列,栈
- 拥有特殊迭代器`ListIterator`,可以实现逆向遍历和添加元素
- 常用方法
  - `public void add(int index, E element)` : 将指定的元素,添加到该集合中的指定位置上
  - `public E get(int index)` : 返回集合中指定位置的元素
  - `public E set(int index, E element)` : 用指定元素替换集合中指定位置的元素,返回值的更新前的元素
  - `public E remove(int index)` : 移除列表中指定位置的元素,返回的是被移除的元素
  - `public List<E> subList(int fromIndex, int toIndex)` : 返回从 fromIndex 到 toIndex 位置的子集合
  - `public int indexOf(Object o)` : 返回集合中首次出现的指定元素的索引,如果不存在,则返回 -1
  - `public int lastIndexOf(Object o)` : 返回集合中最后一次出现的指定元素的索引,如果不存在,则返回 -1
  - `public ListIterator<E> listIterator()` : 返回列表中元素的列表迭代器(按适当顺序)
- 六种遍历方式
  - 普通 for 循环
  - 增强 for 循环
  - forEach 方法
  - Stream 流
  - 迭代器
  - 列表迭代器
- 数组结构:底层使用数组结构,查询快,增删慢
- 链表结构:底层使用类的实现,不断套娃,查询慢,增删快
  - 单向链表:至少含有 2 个属性(当前节点的值和下一个节点的地址)
  - 双向链表:至少含有 3 个属性(当前节点的值,上一个节点的地址和下一个节点的地址)

#### ArrayList 类

- ArrayList 是 List 接口的一个实现类,适用于频繁查询,遍历操作,不适用于频繁增删操作
- 特点:有索引,有序,可重复,可以存储 null 值(遍历时要注意空指针异常),线程不安全,效率高
- 构造方法
  - `public ArrayList()` : 容量在 jdk1.8 之前默认为 10,之后为 0
  - `public ArrayList(int initialCapacity)` : 构造一个指定初始容量的空列表
  - `public ArrayList(Collection<? extends E> c)` : 构造一个包含指定集合的元素的列表,按照集合的迭代器返回的顺序排列
- 底层数组扩容规则:
  - 首次添加元素:创建一个长度为 `10` 的数组
  - 再次添加元素:创建一个长度为`原数组长度 + 原数组长度 / 2` 的数组
- JDK1.8 之后的变化:
  - 无参构造器初始容量不同:1.8 之前为 10,之后为 0
  - 扩容机制不同:1.8 之前为`原数组长度 + 原数组长度 / 2 +1 `,之后为 底层数组的扩容规则(上面写了)

#### Vector 类

- Vector 是 List 接口的一个实现类
- 特点:有索引,有序,可重复,可以存储 null 值(遍历时要注意空指针异常),线程安全,适用于多线程环境,如果在单线程环境下效率较低
- 其他和 ArrayList 类似

#### LinkedList 类

- LinkedList 是 底层数据结构是"双向链表"的 List 集合
- 特点:有索引,有序,可重复,可以存储 null 值(遍历时要注意空指针异常),线程不安全,效率高
- 构造器
  - `public LinkedList()` : 构造一个空列表
- 常用方法

  - 其他和 List 类似
  - `public void addFirst(E e)` : 将指定元素插入此列表的开头
  - `public void addLast(E e)` : 将指定元素添加到此列表的结尾
  - `public E getFirst()` : 返回此列表的第一个元素
  - `public E getLast()` : 返回此列表的最后一个元素
  - `public E removeFirst()` : 移除并返回此列表的第一个元素
  - `public E removeLast()` : 移除并返回此列表的最后一个元素

#### Set 接口

- 由 Set 接口实现的类的特点
  - 可以有序,也可以无序
  - 不可重复
  - 没有索引
  - 遍历方式：for，增强 for，迭代器，Stream 流

#### HashSet 类

- HashSet 底层封装了一个 HashMap,使用 HashMap 的 key 来存储元素,保证元素的唯一性
  - 无序的，不保证存储和取出的顺序一致
  - 不可重复
  - 没有索引
  - 可以使用 null 值，遍历时要注意空指针异常
  - 元素顺序和底层数组长度有关，一旦长度变化，元素位置可能会发生变化
  - 线程不安全，效率高，适用于单线程环境，如果在多线程环境下需要手动添加线程安全
- 构造器
  - `public HashSet()` : 构造一个新的空集合,底层是一个 HashMap，初始容量为 16,负载因子为 0.75，当元素个数超过 16 \* 0.75（默认容量） 时，就会进行扩容
  - `public HashSet(Collection<? extends E> c)` : 构造一个包含指定集合的元素的集合,按照集合的迭代器返回的顺序排列
- 常见方法见 Collection 接口

#### LinkedHashSet 类

- LinkedHashSet 是 HashSet 的子类,底层是一个哈希表(数组+链表/红黑树)+链表,多了一条链表(记录元素的存储顺序),保证元素有序
- 特点
  - 有序
  - 不可重复
  - 没有索引
  - 可以使用 null 值，遍历时要注意空指针异常
  - 线程不安全，效率高，适用于单线程环境，如果在多线程环境下需要手动添加线程安全
- 构造器
  - `public LinkedHashSet()` : 构造一个新的空集合,底层是一个 LinkedHashMap
  - `public LinkedHashSet(Collection<? extends E> c)` : 构造一个包含指定集合的元素的集合,按照集合的迭代器返回的顺序排列
- 常见方法见 Collection 接口

#### TreeMap 类

- TreeMap 是 Map 接口的一个实现类,底层是红黑树(一种自平衡的二叉树),保证键的唯一性
- 无序的，不保证存储和取出的顺序一致
- 不可以存储 null 键，可以存储 null 值，遍历时要注意空指针异常
- 线程不安全，效率高，适用于单线程环境，如果在多线程环境下需要手动添加线程安全
- 包含：当前元素，父节点，左子节点，右子节点，颜色标记
- 可以针对集合中的元素进行“自然排序”或者“定制排序”
- 便于升降序排序，查找和增删效率较高
- 构造器
  - `public TreeMap()` : 构造一个新的空映射,根据键的自然顺序进行排序
  - `public TreeMap(Comparator<? super K> comparator)` : 构造一个新的空映射,根据自定义比较器进行排序

#### TreeSet 类

- 底层是一个 TreeMap,保证元素的唯一性
- 无序的，不保证存储和取出的顺序一致
- 可以根据元素的自然顺序排序，也可以根据构造方法的 Comparator 排序
- 不能存储 null，存储时会抛出空指针异常
- 线程不安全，效率高，适用于单线程环境，如果在多线程环境下需要手动添加线程安全
- 构造器
  - `public TreeSet()` : 构造一个新的空集合,底层是一个 TreeMap
  - `public TreeSet(Comparator<? super E> comparator)` : 构造一个新的空 TreeSet,根据指定比较器进行排序
  - `public TreeSet(Collection<? extends E> c)` : 构造一个包含指定集合的元素的 TreeSet,按照集合的迭代器返回的顺序排列
  - `public TreeSet(SortedSet<E> s)` : 构造一个包含指定有序集合的元素的 TreeSet,按照集合的迭代器返回的顺序排列

```java

TreeSet<Integer> treeSet = new TreeSet<>();

treeSet.add(88);
treeSet.add(66);
treeSet.add(99);
treeSet.add(77);
treeSet.add(11);

// 自然排序
// 基本数据类型，根据包装类的数值大小升序排序（boolean 除外）
// String 类型，unicode 编码升序排序
System.out.println(treeSet); // [11, 66, 77, 88, 99]

// 自定义排序(重写 Comparator 接口的 compare 方法)
TreeSet<String> treeSet1 = new TreeSet<>(new Comparator<String>() {
    @Override
    public int compare(String o1, String o2) {
        // 按照字符串长度升序排序
        int num = o1.length() - o2.length();
        // 长度相同，按照字典顺序升序排序
        return num == 0 ? o1.compareTo(o2) : num;
    }
});

treeSet1.add("aaa");
treeSet1.add("a");
treeSet1.add("bb");
treeSet1.add("ccc");

System.out.println(treeSet1); // [a, bb, aaa, ccc]

```

#### Map 接口

- Map 集合以键值对的形式存储数据，键不可重复，值可重复
- 常用方法
  - `public V put(K key, V value)` : 将指定的值与该映射中的指定键关联（可选操作）。如果此映射以前包含一个该键的映射关系，则用指定值替换旧值
  - `public V get(Object key)` : 返回到指定键所映射的值，如果此映射不包含该键的映射关系，则返回 null
  - `public V remove(Object key)` : 如果存在一个键的映射关系，则将其从此映射中移除（可选操作）
  - `public boolean containsKey(Object key)` : 如果此映射包含指定键的映射关系，则返回 true
  - `public Set<K> keySet()` : 返回此映射中包含的键的 Set 视图
  - `public Set<Map.Entry<K,V>> entrySet()` : 返回此映射中包含的映射关系的 Set 视图
  - `public Collection<V> values()` : 返回此映射中包含的值的 Collection 视图
  - `public boolean isEmpty()` : 如果此映射未包含键-值映射关系，则返回 true
  - `public int size()` : 返回此映射中的键-值映射关系数
  - `public void clear()` : 从此映射中移除所有映射关系（可选操作）
  - `public boolean containsValue(Object value)` : 如果此映射将一个或多个键映射到指定值，则返回 true
- 遍历方法
  - 通过 set 或 collection 的方法遍历
    - `public Set<K> keySet()` : 根据键找值
    - `public Set<Map.Entry<K,V>> entrySet()` : 根据键值对对象找键和值
    - `public Collection<V> values()` : 根据值找键
  - forEach 遍历
    - `public void forEach(BiConsumer<? super K,? super V> action)` : 对此映射中的每个键值对执行给定的操作，直到所有键值对都被处理或动作引发异常
    ```java
    map.forEach((k, v) -> System.out.println(k + " = " + v));
    map.forEach(new BiConsumer<String, Integer>() {
        @Override
        public void accept(String s, Integer integer) {
            System.out.println(s + " = " + integer);
        }
    });
    ```

#### HashMap 类

- HashMap 是 Map 接口的一个实现类,底层是哈希表,查询速度快
- 哈希表结构：
  - jdk7 之前：链表对象的数组
  - jdk8 之后：链表或红黑树对象的数组
- 特点
  - 无序，且不保证顺序恒久不变
  - 键不可重复,值可重复
  - 线程不安全,效率高
  - 键与值都可以为 null，获取时需要注意空指针异常
  - 除了非同步和允许使用 null 键 之外，HashMap 类与 Hashtable 大致相同。
- 构造器
  - `public HashMap()` : 构造一个具有默认初始容量 (16) 和默认加载因子 (0.75) 的空 HashMap
  - `public HashMap(int initialCapacity)` : 构造一个带指定初始容量和默认加载因子 (0.75) 的空 HashMap
  - `public HashMap(int initialCapacity, float loadFactor)` : 构造一个带指定初始容量和加载因子的空 HashMap
  - `public HashMap(Map<? extends K,? extends V> m)` : 构造一个映射关系与指定 Map 相同的新 HashMap
- 常用方法： 同 Map 接口

#### hashTable 类

- 除了非同步和允许使用 null 之外，HashMap 类与 Hashtable 大致相同。
- 无参构造器: 构造一个具有默认初始容量 (11) 和默认加载因子 (0.75) 的空哈希表
- 扩容规则不同
  - HashMap 扩容为原来的 2 倍
  - Hashtable 扩容为原来的 2 倍 + 1
- 底层数组的元素类型不同
  - HashMap 数组元素
    - jdk7 之前：数组元素类型为 null,或者链表对象
    - jdk8 之后：数组元素类型为 null,或者链表对象,或者红黑树对象
  - Hashtable 数组元素
    - 数组元素类型为 null,或者链表对象

## 异常和异常处理

### Throwable 类

- Throwable 类是 Java 语言中所有错误或异常的超类
- 错误(Error)：程序无法处理的错误，表示运行应用程序中较严重问题,如系统崩溃、虚拟机错误、内存空间不足、栈溢出等,无法恢复或不可能捕获的情况
- 异常(Exception)：程序本身可以处理的异常,如空指针、数组下标越界等,可以使用 try-catch-finally 语句进行捕获,进行相应的处理
- 构造器
  - `public Throwable()` : 构造一个新的 Throwable 对象
  - `public Throwable(String message)` : 构造一个新的 Throwable 对象并带有指定的消息
  - `public Throwable(String message, Throwable cause)` : 构造一个新的 Throwable 对象并带有指定的消息和原因
  - `public Throwable(Throwable cause)` : 构造一个新的 Throwable 对象并带有指定的原因
- 常用方法

  - `public String getMessage()` : 返回关于发生的异常的详细信息
  - `public String toString()` : 返回异常发生时的简要描述
  - `public void printStackTrace()` : JVM 打印异常对象,默认此方法,打印的异常信息是最全面的

```java

new Throwable("异常信息前缀").printStackTrace();
```

### Exception 类(异常)

- 在编译时期出现的异常,叫做编译期异常,如：IOException、ClassNotFoundException、NoSuchMethodException,必须手动处理,否则程序就会报错,无法通过编译
- 在运行时期出现的异常,叫做运行期异常,如：NullPointerException、ArrayIndexOutOfBoundsException、ClassCastException,可以不处理或处理,如果不处理,默认交给 JVM 处理(中断程序,打印异常信息)
- 无论是编译期异常还是运行期异常,Java 虚拟机都会终止运行,为了保证程序的健壮性,需要对出现的异常进行处理

#### 异常处理方式

- 异常声明处理: 方法内部不进行异常处理,交给调用者处理,调用者也不处理,一直抛出,最终交给 JVM 处理
  - throw 关键字: 用在方法内部,跟的是异常类对象,可以抛出指定的异常对象
  - throws 关键字: 用在方法声明后面,跟的是异常类名,可以跟多个异常类名,用逗号隔开,表示抛出异常
  - `修饰符 返回值类型 方法名(参数列表) throws AAAException,BBBException...{...}`
  - 在方法声明时抛出的异常类间如果存在继承关系:(1)没有先后顺序,(2)直接声明父类异常即可
- 异常捕获处理: 方法内部进行异常处理,捕获到异常后,进行处理,不再抛出
  - try-catch: try-catch 的作用是捕获异常,当 try 中的代码出现异常时,会把异常对象传递给 catch,然后执行 catch 中的代码
  - try-catch-finally: finally 中的代码一定会执行,无论 try 中是否出现异常,一般用于资源释放
  - try-catch-catch: 可以有多个 catch,用于捕获多种类型的异常
  - jdk7.0 新特性: try-catch 的增强写法,可以在 try 后面增加一个 () ,在 () 中定义流对象,那么这个流对象的作用域就在 try 中有效,try 中的代码执行完毕,会自动把流对象释放,不用写 finally
    - `try(定义流对象;定义流对象...){...}catch(异常类名 变量名){...}`
  - 捕获异常时,如果有子父类关系,子类异常必须写在上面,父类异常写在下面,否则会报错,或者只写父类异常

#### 自定义异常类

- 自定义异常类必须继承 Exception 类或者 RuntimeException 类
- 至少提供两个构造方法,一个无参构造方法,一个带有 String 类型参数的构造方法

```java
public class MyException extends Exception {
    public MyException() {
    }

    public MyException(String message) {
        super(message);
    }
}
```

## IO

### File 类

- File 类是文件和目录路径名的抽象表示,主要用于文件和目录的创建、查找和删除等操作
- constructor
  - `public File(String pathname)` : 通过将给定的路径名字符串转换为抽象路径名来创建新的 File 实例
  - `public File(String parent, String child)` : 从父路径名字符串和子路径名字符串创建新的 File 实例
- methods

  - `public String getAbsolutePath()` : 返回此 File 的绝对路径名字符串
  - `public String getPath()` : 将此 File 转换为路径名字符串
  - `public String getName()` : 返回由此 File 表示的文件或目录的名称
  - `public long length()` : 返回由此 File 表示的**文件的大小**,如果是文件夹,返回值为 不确定

  - `public boolean exists()` : 此 File 对象表示的文件或目录是否实际存在
  - `public boolean isDirectory()` : 此 File 对象表示的是否为目录
  - `public boolean isFile()` : 此 File 对象表示的是否为文件

  - `public boolean createNewFile()` : 当且仅当具有该名称的文件尚不存在时,创建一个新的空文件
  - `public boolean delete()` : 删除由此 File 表示的文件或目录
  - `public boolean mkdir()` : 创建由此 File 表示的目录
  - `public boolean mkdirs()` : 创建由此 File 表示的目录,包括任何必需但不存在的父目录
  - `public boolean renameTo(File dest)` : 重命名由此 File 表示的文件或目录,返回是否成功

  - `public String[] list()` : 返回一个字符串数组,命名由此 File 表示的目录中的文件和目录
  - `public File[] listFiles()` : 返回一个抽象路径名数组,表示由该抽象路径名表示的目录中的文件，可以使用`增强 for` 循环遍历

### IO 流

- IO 流是一种顺序读写的操作方式,根据读写数据单位的不同分为字节流和字符流
  - InputStream 字节输入流
  - OutputStream 字节输出流
  - Reader 字符输入流
  - Writer 字符输出流
- 根据操作数据内容不同
  - 文件流：针对文件以字节或字符的方式进行读写操作
    - FileInputStream 文件字节输入流
    - FileOutputStream 文件字节输出流
    - FileReader 文件字符输入流
    - FileWriter 文件字符输出流
  - 缓冲流：缓冲流可以提高 IO 流的读写效率
    - BufferedInputStream 缓冲字节输入流
    - BufferedOutputStream 缓冲字节输出流
    - BufferedReader 缓冲字符输入流
    - BufferedWriter 缓冲字符输出流
  - 转换流：转换流可以实现字节流和字符流之间的转换（字节流 + 字符集）
    - InputStreamReader 字节流转换为字符流
    - OutputStreamWriter 字符流转换为字节流
  - 对象流：对象流可以把对象以流的方式进行读写操作
    - ObjectInputStream 对象输入流
    - ObjectOutputStream 对象输出流
- IO 流是一种资源,使用完毕需要关闭,否则会一直占用资源,直到 JVM 垃圾回收

#### 文件字节输入流

- 针对文件以字节为单位进行输入操作
- constructor
  - `public FileInputStream(File file)` : 创建一个向指定 File 对象表示的文件中写入数据的文件输出流
  - `public FileInputStream(String name)` : 创建一个向具有指定名称的文件中写入数据的输出文件流
- methods
  - `public int read()` : 从该输入流`读取一个字节`的数据,返回值为读取的字节数据,读取到文件末尾返回 -1
  - `public int read(byte[] b)` : 从该输入流读取最多 b.length 个字节的数据到字节数组中,返回值为读取的字节数据个数,读取到文件末尾返回 -1
  - `public void close()` : 关闭此输入流并释放与该流关联的所有系统资源

```java
try (FileInputStream fis = new FileInputStream("a.txt")) {
    int len;
    // while ((len = fis.read()) != -1) {
    //     System.out.println((char) len);
    // }
    byte[] bytes = new byte[1024];// 推荐使用 1024 的整数倍，通常使用8192
    while ((len = fis.read(bytes)) != -1) {
        System.out.println(new String(bytes, 0, len)); // 从 0 开始读取 len 个字节
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 文件字节输出流

- 针对文件以字节为单位进行输出操作
- constructor
  - `public FileOutputStream(File file)` : 创建一个向指定 File 对象表示的文件中写入数据的文件输出流
  - `public FileOutputStream(String name,boolen append)` : 创建一个向具有指定名称的文件中写入数据的输出文件流,append 为 true 表示追加写入
  - `public FileOutputStream(String name)` : 创建一个向具有指定名称的文件中写入数据的输出文件流
  - `public FileOutputStream(File file,boolen append)` : 创建一个向指定 File 对象表示的文件中写入数据的文件输出流,append 为 true 表示追加写入
- methods
  - `public void write(int b)` : 将指定的字节写入此文件输出流,返回值为写入的字节数据
  - `public void write(byte[] b)` : 将 b.length 个字节从指定的字节数组写入此文件输出流,返回值为写入的字节数据个数
  - `public void write(byte[] b,int off,int len)` : 将指定字节数组中从偏移量 off 开始的 len 个字节写入此文件输出流,返回值为写入的字节数据个数
  - `public void close()` : 关闭此输出流并释放与此流有关的所有系统资源

```java
try (FileOutputStream fos = new FileOutputStream("a.txt")) {
    int start = 'a';
    int end = 'z';
    // 将 a-z 写入文件
    while (start <= end) {
        fos.write(start);
        start++;
    }
    // 回车换行
    fos.write("\r\n".getBytes());
    byte[] bytes = "hello".getBytes();
    fos.write(bytes);
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 文件字符输入流

- 针对文件以字符为单位进行输入操作
  - 编码：把字符转换为字节
  - 解码：把字节转换为字符
  - 编码和解码的字符集要一致,否则会出现乱码
- constructor
  - `public FileReader(File file)` : 创建一个新的 FileReader,给定要读取的 File 对象
  - `public FileReader(String fileName)` : 创建一个新的 FileReader,给定要读取的文件的名称
- methods
  - `public int read()` : 读取单个字符,返回值为读取的字符数据,读取到文件末尾返回 -1
  - `public int read(char[] cbuf)` : 将字符读入数组,返回值为读取的字符数据个数,读取到文件末尾返回 -1
  - `public void close()` : 关闭此流并释放与此流有关的所有系统资源

```java
try (FileReader fr = new FileReader("a.txt")) {
    int len;
    // while ((len = fr.read()) != -1) {
    //     System.out.println((char) len);
    // }
    char[] chars = new char[1024];
    while ((len = fr.read(chars)) != -1) {
        System.out.println(new String(chars, 0, len));
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 文件字符输出流

- 针对文件以字符为单位进行输出操作
- constructor
  - `public FileWriter(File file)` : 创建一个新的 FileWriter,给定要读取的 File 对象
  - `public FileWriter(File file,boolen append)` : 创建一个新的 FileWriter,给定要读取的 File 对象,append 为 true 表示追加写入
  - `public FileWriter(String fileName)` : 创建一个新的 FileWriter,给定要读取的文件的名称
  - `public FileWriter(String fileName,boolen append)` : 创建一个新的 FileWriter,给定要读取的文件的名称,append 为 true 表示追加写入
- methods
  - `public void write(int c)` : 写入单个字符
  - `public void write(char[] cbuf)` : 写入字符数组
  - `public void write(char[] cbuf,int off,int len)` : 写入字符数组的某一部分,off 为开始索引,len 为写入字符个数
  - `public void write(String str)` : 写入字符串
  - `public void write(String str,int off,int len)` : 写入字符串的某一部分,off 为开始索引,len 为写入字符个数
  - `public void close()` : 关闭此流并释放与此流有关的所有系统资源
  - `public void flush()` : 刷新该流的缓冲,将缓冲区中的数据写入目的地

```java
try (FileWriter fw = new FileWriter("a.txt")) {
    fw.write(97); // a
    fw.write('b');
    fw.write("\r\n");
    fw.write("hello");
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 文件缓冲流

- 缓冲流可以提高读写效率
- 缓冲流内部有一个缓冲区,默认大小为 8192 字节
- constructor
  - `public BufferedInputStream(InputStream in)` : 创建一个新的缓冲输入流
  - `public BufferedInputStream(InputStream in,int size)` : 创建一个新的缓冲输入流,并指定缓冲区大小
  - `public BufferedOutputStream(OutputStream out)` : 创建一个新的缓冲输出流
  - `public BufferedOutputStream(OutputStream out,int size)` : 创建一个新的缓冲输出流,并指定缓冲区大小

#### 对象序列化流

- 对象序列化流可以将对象以字节的形式写入文件中,也可以将字节反序列化为对象
  - 对象必须实现 Serializable 接口
  - transient 关键字可以阻止对象序列化
- constructor
  - `public ObjectOutputStream(OutputStream out)` : 创建一个写入指定的 OutputStream 的 ObjectOutputStream
  - `public ObjectInputStream(InputStream in)` : 创建从指定 InputStream 读取的 ObjectInputStream
- methods
  - `public final void writeObject(Object obj)` : 将指定的对象写入 ObjectOutputStream
  - `public final Object readObject()` : 从 ObjectInputStream 读取对象

```java
try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("a.txt"))) {
    oos.writeObject(new Person("张三", 18));
} catch (IOException e) {
    e.printStackTrace();
}

try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("a.txt"))) {
    Object o = ois.readObject();
    System.out.println(o);
} catch (IOException | ClassNotFoundException e) {
    e.printStackTrace();
}
```

#### 打印流

- 打印流可以方便地打印各种数据类型的值
- constructor
  - `public PrintStream(File file)` : 创建新的打印流,使用指定的文件作为目的地
  - `public PrintStream(OutputStream out)` : 创建新的打印流,使用指定的输出流作为目的地
  - `public PrintStream(String fileName)` : 创建新的打印流,使用指定的文件路径作为目的地
- methods
  - `public void print(任意类型的值)` : 将任意类型的值转换为字符串输出
  - `public void println(任意类型的值)` : 将任意类型的值转换为字符串输出,并换行
  - `public void println()` : 输出一个空行

```java
try (PrintStream ps = new PrintStream("a.txt")) {
    ps.print(97);
    ps.println(97);
    ps.println();
    ps.println("hello");
} catch (IOException e) {
    e.printStackTrace();
}
```

#### properties 类

- 作用：用于读取配置文件 `.properties` 文件
- constructor
  - `public Properties()` : 创建一个空的属性列表
- methods
  - `public Object setProperty(String key,String value)` : 调用 Hashtable 的方法 put
  - `public String getProperty(String key)` : 通过 key 找到 value 值,此方法相当于 Map 集合中的 get(key) 方法
  - `public Set<String> stringPropertyNames()` : 返回此属性列表中的键集,其中该键及其对应值是字符串,此方法相当于 Map 集合中的 keySet 方法
  - `public void load(InputStream inStream)` : 从输入流中读取属性列表(键和元素对)
  - `public void store(OutputStream out,String comments)` : 将此属性列表(键和元素对)写入此 Properties 表中,以适合使用 load(InputStream) 方法的格式写入输出流

```java
Properties prop = new Properties();
try (FileInputStream fis = new FileInputStream("a.txt")) {
    prop.load(fis);
} catch (IOException e) {
    e.printStackTrace();
}
System.out.println(prop);
```

#### 字节流与字符流的转换

- `InputStreamReader` : 字节输入流转换为字符输入流
- `OutputStreamWriter` : 字节输出流转换为字符输出流

```java
try (InputStreamReader isr = new InputStreamReader(new FileInputStream("a.txt"))) {
    int len;
    char[] chars = new char[1024];
    while ((len = isr.read(chars)) != -1) {
        System.out.println(new String(chars, 0, len));
    }
} catch (IOException e) {
    e.printStackTrace();
}

try (OutputStreamWriter osw = new OutputStreamWriter(new FileOutputStream("b.txt"))) {
    osw.write("hello");
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 线程

并发：多个事件在同一时间段内发生
并行：多个事件在同一时刻发生

进程：在系统中的执行单位,每个应用至少有一个进程，一个进程可以有多个线程，进程由 CPU 核心调度执行
线程：进程中的执行单元,一个进程可以有多个线程,线程由 CPU 核心中线程调度器调度执行

- 创建线程的方式
  - 继承 Thread 类
  - 实现 Runnable 接口
  - 实现 Callable 接口
  - 线程池
- Thread 构造器
  - `public Thread()` : 分配一个新的 Thread 对象
  - `public Thread(String name)` : 分配一个指定名字的新的 Thread 对象
  - `public Thread(Runnable target)` : 分配一个带有指定目标新的 Thread 对象
  - `public Thread(Runnable target,String name)` : 分配一个带有指定目标新的 Thread 对象并指定名字
- 线程的生命周期
  - 新建状态
  - 就绪状态
  - 运行状态
  - 阻塞状态
  - 死亡状态
- 线程的优先级
  - `public final int getPriority()` : 返回此线程的优先级
  - `public final void setPriority(int newPriority)` : 更改此线程的优先级
- 线程的其他方法
  - `public static Thread currentThread()` : 返回对当前正在执行的线程对象的引用
  - `public String getName()` : 返回此线程的名称
  - `public static void sleep(long millis)` : 使当前正在执行的线程以指定的毫秒数暂停(暂时停止执行)
  - `public void start()` : 导致此线程开始执行; Java 虚拟机调用此线程的 run 方法
  - `public void run()` : 如果此线程是使用独立的 Runnable 运行对象构造的,则调用该 Runnable 对象的 run 方法; 否则,此方法不执行任何操作并返回
  - `public static void yield()` : 暂停当前正在执行的线程对象，并执行其他线程
  - `public final void join()` : 等待该线程终止
  - `public final void join(long millis)` : 等待该线程终止的时间最长为 millis 毫秒
  - `public final void join(long millis,int nanos)` : 等待该线程终止的时间最长为 millis 毫秒 + nanos 纳秒
  - `public final void setDaemon(boolean on)` : 将此线程标记为守护线程或用户线程
  - `public final boolean isAlive()` : 测试线程是否处于活动状态

##### 继承 Thread 类

- 继承 Thread 类
- 生成合适的构造器
- 重写 run 方法
- 需要多少条线程就创建多少个线程对象
- 调用 start 方法启动线程(调用 run 方法不会启动线程)

```java
public class MyThread extends Thread {

    public MyThread() { }

    public MyThread(String name) {
        super(name);
    }

    @Override
    public void run() {
        String name = getName();
        for (int i = 0; i < 10; i++) {
            System.out.println(name + " : " + i);
        }
    }
}

public class MyThreadTest {
    public static void main(String[] args) {
        MyThread myThread1 = new MyThread("1号线程");
        MyThread myThread2 = new MyThread("2号线程");
        // myThread1.run();
        // myThread2.run();
        myThread1.start();
        myThread2.start();
    }
}
```

##### 实现 Runnable 接口

- 实现 Runnable 接口
- 重写 run 方法
- 创建 Thread 对象,将 Runnable 接口的实现类对象作为参数传递给 Thread 类的构造器
- 调用 start 方法启动线程(调用 run 方法不会启动线程)

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        String name = Thread.currentThread().getName();
        for (int i = 0; i < 10; i++) {
            System.out.println(name + " : " + i);
        }
    }
}

public class MyRunnableTest {
    public static void main(String[] args) {
        MyRunnable myRunnable = new MyRunnable();
        Thread thread1 = new Thread(myRunnable, "1号线程");
        Thread thread2 = new Thread(myRunnable, "2号线程");
        thread1.start();
        thread2.start();
    }
}
```

##### 线程安全

- 多个线程同时操作同一个对象时,如果不加控制,就会出现线程安全问题
  - 数据不一致
  - 数据丢失
  - 数据计算错误
- 解决线程安全问题的方法
  - 同步代码块
  - 同步方法
  - Lock 锁
- 同步代码块
  - `synchronized(同步监视器){需要同步的代码}`
  - 同步监视器
    - 任何一个类的对象都可以充当同步监视器
    - 多个线程必须要共用同一把锁
    - 在实现 Runnable 接口创建多线程的方式中,可以考虑使用 this 充当同步监视器
    - 在继承 Thread 类创建多线程的方式中,慎用 this 充当同步监视器,考虑使用当前类充当同步监视器
- 同步方法（同步代码块的另一种形式）
  - 如果操作共享数据的代码完整的声明在一个方法中,我们不妨将此方法声明为同步的
    - `public synchronized void method(){...}`
  - 同步方法的同步监视器是 this
- Lock 锁
  - `Lock lock = new ReentrantLock();`
  - `lock.lock();`
  - `lock.unlock();`

```java
// 同步代码块
Runnable runnable = new Runnable(){ // 匿名内部类
  private int ticket = 100;
  private Object object = new Object(); // 同步监视器,可以是任何一个类的对象，多个线程必须要共用同一把锁
  @Override
  public void run() {
      while (true) {
          synchronized (object) {
            if(ticket == 0) break; // 退出循环
            System.out.println(Thread.currentThread().getName() + " : " + ticket);
            ticket--;
          }
      }
  }
};

Thread thread1 = new Thread(window, "1号窗口");
Thread thread2 = new Thread(window, "2号窗口");
Thread thread3 = new Thread(window, "3号窗口");
thread1.start();
thread2.start();
thread3.start();

// 同步方法
class Window implements Runnable {
    private int ticket = 100;
    @Override
    public void run() {
        while (true) {
            show();
        }
    }
    private synchronized void show() { // 同步监视器是 this
        if(ticket == 0) return; // 退出循环
        System.out.println(Thread.currentThread().getName() + " : " + ticket);
        ticket--;
    }
}

// Lock 锁
class Window implements Runnable {
    private int ticket = 100;
    private Lock lock = new ReentrantLock();
    @Override
    public void run() {
        while (true) {
            lock.lock();
            try {
                if(ticket == 0) break; // 退出循环
                System.out.println(Thread.currentThread().getName() + " : " + ticket);
                ticket--;
            } finally {
                lock.unlock();
            }
        }
    }
}
```

##### 线程通信

- 线程通信的应用场景
  - 生产者线程（生产同一资源）和消费者线程（消费同一资源）的应用场景
  - 线程间的通信
- 线程通信的方法
  - `wait()` : 一旦执行此方法,当前线程就进入阻塞状态,并释放同步监视器
  - `notify()` : 一旦执行此方法,就会唤醒被 wait 的一个线程,如果有多个线程被 wait,就唤醒优先级高的那个
  - `notifyAll()` : 一旦执行此方法,就会唤醒所有被 wait 的线程
- 说明
  - wait(),notify(),notifyAll() 三个方法必须使用在同步代码块或同步方法中
  - wait(),notify(),notifyAll() 三个方法的调用者必须是同步代码块或同步方法中的同步监视器
  - wait(),notify(),notifyAll() 三个方法是定义在 java.lang.Object 类中
- 例子

```java
class Clerk {
    private int product = 0;
    public synchronized void produceProduct() {
        if(product < 20) { // 产品不多了，赶紧生产
            product++;
            System.out.println(Thread.currentThread().getName() + " : 开始生产第" + product + "个产品");
            notify(); // 唤醒消费者线程
        } else {
            try {
                wait(); // 等待，不生产
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    public synchronized void consumeProduct() {
        if(product > 0) { // 有产品，快来消费
            System.out.println(Thread.currentThread().getName() + " : 开始消费第" + product + "个产品");
            product--;
            notify();
        } else {
            try {
                wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

class Producer implements Runnable {
    private Clerk clerk;
    public Producer(Clerk clerk) {
        this.clerk = clerk;
    }
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " : 开始生产产品...");
        while (true) {
            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            clerk.produceProduct();
        }
    }
}

class Consumer implements Runnable {
    private Clerk clerk;
    public Consumer(Clerk clerk) {
        this.clerk = clerk;
    }
    @Override
    public void run() {
        System.out.println(Thread.currentThread().getName() + " : 开始消费产品...");
        while (true) {
            try {
                Thread.sleep(20);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            clerk.consumeProduct();
        }
    }
}

public class ProductTest {
    public static void main(String[] args) {
        Clerk clerk = new Clerk(); // 同一资源
        Producer producer = new Producer(clerk);  // 生产者
        Consumer consumer = new Consumer(clerk);  // 消费者
        Thread thread1 = new Thread(producer, "生产者1");
        Thread thread2 = new Thread(consumer, "消费者1");
        Thread thread3 = new Thread(producer, "生产者2");
        Thread thread4 = new Thread(consumer, "消费者2");
        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
    }
}
```

##### 单例模式下的线程安全问题

- 单例模式的线程安全问题
  - 懒汉式:多条线程同时进入 if 语句中,可能会创建多个实例
    - 线程不安全的: 有可能创建多个实例
    - 线程安全的: 效率太低了
    - 解决方案: 同步代码块+双重检查
  - 饿汉式:因为类加载时就创建了实例,所以天生就是线程安全的
    - 线程安全的: 效率较高

```java
// 懒汉式
class Bank {
    private Bank() {}
    private static Bank instance = null;
    public static Bank getInstance() {
        if(instance == null) { //第一层检查，检查是否有引用指向对象，高并发情况下会有多个线程同时进入
            synchronized (Bank.class) { // 同步监视器是 Bank.class
                // 假设没有第二层检查，那么第一个线程创建完对象释放锁后，后面进入对象也会创建对象，会产生多个对象
                if(instance == null) { // 双重检查
                    instance = new Bank();
                }
            }
        }
        return instance;
    }
}

```

