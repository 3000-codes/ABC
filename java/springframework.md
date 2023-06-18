# Spring Framework

## Spring Framework 是什么？

Spring Framework 是一个开源的 Java 平台，它为构建 Java 应用程序提供了全面的基础设施支持，它是一个轻量级的解决方案，可以一站式地创建企业级应用程序。

## Spring Framework 的核心特性是什么？

- IOC/DI：控制反转/依赖注入
- AOP：面向切面编程
- MVC：模型-视图-控制器
- TX：事务管理
- 整合第三方框架

## IOC 容器

- IOC：Inversion of Control，控制反转,将对象的创建和对象之间的调用过程交给 Spring 容器来管理
- DI：Dependency Injection，依赖注入，是 IOC 的一种实现方式

### Spring 容器

- BeanFactory：IOC 容器的基本实现，是 Spring 内部使用的接口，不提供开发人员使用
- ApplicationContext：BeanFactory 的子接口，提供了更多的功能，一般情况下，我们使用 ApplicationContext，而不是 BeanFactory
- ClassPathXmlApplicationContext：从类路径下加载配置文件
- FileSystemXmlApplicationContext：从文件系统中加载配置文件
- AnnotationConfigApplicationContext：读取注解创建容器
- WebApplicationContext：Web 应用中使用的容器

### 基于 XML 管理 Bean

1. 创建 Bean 的配置文件

在`resources`目录下右键`New`->`XML Configuration File`->`Spring Config`，命名为`applicationContext.xml`。

2. 在配置文件中配置 Bean

- id：Bean 的唯一标识符,相当于 Java 中的变量名 `User user = new User();`
- class：Bean 对象的全限定类名，相当于 Java 中的类 `User user = new User();`

```xml
<beans>
    <!-- 配置 Bean -->
    <bean id="user" class="com.example.spring.User">
        <!-- 初始化赋值，要求必须有get/set方法， 相当于 user.setName("张三"); -->
        <property name="name" value="张三"/>
        <!--
          引用其他 Bean，相当于 user.setAddress(address);
          ref：引用其他 Bean 的 id
        -->
        <property name="address" ref="address"/>
    </bean>
</beans>

```

3. 通过容器获取 Bean 的实例

- getBean(String name)：根据 Bean 的 id 从容器中获取 Bean 的实例
  - 返回值为 Object 类型，需要强制类型转换，不推荐使用
- getBean(Class<T> requiredType)：根据 Bean 的类型从容器中获取 Bean 的实例
  - 返回值为 参数类型，不需要强制类型转换，推荐使用
  - 如果参数是一个接口，那么返回的是该接口的实现类，如果接口有多个实现类，那么会报错
  - 使用场景：当容器中只有一个该类型的 Bean 时，可以使用该方法
  - 如果接口只有一个实现类，可以使用该方法，多个实现类时，不推荐使用
- getBean(String name, Class<T> requiredType)：根据 Bean 的 id 和类型从容器中获取 Bean 的实例
  - 返回值为 参数类型，不需要强制类型转换，推荐使用
  - 使用场景：任何情况下都可以使用该方法

```java
// 创建容器
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
// 通过容器获取 Bean 的实例
User user = (User) context.getBean("user");
User user2 = context.getBean(User.class);
User user3 = context.getBean("user", User.class);
// 调用对象的方法
user.sayHello();
// 关闭容器
context.close();
```

#### Druid 数据库连接池

```xml
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
    <!-- 基本属性 url、user、password -->
    <property name="url" value="jdbc:mysql://localhost:3306/spring?useSSL=false&amp;serverTimezone=UTC"/>
    <property name="username" value="root"/>
    <property name="password" value="123456"/>
</bean>
```

```java
// 创建容器
ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
// 通过容器获取 Bean 的实例
DataSource dataSource = context.getBean(DataSource.class);
// 调用对象的方法
Connection connection = dataSource.getConnection();
System.out.println(connection);
// 关闭容器
context.close();
```

#### 内部 Bean 与外部 Bean

- 内部 Bean：
  - 在 Bean 的配置文件中，Bean 标签的内部又配置了一个 Bean
  - 防止多个类使用同一个 Bean
- 外部 Bean：在 Bean 的配置文件中，Bean 标签的内部没有配置 Bean

```xml
<bean id="user" class="com.example.spring.User">
    <property name="name" value="张三"/>
    <!-- 内部 Bean -->
    <property name="address">
        <bean class="com.example.spring.Address">
            <property name="city" value="北京"/>
            <property name="street" value="天安门"/>
        </bean>
    </property>
     <property name="address2" ref="address"/>
</bean>
<!-- 外部 Bean -->
<bean id="address" class="com.example.spring.Address">
    <property name="city" value="北京"/>
    <property name="street" value="天安门"/>
</bean>
```

#### 级联赋值

- 通过级联赋值，可以一次性给对象的多个属性赋值
- 使用场景：当对象的属性也是一个对象时，可以使用级联赋值

```xml
<bean id="user" class="com.example.spring.User">
    <property name="name" value="张三"/>
    <!-- 级联赋值 -->
    <!-- 内部bean -->
    <property name="address">
        <bean class="com.example.spring.Address">
            <property name="city" value="北京"/>
            <property name="street" value="天安门"/>
        </bean>
    </property>
    <!-- 外部bean -->
    <property name="address1" ref="address"/>
    <property name="address.city" value="北京"/>
    <property name="address.street" value="天安门"/>
</bean>
</bean>
```

#### 无参构造方法与有参构造方法

