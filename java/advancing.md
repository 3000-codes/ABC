# Java 进阶

## 反射

动态语言:在运行时可以改变程序结构的语言

java 程序的两种状态:

- 编译时:javac.exe 编译器将.java 文件编译成.class 文件(字节码文件)
- 运行时:jvm 将.class 文件加载到内存,并对其进行解释执行

正常方式:引入"package.class"文件->"new"创建对象
反射方式:实例对象->getClass()方法->获取完整的"package.class"文件

主要 API:

- java.lang.Class:代表一个类
- java.lang.reflect.Method:代表类的方法
- java.lang.reflect.Field:代表类的成员变量
- java.lang.reflect.Constructor:代表类的构造器

### 反射机制

- 在运行时,对于任意一个类,都能够知道这个类的所有属性和方法;
- 对于任意一个对象,都能够调用它的任意一个方法和属性;这种动态获取信息以及动态调用对象的方法的功能称为 java 语言的反射机制
- 反射机制提供的功能:

  - 在运行时刻判断任意一个对象所属的类
  - 在运行时刻构造任意一个类的对象
  - 在运行时刻判断任意一个类所具有的成员变量和方法
  - 在运行时刻调用任意一个对象的方法

```java
public class Test {
    public <T> T get() {
        return 反射机制
    }
}

```

### 反射的原理

- 运行时刻加载到内存(元空间),一个类,就会产生一个`Class`对象
- 当一个类被加载,类的整个结构都会被封装在`Class`对象中
- 这个`Class`对象就像一面镜子,通过这面镜子可以看到对应类的全部信息

### 获取 Class 实例的四种方式

- 方式一:通过运行时类的 class 属性获取:`Class clazz = Person.class`
- 方式二:通过运行时类的对象获取:`Class clazz = person.getClass()`
- 方式三:通过 Class 的静态方法获取:`Class clazz = Class.forName("com.advancing.java.Person")`
- 方式四:通过类的加载器:`ClassLoader classLoader = this.getClass().getClassLoader();Class clazz = classLoader.loadClass("com.advancing.java.Person")`

### ClassLoader 类加载器

- 类加载器的作用:将 class 文件字节码内容加载到内存中,并将这些静态数据转换成方法区中的运行时数据结构,然后在堆中生成一个代表这个类的 java.lang.Class 对象,作为方法区中类数据的访问入口
- 引导类加载器(Bootstrap ClassLoader):负责加载 java 的核心类库,是用原生代码(C++)来实现的,并不继承自 java.lang.ClassLoader
- 扩展类加载器(Extension ClassLoader):负责加载 java 的扩展类库,java 虚拟机的实现会提供一个扩展库目录,该类加载器在此目录里面查找并加载 java 类
- 系统类加载器(System ClassLoader):负责加载应用程序的类,如果应用程序中没有自定义过自己的类加载器,一般情况下这个就是程序中`默认的类加载器`
- 通过 getParenet()方法可以获取扩展类加载器,通过 getParent().getParent()方法可以获取引导类加载器,因为引导类加载器主要负责加载 java 的核心类库,而核心类库是无法被 java 程序直接引用的,所以获取到的引导类加载器为空
- 自定义类加载器:java.lang.ClassLoader 的子类,用户可以定制类的加载方式
