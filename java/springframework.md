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
    <property name="address" ref="address"/>
</bean>
<!-- 有参构造方法, constructor-arg调用的是有参构造方法-->
<bean id="user" class="com.example.spring.User">
<!--
    value/ref：参数值，必须，如果不指定index和name，那么参数的位置必须和构造方法中的参数位置一致
    name，index：非必须，指定参数的位置，index从0开始，name指定参数的名称
 -->
    <constructor-arg name="name" value="张三" index="0"/>
    <constructor-arg name="age" value="18" index="1"/>
    <constructor-arg name="address" ref="address" index="2"/>
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

#### FactoryBean

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
    - 无法直接通过 property 标签给原始类的属性赋值
    - 可以通过 FactoryBean 的属性赋值,从而间接给原始类的属性赋值
  - 配置文件检测到工厂 bean，会调用 getObject() 方法创建对象，如果是单例，会将对象放入 Spring 容器中，如果是多例，每次获取都会创建一个新的对象，然后将对象存储在 Spring 容器中

```java
// 实现FactoryBean接口
@Data
public class MyFactoryBean implements FactoryBean<User> {

    private String name;
    private Integer age;
    // 返回创建的对象
    @Override
    public User getObject() throws Exception {
        User user = new User();
        user.setName(name); // 通过FactoryBean的属性赋值
        user.setAge(age);
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
<bean id="myFactoryBean" class="com.example.spring.MyFactoryBean">
    <property name="name" value="张三"/>
    <property name="age" value="18"/>
</bean>
```

#### bean 的作用域

- bean 的作用域：bean 在 Spring 容器中的生命周期
- bean 的作用域有 5 种：
  - singleton：单例，一个 bean 在 Spring 容器中只有唯一一个实例，Spring 容器启动时创建实例，Spring 容器关闭时销毁实例，线程安全，Spring 默认的作用域
  - prototype：多例，一个 bean 在 Spring 容器中可以有多个实例，每次获取都会创建一个新的实例
  - request：一个 bean 在一次请求中只有一个实例，不同的请求会创建不同的实例
  - session：一个 bean 在一次会话中只有一个实例，不同的会话会创建不同的实例
  - global-session：一般用于 Portlet 应用环境，不常用
- bean 的作用域的配置：
  - 在 bean 标签中配置 scope 属性
  - 在配置文件中配置 bean 的作用域
    - `<bean id="user" class="com.example.spring.User" scope="prototype"/>`
    - `<bean id="user" class="com.example.spring.User" scope="singleton"/>`
