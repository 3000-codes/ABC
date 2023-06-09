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

### Stream API

Stream 是 Java 8 中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找、过滤和映射数据等操作.

使用 Stream API 对集合数据进行操作，就类似于使用 SQL 执行的数据库查询，也可以使用 Stream API 来并行执行操作.

简而言之，Stream API 提供了一种高效且易于使用的处理数据的方式

#### Stream 的三个操作步骤

1. 创建 Stream
2. 中间操作
   - `filter(Predicate p)`：过滤
   - `limit(long maxSize)`：截断流，使其元素不超过给定数量
   - `skip(long n)`：跳过元素，返回一个扔掉了前 n 个元素的流
   - `distinct()`：筛选，通过流所生成元素的 hashCode() 和 equals() 去除重复元素
   - `map(Function f)`：映射，接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素
   - `flatMap(Function f)`：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流
   - `sorted()`：自然排序
   - `sorted(Comparator comp)`：定制排序
3. 终止操作（终端操作）:只有当终止操作执行时，所有的中间操作才会执行，称为“惰性求值”
   - `allMatch(Predicate p)`：检查是否匹配所有元素
   - `anyMatch(Predicate p)`：检查是否至少匹配一个元素
   - `noneMatch(Predicate p)`：检查是否没有匹配的元素
   - `findFirst()`：返回第一个元素
   - `findAny()`：返回当前流中的任意元素
   - `count()`：返回流中元素的总个数
   - `max(Comparator c)`：返回流中最大值
   - `min(Comparator c)`：返回流中最小值
   - `reduce(T identity, BinaryOperator b)`：可以将流中元素反复结合起来，得到一个值，返回 T
   - `reduce(BinaryOperator b)`：可以将流中元素反复结合起来，得到一个值，返回 Optional<T>
   - `collect(Collector c)`：将流转换为其他形式，接收一个 Collector 接口的实现，用于给 Stream 中元素做汇总的方法
   - `forEach(Consumer c)`：内部迭代

```java
// 创建 Stream
// 方式一：通过集合
List<String> list = new ArrayList<>();
Stream<String> stream = list.stream();
// 方式二：通过数组
Integer[] nums = new Integer[10];
Stream<Integer> stream1 = Arrays.stream(nums);
// 方式三：通过 Stream 的 of()
Stream<Employee> stream2 = Stream.of(1, 2, 3, 4, 5);
// 方式四：创建无限流
// 迭代
Stream<Integer> stream3 = Stream.iterate(0, (x) -> x + 2);
// 调用
stream3.limit(10).forEach(System.out::println);
// 生成
Stream.generate(() -> Math.random()).limit(5).forEach(System.out::println);
```

#### 并行流与串行流

- 并行流：多个线程操作同一个流，效率高
- 串行流：一个线程操作一个流，效率低

```java
// 并行流
List<String> list = new ArrayList<>();
Stream<String> stream = list.parallelStream();
// 串行流
List<String> list = new ArrayList<>();
Stream<String> stream = list.stream();
```

#### Optional 类

- 为了在程序中避免出现空指针异常而创建的
- 常用方法
  - `ofNullable(T t)`：创建一个 Optional 实例，t 可以为 null
  - `empty()`：创建一个空的 Optional 实例
  - `orElse(T t)`：如果调用对象包含值，返回该值，否则返回 t
  - `orElseGet(Supplier s)`：如果调用对象包含值，返回该值，否则返回 s 获取的值
  - `map(Function f)`：如果有值对其处理，并返回处理后的 Optional，否则返回 Optional.empty()
  - `flatMap(Function mapper)`：与 map 类似，要求返回值必须是 Optional

```java
// 创建 Optional 实例
Optional<Employee> op = Optional.of(new Employee());
// 创建空的 Optional 实例
Optional<Object> op1 = Optional.empty();
// 创建 Optional 实例，t 可以为 null
Optional<Employee> op2 = Optional.ofNullable(null);
// 判断是否有值
op.isPresent();
// 如果调用对象包含值，返回该值，否则返回 t
op.orElse(new Employee());
// 如果调用对象包含值，返回该值，否则返回 s 获取的值
op.orElseGet(() -> new Employee());
// 如果有值对其处理，并返回处理后的 Optional，否则返回 Optional.empty()
Optional<String> op3 = op.map((e) -> e.getName());
// 与 map 类似，要求返回值必须是 Optional
Optional<String> op4 = op.flatMap((e) -> Optional.of(e.getName()));
```