```xml
<!-- 无参构造方法, property调用的是setter方法-->
<bean id="user" class="com.example.spring.User">
    <property name="name" value="张三"/>
    <property name="age" value="18"/>
</bean>
<!-- 有参构造方法, constructor-arg调用的是有参构造方法-->
<bean id="user" class="com.example.spring.User">
<!--
    value：参数值，必须，如果不指定index和name，那么参数的位置必须和构造方法中的参数位置一致
    name，index：非必须，指定参数的位置，index从0开始，name指定参数的名称
 -->
    <constructor-arg name="name" value="张三" index="0"/>
    <constructor-arg name="age" value="18" index="1"/>
</bean>

```

#### 特殊参数

```xml
  <!-- null -->
<property name="name">
    <null/>
</property>
<!-- 特殊符号 -->
<property name="expression" value="a&lt;b"/> <!-- <, >, &, ', " 等特殊符号 -->

<!-- CDATA字节 -->
<property name="expression">
    <value><![CDATA[<a>hello</a>]]></value> <!-- <![CDATA[表达式]]> 包裹的内容不会被解析 -->
</property>

```

#### 引入外部属性文件

```xml
<!-- 引入外部属性文件 ，如果引入多个文件，使用逗号分隔 -->
<context:property-placeholder location="classpath:jdbc.properties"/>
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${jdbc.driverClassName}"/>
    <!-- 基本属性 url、user、password -->
    <property name="url" value="${jdbc.url}"/>
    <property name="username" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```

#### 简化 property 标签

```xml
<!-- 简化property标签 ，需要导入约束 -->
<bean id="user" class="com.example.spring.User" p:name="张三" p:age="18"/>
```

#### perproties 容器赋值

```xml
<!-- properties容器赋值 -->
<property name="numArr">
    <array>
        <value>1</value>
        <value>2</value>
        <value>3</value>
    </array>
</property>
<property name="numList">
    <list>
        <value>1</value>
        <value>2</value>
        <value>3</value>
    </list>
</property>
<property name="data">
    <map>
        <entry key="a" value="1"/>
        <entry key="b" value="2"/>
        <entry key="c" value="3"/>
    </map>
</property>
<property name="properties">
    <props>
        <prop key="a">1</prop>
        <prop key="b">2</prop>
        <prop key="c">3</prop>
    </props>
</property>

```

#### 自动装配

- 自动装配：Spring 会在上下文中自动寻找，并自动给 Bean 赋值
- 自动装配的方式：
  - byName：根据属性名自动装配,等同与 getBean("clazzid")
  - byType：根据属性类型自动装配，等同于 getBean(Clazz.class)
  - constructor：类似于 byType，但是是应用于构造方法的参数，如果有多个参数，会根据参数类型自动装配
- 自动装配的要求：
  - 要装配的属性必须存在于 Spring 的 IoC 容器中
  - 装配的属性在容器中必须是唯一的
- 自动装配的实现：
  - 使用 autowire 属性实现自动装配
  - 使用注解实现自动装配

```xml
<!-- 自动装配 -->
<bean id="user" class="com.example.spring.User" autowire="byName">
    <property name="name" value="张三"/>
</bean>
<bean id="address" class="com.example.spring.Address">
    <property name="city" value="北京"/>
    <property name="street" value="天安门"/>
</bean>
```

```java
// bean 的声明
@Data
public class User {
    private String name;
    private Integer age;
    private Address address; // 自动装配的id必须和属性名一致
}

// 测试
@Test
public void testAutoWired() {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    User user = context.getBean("user", User.class);
    System.out.println(user);
}
```

#### 集合 bean

```xml
<!-- 集合bean -->
<util:list id="list">
  <bean class="com.example.spring.User">
      <property name="name" value="张三"/>
      <property name="age" value="18"/>
  </bean>
  <bean class="com.example.spring.User">
      <property name="name" value="李四"/>
      <property name="age" value="19"/>
  </bean>
  </util:list>
```

```java
// bean 的声明
@Data
public class User {
    private String name;
    private Integer age;
    private Address address; // 自动装配的id必须和属性名一致
}

// 测试
@Test
public void testAutoWired() {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    List<User> list = context.getBean("list", List.class); // 获取集合bean
    System.out.println(list);
    context.close();
}
```

### FactoryBean

- FactoryBean 是一个接口，Spring 中有很多的实现类，可以用来创建对象
- FactoryBean 可以创建复杂的对象
  - 例如：SqlSessionFactoryBean 可以创建 SqlSessionFactory 对象
  - 单例对象
  - 读取外部配置文件
- FactoryBean 创建的对象会交给 Spring 管理
- FactoryBean 创建的对象，如果想要获取本身，需要在 id 前面加上 & 符号
- 使用方法：
  - 创建一个类
  - 实现 FactoryBean 接口
  - 在 Spring 配置文件中声明 `实现类` 的 bean
    - 无法通过 property 标签设置属性，需要在实现类中设置
  - 配置文件检测到工厂 bean，会调用 getObject() 方法创建对象，如果是单例，会将对象放入 Spring 容器中，如果是多例，每次获取都会创建一个新的对象，然后将对象存储在 Spring 容器中

```java
// 实现FactoryBean接口
public class MyFactoryBean implements FactoryBean<User> {
    // 返回创建的对象
    @Override
    public User getObject() throws Exception {
        User user = new User();
        user.setName("张三");
        user.setAge(18);
        return user;
    }

    // 返回创建的对象的类型
    @Override
    public Class<?> getObjectType() {
        return User.class;
    }

    // 是否单例
    @Override
    public boolean isSingleton() {
        return false;
    }
}
```

```xml
<!-- 声明FactoryBean -->
<bean id="myFactoryBean" class="com.example.spring.MyFactoryBean"/>
```