- bean 的作用域的使用：

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
public void testScope() {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    User user1 = context.getBean("user", User.class);
    User user2 = context.getBean("user", User.class);
    System.out.println(user1 == user2); // singleton：true，prototype：false
    context.close();
}
```

#### bean 的生命周期

- bean 的生命周期：bean 在 Spring 容器中的生命周期
- bean 的生命周期有 3 个阶段：
  - 实例化：创建 bean 的实例
  - 初始化：初始化 bean 的属性
  - 销毁：销毁 bean
- bean 的生命周期的配置：
  - 在 bean 类中配置初始化方法和销毁方法
  - 在 bean 标签中配置 init-method 和 destroy-method 属性
  - 在配置文件中配置 bean 的生命周期
    - `<bean id="user" class="com.example.spring.User" init-method="init" destroy-method="destroy"/>`
- bean 的生命周期的使用：

  ```java
  // bean 的声明
  @Data
  public class User {
      private String name;
      private Integer age;
      private Address address; // 自动装配的id必须和属性名一致
      public void init() {
          System.out.println("初始化");
      }
      public void destroy() {
          System.out.println("销毁");
      }
  }

  // 测试
  @Test
  public void testScope() {
      ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
      User user = context.getBean("user", User.class); // 在此之前调用init方法
      System.out.println(user);
      context.close();// 在此之后调用destroy方法（多例不会调用）
  }
  ```

### 基于注解的配置

- 在类上使用注解：`@Component`，将类交给 Spring 管理
  - `@Component`：普通组件，不知道是什么类型的组件，可以使用 `@Component` 注解
  - `@Controller`：控制器组件，一般用于 SpringMVC 的控制器
  - `@Service`：业务逻辑组件，一般用于业务逻辑层
  - `@Repository`：数据访问组件，一般用于数据访问层
  - 如果需要给组件起别名，可以使用 `@Component("别名")` 注解
- 在配置文件中配置组件扫描器，扫描注解

  - `<context:component-scan base-package="com.example.spring"/>`,基本包名,会扫描该包及其子包下的所有类,多个包名用逗号隔开
  - `<context:component-scan base-package="com.example.spring" resource-pattern="**/*.class"/>`,扫描指定(符合正则表达式)的资源文件
  - use-default-filters：是否使用默认的过滤器
    - `<context:component-scan base-package="com.example.spring" use-default-filters="false">`,不使用默认的过滤器
    - `<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>`,只扫描指定注解的类,必须设置 use-default-filters
    - `<context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>`,排除指定注解的类,可以不设置 use-default-filters

- 在类的属性上使用注解：`@Autowired`，自动装配(装配 的类必须在 Spring 容器中)

  - `@Autowired`：根据类型自动装配，如果有多个类型一样的 bean，会报错
    - 如果有多个类型一样的 bean，可以使用 `@Qualifier` 指定名称
    - 将`required`属性设置为`false`时，如果没有找到对应的 bean，不会报错，但是属性值为`null`
  - `@Qualifier`：根据名称自动装配，需要和 `@Autowired` 一起使用,如果有多个类型一样的 bean，可以使用 `@Qualifier` 指定名称
  - `@Resource`：根据类型自动装配，如果有多个类型一样的 bean，会根据名称自动装配
    - JavaEE 的注解，spring 提供了实现,`Autowired`是 spring 的注解
    - 效果和`@Autowired`+`@Qualifier`一样
    - 只能使用字段和 setter 注入,不能使用构造器注入
  - `@Value`：给属性赋值，
    - 可以给基本类型和 String 类型赋值
    - 也可以给 bean 类型赋值
    - 可以使用 SpEL 表达式
    - 可以使用到`context:property-placeholder`标签中配置的属性

- 在类的方法上使用注解：`@PostConstruct`，初始化方法
- 在类的方法上使用注解：`@PreDestroy`，销毁方法
- 在类上使用注解：`@Scope`，设置作用域
- 在类上使用注解：`@Lazy`，懒加载

```java
// bean 的声明
@Data
@Component("user") // 默认id为类名首字母小写
@Scope("prototype") // 设置作用域
@Lazy // 懒加载
public class User {
    @Value("张三") // 给属性赋值
    private String name;
    @Value("18")
    private Integer age;
    @Autowired // 自动装配
    @Qualifier("address") // 根据名称自动装配
    private Address address; // 自动装配的id必须和属性名一致
    @PostConstruct // 初始化方法
    public void init() {
        System.out.println("初始化");
    }
    @PreDestroy // 销毁方法
    public void destroy() {
        System.out.println("销毁");
    }
    @Autowired // 自动装配放在方法上,意思是将对象注入到方法参数中
    public void setAddress(Address address) {
        this.address = address;
    }
}

// 测试
@Test
public void testScope() {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    User user1 = context.getBean("user", User.class);
    User user2 = context.getBean("user", User.class);
    System.out.println(user1 == user2); // singleton：true，prototype：false
    context.close();
}
```

#### 配置类注解扫描

- 在类上使用注解：`@Configuration`，配置类
- 在配置类中使用注解：`@ComponentScan`，配置组件扫描器
- 在配置类中使用注解：`@Bean`，配置 bean

```java
// bean类
@Component
public class User{
    private String name;
    private Integer age;
}

// 配置类
@Configuration
@ComponentScan("com.example.spring") // 扫描指定包下的所有类
public class SpringConfig {
    @Bean
    public User user() {
        return new User();
    }
}

// 测试
@Test
public void testScope() {
    ApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class); // 传入配置类
    User user = context.getBean("user", User.class); // 获取bean
    System.out.println(user);
    context.close();
}

```

### 整合 Junit 省略配置 IOC

- 导入 Junit 依赖
- 在测试方法上使用注解：`@RunWith`，指定运行器
- 在测试方法上使用注解：`@ContextConfiguration`，指定配置文件

```java
@RunWith(SpringJUnit4ClassRunner.class) // 指定运行器
@ContextConfiguration("classpath:applicationContext.xml") // 指定配置文件
public class SpringTest {