### 注解

- JDK 5.0 新增的功能
- 说明程序的一些配置信息，可以在编译、类加载、运行时被读取，并执行相应的处理
- 使用注解：注解使用 @注解名 关键字定义
  - 内置注解
    - `@Override`：限定重写父类方法，该注解只能用于方法
    - `@Deprecated`：用于表示所修饰的元素（类、方法等）已过时
    - `@SuppressWarnings`：抑制编译器警告
  - 元注解：用于修饰其他注解的注解
    - `@Retention`：指定所修饰的 Annotation 的生命周期：`SOURCE`、`CLASS`（默认行为）、`RUNTIME`
    - `@Target`：用于指定被修饰的 Annotation 能用于修饰哪些程序元素
    - `@Documented`：表示所修饰的注解在被 javadoc 解析时，保留下来
    - `@Inherited`：被它修饰的 Annotation 将具有继承性
  - 自定义注解：参照 `@SuppressWarnings` 定义
    - `public @interface 注解名 {定义体}`
    - 注解的成员变量在 Annotation 定义中以无参无异常方式声明
    - 可以用 default 为成员变量指定一个默认值（强烈推荐）
    - 如果只有一个成员变量，一般命名为 value
    - 注解元素必须要有值，我们定义注解元素时，经常使用空字符串、0 作为默认值

```java
// 自定义注解
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE}) // 能够修饰的范围:类、属性、方法、参数、构造器、局部变量
@Retention(RetentionPolicy.RUNTIME) // 生命周期:SOURCE、CLASS（默认行为）、RUNTIME
@Documented // 元注解:表示所修饰的注解在被 javadoc 解析时，保留下来
public @interface MyAnnotation {
    String value() default "hello";
}

// 利用反射获取注解信息
Class clazz = Person.class;
Annotation[] annotations = clazz.getAnnotations();// 获取运行时注解
for (Annotation annotation : annotations) {
    MyAnnotation myAnnotation = (MyAnnotation) annotation;
    System.out.println(myAnnotation.value());
}

// JDK 8 中注解的新特性：可重复注解、类型注解
// 可重复注解:在 MyAnnotation 上声明 @Repeatable，成员值为 MyAnnotations.class
@Repeatable(MyAnnotations.class)
public @interface MyAnnotation {
    String value() default "hello";
}

```

## JDBC

- Java Database Connectivity，Java 数据库连接，用于执行 SQL 语句
- 数据持久化：将程序中的数据保存到数据库中
- JDBC API：Java 提供的用于操作数据库的一套 API
  - 面向应用的 API：java api，抽象接口，提供给开发者使用（连接数据库、执行 SQL 语句、处理结果集）
  - 面向数据库的 API：jdbc driver，具体实现，由数据库厂商提供（mysql、oracle、sqlserver）

### java driver

- 4 种类型
  - JDBC-ODBC 桥接器：将 JDBC 转换为 ODBC，需要安装 ODBC 驱动
  - 原生 API 驱动：直接连接数据库，需要安装数据库驱动
  - 网络协议驱动：通过网络协议连接数据库，需要安装数据库驱动
  - 纯 Java 驱动：直接连接数据库，不需要安装数据库驱动
- 常用的数据库驱动
  - mysql：com.mysql.jdbc.Driver
  - oracle：oracle.jdbc.driver.OracleDriver
  - sqlserver：com.microsoft.sqlserver.jdbc.SQLServerDriver

#### 连接数据库

1. 安装数据库驱动
2. 加载驱动类（lib 目录下的 jar 包->Add As Library）
3. 获取连接

```java
String driveClassName = "com.mysql.cj.jdbc.Driver";
Class<?> clazz = Class.forName(driveClassName);
Driver driver = (Driver) clazz.newInstance();
String url = "jdbc:mysql://127.0.0.1:3306/databasename?serverTimezone=UTC";
Properties auth = new Properties();
auth.setProperty("user", "username");
auth.setProperty("password", "password");
Connection conn = driver.connect(url, auth);
```

