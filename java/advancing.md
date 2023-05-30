# Java 进阶

## 单元测试

### 单元测试的概念

- 单元测试是指对软件中的最小可测试单元进行检查和验证
- 对于单元测试中单元的含义,一般来说,要根据实际情况去判定其具体含义,如 C 语言中单元指一个函数,Java 中单元指一个类
- 步骤：

  - 选择合适的单元测试框架（JUnit）
  - 选择合适的单元测试工具（IDEA）
  - 编写测试用例
  - 执行测试用例
  - 检查结果

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

### 类实例的字段

- `public Field[] getFields()`:获取当前运行时类及其父类中声明为 public 访问权限的属性
- `public Field[] getDeclaredFields()`:获取当前运行时类中声明的所有属性(不包含父类中声明的属性)
- `public Field getField(String name)`:获取运行时类中指定变量名的 public 访问权限的属性

#### Field 类

- `public int getModifiers()`:获取属性的修饰符
- `public class getType()`:获取属性的类型
- `public String getName()`:获取属性的名字
- `public static String Modifier.toString(int modifiers)`:获取修饰符
- `public Object get(Object obj)`:获取指定对象的属性值
- `public void set(Object obj, Object value)`:设置指定对象的属性值为 value
- `public void setAccessible(boolean flag)`:设置当前属性是否可访问(暴力反射)

```java
Class<Person> clazz = Person.class;
Person person = clazz.newInstance();
Field name = clazz.getDeclaredField("name");
name.set(person, "张三"); // 设置属性值
System.out.println(name.get(person));// 获取属性值
```

### 类实例的方法

- `public Method[] getMethods()`:获取当前运行时类及其父类中声明为 public 访问权限的方法
- `public Method[] getDeclaredMethods()`:获取当前运行时类中声明的所有方法(不包含父类中声明的方法)
- `public Method getMethod(String name, Class<?>... parameterTypes)`:获取运行时类中指定方法名和参数列表的 public 访问权限的方法

#### Method 类

- `public int getModifiers()`:获取方法的修饰符
- `public Class<?> getReturnType()`:获取方法的返回值类型
- `public String getName()`:获取方法的名字
- `public Class<?>[] getParameterTypes()`:获取方法的参数列表
- `public Class<?>[] getExceptionTypes()`:获取方法的异常类型
- `public Object invoke(Object obj, Object... args)`:调用方法的 invoke 方法
- `public void setAccessible(boolean flag)`:设置当前方法是否可访问(暴力反射)

```java
Class<Person> clazz = Person.class;
Person person = clazz.newInstance();
Method method = clazz.getDeclaredMethod("setName", String.class);
method.invoke(person, "张三");// 调用方法
```

### 类实例的构造器

- `public Constructor<?>[] getConstructors()`:获取当前运行时类中声明为 public 访问权限的构造器
- `public Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes)`:获取当前运行时类中指定参数列表的构造器
- `public Constructor<T> getConstructor(Class<?>... parameterTypes)`:获取当前运行时类中指定参数列表的构造器

#### Constructor 类

- `public int getModifiers()`:获取构造器的修饰符
- `public String getName()`:获取构造器的名字
- `public Class<?>[] getParameterTypes()`:获取构造器的参数列表
- `public T newInstance(Object... initargs)`:调用构造器的 newInstance 方法

```java
Class<Person> clazz = Person.class;
Constructor<Person> constructor = clazz.getDeclaredConstructor(String.class, int.class);
constructor.setAccessible(true);
Person person = constructor.newInstance("张三", 18);
System.out.println(person);
```

### 类实例的父类

- `public Class<? super T> getSuperclass()`:获取当前运行时类的父类
- `public Type getGenericSuperclass()`:获取当前运行时类的带泛型的父类

```java
// 获取运行时类的带泛型的父类的泛型参数
Class clazz = Person.class;
Type type = clazz.getGenericSuperclass();//获取运行时类的带泛型的父类
ParameterizedType paramType = (ParameterizedType) type; //强转
Type[] args = paramType.getActualTypeArguments(); //获取泛型参数

Class Arg = (Class) args[0]; //强转
System.out.println(Arg.getName()); // 获取第一个泛型参数的类型
```

### 类实例的内部类

- `public Class<?>[] getClasses()`:获取当前运行时类中声明为 public 访问权限的内部类
- `public Class<?>[] getDeclaredClasses()`:获取当前运行时类中声明的所有内部类

### 类实例的接口

- `public Class<?>[] getInterfaces()`:获取当前运行时类实现的接口
- `public Type[] getGenericInterfaces()`:获取当前运行时类实现的带泛型的接口

### 类实例的包

- `public Package getPackage()`:获取当前运行时类的包
- `public Package[] getPackages()`:获取当前运行时类的所有包

### ClassLoader 类加载器

- 类加载器的作用:将 class 文件字节码内容加载到内存中,并将这些静态数据转换成方法区中的运行时数据结构,然后在堆中生成一个代表这个类的 java.lang.Class 对象,作为方法区中类数据的访问入口
- 引导类加载器(Bootstrap ClassLoader):负责加载 java 的核心类库,是用原生代码(C++)来实现的,并不继承自 java.lang.ClassLoader
- 扩展类加载器(Extension ClassLoader):负责加载 java 的扩展类库,java 虚拟机的实现会提供一个扩展库目录,该类加载器在此目录里面查找并加载 java 类
- 系统类加载器(System ClassLoader):负责加载应用程序的类,如果应用程序中没有自定义过自己的类加载器,一般情况下这个就是程序中`默认的类加载器`
- 通过 getParenet()方法可以获取扩展类加载器,通过 getParent().getParent()方法可以获取引导类加载器,因为引导类加载器主要负责加载 java 的核心类库,而核心类库是无法被 java 程序直接引用的,所以获取到的引导类加载器为空
- 自定义类加载器:java.lang.ClassLoader 的子类,用户可以定制类的加载方式

#### 使用类加载器加载 properties

- 先将 properties 文件放入到 resources 目录下
- 使用 ClassLoader 类加载器加载 properties 文件

```java
public void loadProperties(){
    try {
        // 1.获取类加载器
        ClassLoader classLoader = this.getClass().getClassLoader();
        // 2.获取文件流
        InputStream inputStream = classLoader.getResourceAsStream("jdbc.properties");
        // 3.创建Properties对象
        Properties properties = new Properties();
        // 4.加载文件流
        properties.load(inputStream);
        // 5.获取文件中的数据
        String name = properties.getProperty("name");
        String password = properties.getProperty("password");
        System.out.println("name = " + name + ", password = " + password);
    } catch (IOException e) {
        e.printStackTrace();
    }
}
```