    // 可以直接使用注解获取bean
    @Autowired
    private User user;
    @Test
    public void test() {
        System.out.println(user);
    }
}
```

## Spring AOP

### AOP 概述

- AOP：Aspect Oriented Programming，面向切面编程
- AOP 是一种编程思想，不是编程语言
- AOP 是 OOP 的补充，OOP 解决的是代码复用的问题，AOP 解决的是业务重复的问题

### AOP 原理

- AOP 是基于动态代理实现的
- AOP 有两种实现方式
  - JDK 动态代理：基于`接口`实现的动态代理
  - CGLIB 动态代理：基于`子类`实现的动态代理
- JDK 动态代理
  - 基于接口实现的动态代理
  - 代理类和目标类实现了相同的接口
  - 代理类和目标类是兄弟关系
  - 代理类重写了目标类的方法，增强了目标类的方法
- CGLIB 动态代理
  - 基于子类实现的动态代理
  - 代理类是目标类的子类
  - 代理类重写了目标类的方法，增强了目标类的方法

### AOP 实现

- 导入 AOP 依赖
- 在配置文件中开启 AOP 注解支持：`<aop:aspectj-autoproxy/>`
- 在类上使用注解：`@Aspect`，声明切面类
- 在切面类的方法上使用注解：`@Before`，前置通知
- 在切面类的方法上使用注解：`@AfterReturning`，后置通知
- 在切面类的方法上使用注解：`@AfterThrowing`，异常通知
- 在切面类的方法上使用注解：`@After`，最终通知
- 在切面类的方法上使用注解：`@Around`，环绕通知

```java
// 切面类
@Aspect // 声明切面类
@Component // 注册到容器中
public class MyAspect {
    @Before("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))") // 前置通知
    public void before(JoinPoint jp) {
        // JoinPoint：连接点，可以获取目标方法的信息
        // 获取方法名:jp.getSignature().getName()
        // 获取参数列表:jp.getArgs()
        // 获取目标对象:jp.getTarget()
        System.out.println("前置通知");
    }
    @AfterReturning("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))", "result") // 后置通知
    public void afterReturning(JoinPoint jp, Object result) {
      // returning="result"：result是目标方法的返回值，需要在参数中声明
        System.out.println("后置通知");
    }
    @AfterThrowing("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))", "ex") // 异常通知
    public void afterThrowing(JoinPoint jp, Exception ex) {
      // throwing="ex"：ex是目标方法抛出的异常，需要在参数中声明
        System.out.println("异常通知");
    }
    @After("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))") // 最终通知
    public void after() {
        System.out.println("最终通知");
    }
    @Around("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))") // 环绕通知
    public void around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("环绕通知前");
        pjp.proceed(); // 执行目标方法
        System.out.println("环绕通知后");
    }
}

// 测试
@Test
public void test() {
    ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    UserService userService = context.getBean("userService", UserService.class);
    userService.add();
}
```

切点内提取

```java
// 切面类
@Aspect // 声明切面类
@Component // 注册到容器中
public class MyAspect {
    @Pointcut("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))") // 切点:提取公共的切点表达式,必须是空方法,名称随意
    public void pointcut() {}
    @Before("pointcut()") // 前置通知
    public void before(JoinPoint jp) {
        System.out.println("前置通知");
    }
    @AfterReturning(pointcut = "pointcut()", returning = "result") // 后置通知
    public void afterReturning(JoinPoint jp, Object result) {
        System.out.println("后置通知");
    }
    @AfterThrowing(pointcut = "pointcut()", throwing = "ex") // 异常通知
    public void afterThrowing(JoinPoint jp, Exception ex) {
        System.out.println("异常通知");
    }
    @After("pointcut()") // 最终通知
    public void after() {
        System.out.println("最终通知");
    }
    @Around("pointcut()") // 环绕通知:一个抵得上上面四个通知
    public void around(ProceedingJoinPoint pjp) throws Throwable {
        Object[] args = pjp.getArgs(); // 获取参数列表
        Object result = null;
        try{
            System.out.println("环绕通知前");
            result = pjp.proceed(args); // 执行目标方法
            System.out.println("环绕通知后");
        } catch (Throwable throwable) {
            System.out.println("环绕通知异常");
            throw throwable;
        } finally {
            System.out.println("环绕通知最终");
        }
        return result;
    }
}
```

切点外提取

```java
// 声明一个切点类:可以提取多个切点表达式
@Component
public class MyPointcut {
    @Pointcut("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))") // 切点:提取公共的切点表达式,必须是空方法,名称随意
    public void pointcut() {}