#### DriverManager

- 用于管理一组 JDBC 驱动程序的基本服务

手动注册驱动

```java
String driveClassName = "com.mysql.cj.jdbc.Driver";
Class<?> clazz = Class.forName(driveClassName);
Driver driver = (Driver) clazz.newInstance();

// 注册驱动
DriverManager.registerDriver(driver);
String url = "jdbc:mysql://127.0.0.1:3306/myemployees?serverTimezone=UTC";
String user = "root";
String password = "123456";
Connection conn = DriverManager.getConnection(url, user, password);
System.out.println("conn = " + conn);
```

自动注册驱动

```java
String driveClassName = "com.mysql.cj.jdbc.Driver";
String url = "jdbc:mysql://127.0.0.1:3306/myemployees?serverTimezone=UTC";
String user = "root";
String password = "123456";
// 自动加载驱动
Class.forName(driveClassName); // 会执行静态代码块，自动注册驱动
Connection conn = DriverManager.getConnection(url, user, password);
System.out.println("conn = " + conn);
```

将数据库连接信息写入配置文件

```java
Properties jdbcProp = new Properties();
jdbcProp.load(DriverTest.class.getClassLoader().getResourceAsStream("jdbc.properties"));
// jdbcProp.load(new FileInputStream("src//jdbc.properties"));
String driverClassName = jdbcProp.getProperty("driverClassName");
String url = jdbcProp.getProperty("url");
String user = jdbcProp.getProperty("user");
String password = jdbcProp.getProperty("password");
// 自动加载驱动
Class.forName(driverClassName); // 会执行静态代码块，自动注册驱动
Connection conn = DriverManager.getConnection(url, user, password);
System.out.println("conn = " + conn);
```

#### Connection

- 用于管理与数据库的连接

#### ORM

- Object Relational Mapping，对象关系映射，将对象与数据库表建立映射关系
- ORM 框架：Hibernate、MyBatis、Spring Data JPA

#### 查询方法的封装

- 返回值类型：利用泛型，返回不同类型的对象
- 返回值的对象：利用反射，将查询结果封装为对象
- 结果集：
  - ResultSetMetaData：获取结果集的元数据
    - getColumnCount()：获取结果集的列数
    - getColumnName(int column)：获取指定列的列名
    - getColumnLabel(int column)：获取指定列的别名

```java
// 查询方法的封装
public <T> T[] query(Class<T> clazz, String sql, Object... args) {
  Connection conn = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    // 获取连接
    conn = Utils.connect2SQL();
    // 预编译 SQL 语句
    ps = conn.prepareStatement(sql);
    // 设置参数
    for (int i = 0; i < args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }
    // 执行查询
    rs = ps.executeQuery();
    // 获取结果集的元数据
    ResultSetMetaData rsmd = rs.getMetaData();
    // 获取结果集的列数
    int columnCount = rsmd.getColumnCount();
    // 创建集合对象
    ArrayList<T> list = new ArrayList<>();
    // 处理结果集
    while (rs.next()) {
      // 获取一条记录的各个字段值
      // 创建 Map 集合
      Map<String, Object> map = new HashMap<>();
      // 处理结果集一行数据中的每一个字段
      for (int i = 0; i < columnCount; i++) {
        // 获取列值
        Object columnValue = rs.getObject(i + 1);
        // 获取列名:有别名则获取别名，没有则获取列名，必须保证 SQL 语句中的列名与实体类的属性名一致
        String columnLabel = rsmd.getColumnLabel(i + 1);
        // 把列名和列值放入 Map 集合中
        map.put(columnLabel, columnValue);
      }
      // 创建 Class 对应的对象
      T t = clazz.newInstance();
      // 遍历 Map 集合，给对象的属性赋值
      for (Map.Entry<String, Object> entry : map.entrySet()) {
        // 获取属性名
        String propertyName = entry.getKey();
        // 获取属性值
        Object propertyValue = entry.getValue();
        // 获取属性对应的 Field 对象
        Field field = clazz.getDeclaredField(propertyName);
        // 设置属性的访问权限
        field.setAccessible(true);
        // 给对象的属性赋值
        field.set(t, propertyValue);
      }
      // 把赋值后的对象添加到集合中
      list.add(t);
    }
    // 返回集合
    return (T[]) list.toArray();
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 关闭资源
    Utils.closeConnection(conn, ps, rs);
  }
  return null;
}
```

#### 批量处理

连接数据库的参数加上`rewriteBatchedStatements=true`

```java
// 批量处理
public void batch(String sql, Object[]... args) {
  Connection conn = null;
  PreparedStatement ps = null;
  try {
    // 获取连接
    conn = Utils.connect2SQL();
    // 预编译 SQL 语句
    ps = conn.prepareStatement(sql);
    // 设置参数
    for (int i = 0; i < args.length; i++) {
      for (int j = 0; j < args[i].length; j++) {
        ps.setObject(j + 1, args[i][j]);
      }

      // TODO: 增加条数判断
      ps.addBatch();// 积攒 SQL
      // 执行 SQL
      ps.executeBatch();
      // 清空 SQL
      ps.clearBatch();
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 关闭资源
    Utils.closeConnection(conn, ps);
  }
}
```

### 数据库连接池

传统模式：

- 在主程序（serlet，beans）中创建连接对象
- 进行 sql 操作
- 关闭连接对象
- 问题：频繁创建和销毁连接对象，影响性能

连接池模式：

- 为数据库连接创建一个“缓冲池”，预先创建一定数量的连接对象，放入缓冲池中
- 允许用户从缓冲池中获取连接对象，使用完毕后，将连接对象放回缓冲池中
- 优点：减少创建和销毁连接对象的次数，提高性能

#### DataSource

- 数据源(`javax.sql.DataSource`)：数据库连接池接口
- 常用实现类：DBCP、C3P0、Druid（阿里巴巴）
- 包含 连接池 和 连接池管理器
- 取代 DriverManager 来获取 Connection 对象，获取速度快

##### 处理事务

- 事务：一组逻辑操作单元，使数据从一种状态变换到另一种状态
- 事务处理：保证所有事务都作为一个工作单元来执行，即使出现了故障，都不能改变这种执行方式
- 事务处理的特性（ACID）：原子性、一致性、隔离性、持久性
  - 原子性：事务是一个原子操作单元，其对数据的修改，要么全都执行，要么全都不执行
  - 一致性：事务执行前后，数据保持一致
  - 隔离性：事务的执行不会影响其他事务
  - 持久性：事务完成后，事务对数据库的修改是永久的
- 事务的并发问题：脏读、不可重复读、幻读
  - 脏读：一个事务读取到另一个事务未提交的数据
  - 不可重复读：一个事务读取到另一个事务已提交的 update 数据
  - 幻读：一个事务读取到另一个事务已提交的 insert 数据
- 事务的隔离级别：未提交读、已提交读、可重复读、串行化
  - 未提交读：一个事务可以读取到另一个事务未提交的数据，可能出现脏读、不可重复读、幻读
  - 已提交读：一个事务只能读取到另一个事务已提交的数据，可能出现不可重复读、幻读
  - 可重复读：一个事务只能读取到另一个事务已提交的数据，不可重复读、幻读
  - 串行化：一个事务只能读取到另一个事务已提交的数据，不可重复读、幻读
- 事务的隔离级别设置：`conn.setTransactionIsolation(int level);`
  - 未提交读：`conn.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);`
  - 已提交读：`conn.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);`
  - 可重复读：`conn.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);`
  - 串行化：`conn.setTransactionIsolation(Connection.TRANSACTION_SERIALIZABLE);`
- 事务的管理：`conn.setAutoCommit(boolean autoCommit);`
  - 开启事务：`conn.setAutoCommit(false);`
  - 提交事务：`conn.commit();`
  - 回滚事务：`conn.rollback();`
- 操作步骤
  - 关闭连接的自动提交`conn.setAutoCommit(false);`,关闭自动提交后，需要手动提交事务`conn.commit();`
  - 执行 SQL 语句
  - 提交事务`conn.commit();`
  - 捕获异常，回滚事务`conn.rollback();`

### DBUtils

- Apache 组织提供的一个开源 JDBC 工具类库，封装了 JDBC 操作的很多细节，简化了数据库编程的开发量
- 优点：简化 JDBC 编程，简化 CRUD 操作，提高开发效率
- 缺点：不支持事务处理