    @Pointcut("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))") // 切点:提取公共的切点表达式,必须是空方法,名称随意
    public void pointcut2() {}
}

// 切面类1
@Aspect // 声明切面类
@Component // 注册到容器中
public class MyAspect {
    @Before("MyPointcut.pointcut()") // 前置通知
    public void before(JoinPoint jp) {
        System.out.println("前置通知");
    }
}

// 切面类2
@Aspect // 声明切面类
@Component // 注册到容器中
public class MyAspect2 {
    @Before("MyPointcut.pointcut2()") // 前置通知
    public void before(JoinPoint jp) {
        System.out.println("前置通知");
    }
}

```

#### 切点表达式

- execution：用于匹配方法执行的连接点,必须使用这个关键字包裹表达式
- 前两位是描述方法的修饰符和任意返回值，\*表示任意修饰符和任意返回值(此处使用一个\*表示同时匹配修饰符和返回值,相当于两位)
- 第三位是包名:
  - 可以写具体地址:com.example.spring.service.impl
  - 可以写通配符:com.example.spring.service.\*
  - 可以使用`..`,代表无视层级:com.example.spring..\*,但是不能使用`..`开头
- 第四位是类名:
  - 可以写具体类名:UserServiceImpl
  - 可以写通配符:\*ServiceImpl
- 第五位是方法名:
  - 可以写具体方法名:add
  - 可以写通配符:\*
- 最后一位是参数列表:
  - 可以写具体参数列表:(String, int),主意包装类和基本类型不一样
  - 可以写通配符:(..)
    - (..)表示任意参数列表
    - (\*)表示一个参数,任意类型
    - (\*, String)表示两个参数,第一个任意类型,第二个 String 类型
    - (String, \*)表示两个参数,第一个 String 类型,第二个任意类型
    - (String ..)表示至少两个参数,第一个 String 类型,后面任意类型
    - (.. String)表示至少两个参数,最后一个 String 类型,前面任意类型

#### 切面优先级

- 洋葱模型
- 修改切面优先级`@Order(1)`,数字越小优先级越高

```java
// 切面类
@Aspect // 声明切面类
@Component // 注册到容器中
@Order(1) // 修改切面优先级

```

### 基于 xml 的 AOP

```xml
<!-- ioc注解扫描 -->
<context:component-scan base-package="com.example.spring"></context:component-scan>

<!-- aop配置 -->
<aop:config>
    <!-- 切面 -->
    <aop:aspect ref="myAspect">
        <!-- 切点 -->
        <aop:pointcut id="pointcut" expression="execution(* com.example.spring.service.impl.UserServiceImpl.*(..))"/>
        <!-- 通知 -->
        <aop:before method="before" pointcut-ref="pointcut"/> <!-- 前置通知 -->
        <aop:after-returning method="afterReturning" pointcut-ref="pointcut" returning="result"/> <!-- 后置通知 -->
        <aop:after-throwing method="afterThrowing" pointcut-ref="pointcut" throwing="ex"/> <!-- 异常通知 -->
        <aop:after method="after" pointcut-ref="pointcut"/> <!-- 最终通知 -->
        <aop:around method="around" pointcut-ref="pointcut"/> <!-- 环绕通知 -->
    </aop:aspect>
</aop:config>
```

### JDBCTemplate

一个 JDBC 的封装,提供了一系列的方法,可以直接使用

```java
// 创建 JdbcTemplate 对象
JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
// 执行方法
jdbcTemplate.update("insert into user values(?, ?)", "张三", 18);
```

## 声明式事务(spring tx)

- 编程式事务:在代码中手动开启事务,提交事务,回滚事务
  - 细节暴露在代码中,需要实现所有细节,繁琐
  - 代码复用性差
- 声明式事务:不需要手动开启事务,提交事务,回滚事务,只需要在配置文件中配置即可

### 事务管理器

顶级接口:`TransactionManager`(5.2 之后)/`PlatformTransactionManager`(5.2 之前)

- getTransaction:获取事务
- commit:提交事务
- rollback:回滚事务

使用:

- 选择对应持久层框架的事务管理器,在配置文件中配置
- `<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">`
- 在配置文件中配置事务通知
  - `<tx:advice id="txAdvice" transaction-manager="transactionManager">`
  - `<aop:config>`
  - `<aop:pointcut id="pointcut" expression="execution(* com.example.spring.service.impl.UserServiceImpl.*(..))"/>`
  - `<aop:advisor advice-ref="txAdvice" pointcut-ref="pointcut"/>`
  - `</aop:config>`