#### QueryRunner

```java
// 查询单个对象
String sql = "select * from user where id = ?";
Customer customer = queryRunner.query(sql, new BeanHandler<>(Customer.class), 1);
System.out.println(customer);

// 查询多个对象并存入 List 集合
String sql = "select * from user";
List<Customer> list = queryRunner.query(sql, new BeanListHandler<>(Customer.class));
System.out.println(list);

// 查询多个对象并存入Map集合
String sql = "select * from user";
List<Map<String, Object>> list = queryRunner.query(sql, new MapListHandler());
for (Map<String, Object> map : list) {
  Set<Map.Entry<String, Object>> entries = map.entrySet();
  for (Map.Entry<String, Object> entry : entries) {
    System.out.println(entry.getKey() + " = " + entry.getValue());
  }
}

// 查询单个值
String sql = "select count(*) from user";
Long count = queryRunner.query(sql, new ScalarHandler<>());

// 执行 insert、update、delete
String sql = "insert into user values(null, ?, ?, ?)";
int update = queryRunner.update(sql, "张三", "123456", "");

```

## Tomcat

### Tomcat 介绍

- Tomcat 是一个 Web 轻量级应用服务器，是 Apache 软件基金会（Apache Software Foundation）的一个核心项目
- 启动方式：
  - 双击`bin`目录下的`startup.bat`文件，要求 JDK 环境变量配置正确
  - IDEA 中配置 Tomcat，启动方式：点击`Run`菜单中的`Edit Configurations`，点击`+`号，选择`Tomcat Server`，选择`Local`，选择`Tomcat`安装目录，点击`OK`，点击`Run`菜单中的`Run`，启动 Tomcat
- Tomcat 目录结构
  - `bin`：存放 Tomcat 的可执行文件
  - `conf`：存放 Tomcat 的配置文件
  - `lib`：存放 Tomcat 的 jar 包
  - `logs`：存放 Tomcat 的日志文件
  - `temp`：存放 Tomcat 的临时文件
  - `webapps`：存放 web 项目
  - `work`：存放 Tomcat 的工作文件
- Tomcat 的端口号
  - 8005：关闭 Tomcat 时，接收关闭命令的端口号
  - 8080：Tomcat 的启动端口号
  - 8009：Tomcat 与 Apache 之间的端口号
- Tomcat 的配置文件
  - `server.xml`：Tomcat 的主配置文件
  - `web.xml`：web 项目的配置文件

#### Tomcat 部署

- 前端页面的部署
  - 将前端页面放入`webapps`目录下
  - 访问方式：`http://localhost:8080/项目名/文件名`
  - 更改默认访问页面：在`webapps`目录下的`WEB-INF`目录下的`web.xml`文件中，修改`welcome-file-list`标签中的`welcome-file`标签的值

#### IDEA 配置 Tomcat

社区版 IDEA 不支持 Tomcat

- 方式一:`file`->`Setting`->`Build,Execution,Deployment`->`Application Servers`->`+`->`Tomcat Server`->`Local`->`Tomcat`安装目录->`OK`
- 方式二：`Run`菜单中的`Edit Configurations`->`+`->`Tomcat Server`->`Local`->`Tomcat`安装目录->`OK`

## Servlet

小服务程序，运行在服务器端的程序，用来处理客户端的请求

- 导入 jar 包：`servlet-api.jar`
  - 需要位于`WEB-INF`目录下,
- 实现业务的 servlet 接口
- 配置 web.xml 文件
- index.html

```xml
<!-- 上下文参数(全局可使用) -->
<context-param>
  <!-- 参数名称 -->
  <param-name>context-name</param-name>
  <!-- 参数值 -->
  <param-value>context-value</param-value>
</context-param>
<servlet>
  <!--  servlet 的名称 -->
  <servlet-name>hello</servlet-name>
  <!--  servlet 的全类名 -->
  <servlet-class>com.demo.servlet.Hello</servlet-class>
    <!-- 初始化参数
    多个的话使用多个init-param包裹
   -->
  <init-param>
    <!-- 参数名称 -->
    <param-name>username</param-name>
    <!-- 参数值 -->
    <param-value>root</param-value>
  </init-param>
  <!-- servlet 的启动顺序，可以通过该数字来控制多个servlet启动顺序，默认值为 0，数字越小，启动越早-->
  <load-on-startup>1</load-on-startup>
</servlet>
<!--  servlet 的映射 -->
<servlet-mapping>
  <!--  servlet 的名称 -->
  <servlet-name>hello</servlet-name>
  <!--  servlet 的访问路径 : /项目名/访问路径 -->
  <url-pattern>/hello</url-pattern>
</servlet-mapping>
```

### Servlet 的生命周期

- Servlet 的生命周期：从 Servlet 被创建到 Servlet 被销毁的过程
- Servlet 的生命周期方法
  - `构造方法`：Servlet 被创建时执行，只执行一次
  - `init()`：初始化方法，Servlet 被创建时执行，只执行一次
  - `service()`：每次请求时执行
  - `destroy()`：关闭服务器时执行，只执行一次
- ServletConfig 对象
  - ServletConfig 对象是 Servlet 的配置对象，Tomcat 创建 Servlet 时，会自动创建 ServletConfig 对象
  - ServletConfig 对象的作用
    - 获取 Servlet 的名称
    - 获取 Servlet 的初始化参数:`servletConfig.getInitParameter("param-name")`
    - 获取 ServletContext 对象
  - ServletConfig 对象的获取方式
    - 通过 Servlet 的 init 方法获取
    - 通过 ServletConfigEvent 对象获取

### ServletContext

- Servlet 的上下文对象，Tomcat 创建 Servlet 时，会自动创建 ServletContext 对象,代表当前 web 应用
- 一个 web 应用可以有多个 Servlet，但只有一个 ServletContext 对象
- ServletContext 对象的作用
  - 获取 web.xml 中配置的上下文参数:`servletContext.getInitParameter("param-name")`
  - 获取当前 web 应用的路径:`servletContext.getContextPath()`
  - 获取当前 web 应用的真实路径:`servletContext.getRealPath("/文件名")`
  - 获取当前 web 应用的 MIME 类型:`servletContext.getMimeType("文件名")`
  - 域对象：共享数据
    - `setAttribute(String name, Object value)`：存储数据
    - `getAttribute(String name)`：获取数据
    - `removeAttribute(String name)`：删除数据
- ServletContext 对象的获取方式
  - 通过 Servlet 的 init 方法获取
  - 通过 ServletContextEvent 对象获取

### GenericServlet

- Servlet 接口的抽象实现类，实现了 Servlet 接口的除了 service 方法之外的其他方法
- 只需要重写 service 方法即可
- 关注 Servlet 的业务逻辑，不需要关注 Servlet 的生命周期方法

### HttpServlet

- GenericServlet 的子类
- 重写了 service 方法
- 控制用户的具体请求方式
  - `doGet()`：处理 get 请求
  - `doPost()`：处理 post 请求
  - `doPut()`：处理 put 请求
  - `doDelete()`：处理 delete 请求
  - `doHead()`：处理 head 请求
  - `doOptions()`：处理 options 请求
  - `doTrace()`：处理 trace 请求

### HttpServletRequest

- ServletRequest 的子接口
- 服务器接收到的请求报文解析后的对象
- 在 service 方法中，会自动创建 HttpServletRequest 对象
- 可以获取请求方式、请求参数、请求头、请求地址等信息

  - `getMethod()`：获取请求方式
  - `getParameter(String name)`：获取请求参数
  - `getParameterValues(String name)`：获取请求参数，参数的多个值
  - `getParameterMap()`：获取所有请求参数

  - `getScheme()`：获取协议名称
  - `getServerName()`：获取服务器名称
  - `getServerPort()`：获取服务器端口号
  - `getContextPath()`：获取项目路径

  - `getHeader(String name)`：获取请求头
  - `getHeaderNames()`：获取所有请求头的名称
  - `getInputStream()`：获取请求体的字节输入流
  - `getReader()`：获取请求体的字符输入流
  - `getRequestURL()`：获取请求的完整路径
  - `getRequestURI()`：获取请求的资源路径
  - `getQueryString()`：获取请求的参数部分
  - `getRemoteAddr()`：获取客户端的 ip 地址