- 在配置文件中开启事务注解
  - `<tx:annotation-driven transaction-manager="transactionManager"/>`
- 在需要事务的方法上添加注解
  - `@Transactional`
    - 可以添加在类上,表示类中所有方法都需要事务
    - 可以添加在方法上,表示该方法需要事务
    - 既添加在类上,又添加在方法上,方法上的注解优先级高
  - `@Transactional`的属性
    - readOnly:是否只读,默认 false,查询时可以设置为 true,提高性能
    - timeout:超时时间,默认值为`-1`,表示不超时,单位为秒
    - rollbackFor:回滚,默认值为`RuntimeException`,表示遇到运行时异常回滚
      - 可以指定异常类型,遇到指定异常类型回滚
      - 可以指定异常类型数组,遇到数组中的异常类型回滚
    - noRollbackFor:不回滚,默认值为`{}`,表示不回滚
      - 可以指定异常类型,遇到指定异常类型不回滚
      - 可以指定异常类型数组,遇到数组中的异常类型不回滚
    - isolation:事务隔离级别,默认值为`DEFAULT`,表示使用数据库默认的隔离级别
      - `DEFAULT`:使用数据库默认的隔离级别
      - `READ_UNCOMMITTED`:读未提交
      - `READ_COMMITTED`:读已提交
      - `REPEATABLE_READ`:可重复读
      - `SERIALIZABLE`:串行化

```xml
<!-- ioc注解扫描 -->
<context:component-scan base-package="com.example.spring"></context:component-scan>

<!-- aop配置 -->
<aop:config>
    <!-- 切面 -->
    <aop:aspect ref="myAspect">
        <!-- 切点 -->
        <aop:pointcut id="pointcut" expression="execution(* com.example.spring.service.impl.UserServiceImpl.*(..))"/>
        <!-- 通知 -->
        <aop:before method="before" pointcut-ref="pointcut"/> <!-- 前置通知 -->
        <aop:after-returning method="afterReturning" pointcut-ref="pointcut" returning="result"/> <!-- 后置通知 -->
        <aop:after-throwing method="afterThrowing" pointcut-ref="pointcut" throwing="ex"/> <!-- 异常通知 -->
        <aop:after method="after" pointcut-ref="pointcut"/> <!-- 最终通知 -->
        <aop:around method="around" pointcut-ref="pointcut"/> <!-- 环绕通知 -->
    </aop:aspect>
</aop:config>

<!-- 事务管理器 -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"/>
</bean>

<!-- 事务通知 -->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <tx:attributes>
        <tx:method name="add" propagation="REQUIRED"/>
        <tx:method name="delete" propagation="REQUIRED"/>
        <tx:method name="update" propagation="REQUIRED"/>
        <tx:method name="select" read-only="true"/>
        <tx:method name="*" propagation="REQUIRED"/>
    </tx:attributes>
</tx:advice>

<!-- 开启事务注解 -->
<tx:annotation-driven transaction-manager="transactionManager"/>
```

```java
// 事务管理器
@Autowired
private PlatformTransactionManager transactionManager;

// 事务通知
@Pointcut("execution(* com.example.spring.service.impl.UserServiceImpl.*(..))")
private void pointcut() {
}

@Before("pointcut()")
public void before() {
    // 获取事务
    TransactionStatus transactionStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
    // 保存事务
    transactionMap.put("transactionStatus", transactionStatus);
}

@AfterReturning("pointcut()")
public void afterReturning() {
    // 获取事务
    TransactionStatus transactionStatus = (TransactionStatus) transactionMap.get("transactionStatus");
    // 提交事务
    transactionManager.commit(transactionStatus);
}

```