- 请求转发(可以是页面资源,也可以是 Servlet 资源)
  - 服务器内部的资源跳转方式
  - 浏览器地址栏不发生变化
  - 只能转发到当前服务器内部资源中
  - `request.getRequestDispatcher("/路径").forward(request, response)`
    - `request.getRequestDispatcher("/pageB.html").forward(request, response)` : 转发到页面资源
    - `request.getRequestDispatcher("/servletB").forward(request, response)`: 转发到 Servlet 资源,可以触发 Servlet 的生命周期方法
- Request 域共享数据(必须保证转发前后是同一个 request 对象)
  - `request.setAttribute(String name, Object value)`：存储数据
  - `request.getAttribute(String name)`：获取数据
  - `request.removeAttribute(String name)`：删除数据

### HttpServletResponse

- ServletResponse 的子接口
- 服务器将要响应给客户端的响应报文解析后的对象
- 在 service 方法中，会自动创建 HttpServletResponse 对象
- 可以设置响应状态码、响应头、响应体等信息
  - `setStatus(int sc)`：设置响应状态码
  - `setHeader(String name, String value)`：设置响应头
  - `setContentType(String type)`：设置响应体的 MIME 类型
  - `getOutputStream()`：获取字节输出流
  - `getWriter()`：获取字符输出流
    - `response.getWriter().write("hello")` :发送响应体给客户端
  - `sendRedirect(String location)`：重定向(302)
    - 服务器将客户端重定向到新的资源
    - 浏览器地址栏发生变化
    - 重定向可以访问任意资源
    - `response.sendRedirect("/路径")`
  - `sendError(int sc, String msg)`：设置响应状态码和响应体
    - `response.sendError(404, "页面不存在")`

### 乱码问题

- 请求乱码
  - GET 请求
    - Tomcat 8 之前默认使用 ISO-8859-1 编码，Tomcat 8 之后默认使用 UTF-8 编码
    - 修改 Tomcat 的配置文件 server.xml
      - `<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" URIEncoding="UTF-8"/>`
  - POST 请求:
    - 提交表单或文件时,如果统一使用 UTF-8 编码,则需要在获取请求参数之前设置编码格式
    - `request.setCharacterEncoding("UTF-8")`
- 响应乱码
  - 设置响应体的 MIME 类型
    - `response.setContentType("text/html;charset=UTF-8")`
  - 设置响应头
    - `response.setHeader("Content-Type", "text/html;charset=UTF-8")`

### 域数据共享

- 请求域: 一次请求的范围(请求层面)
  - `request.setAttribute(String name, Object value)`：存储数据
  - `request.getAttribute(String name)`：获取数据
  - `request.removeAttribute(String name)`：删除数据
- 会话域: 一次会话的范围(浏览器层面)
  - `request.getSession()`：获取会话对象
  - `session.setAttribute(String name, Object value)`：存储数据
  - `session.getAttribute(String name)`：获取数据
  - `session.removeAttribute(String name)`：删除数据
- 应用域: 一次应用的范围(服务器层面)
  - `application.setAttribute(String name, Object value)`：存储数据
  - `application.getAttribute(String name)`：获取数据
  - `application.removeAttribute(String name)`：删除数据

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 请求域
    req.setAttribute("name", "zhangsan");
    // 会话域
    HttpSession session = req.getSession();
    session.setAttribute("name", "lisi");
    // 应用域
    ServletContext application = req.getServletContext();
    application.setAttribute("name", "wangwu");
    // 请求转发
    req.getRequestDispatcher("/pageB.html").forward(req, resp);
}
```

## MVC

- MVC 模式
  - Model：模型，负责处理业务逻辑
  - View：视图，负责展示数据
  - Controller：控制器，数据变化的时候，控制器负责调用模型处理数据，然后通知视图更新数据
- 结构说明
  - Controller：数据的流转和控制,主要来源前端请求
    - 路由：根据请求的 url,调用对应的方法
    - 业务逻辑：调用 Service 层的方法
    - 数据转发：将数据转发给视图
  - Service：业务逻辑处理
    - 调用 Dao 层的方法
    - 处理业务逻辑
  - Dao：数据持久化
    - DaoImpl：实现类
    - 操作数据库
    - 操作文件
  - Bean：实体类
    - 封装数据
    - 提供 get/set 方法
