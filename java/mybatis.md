# MyBatis 框架

## 1. MyBatis 简介

MyBatis 是一个优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs 映射成数据库中的记录。

MyBatis 本是 Apache 的一个开源项目 iBatis，2010 年这个项目由 Apache Software Foundation 迁移到了 Google Code，并且改名为 MyBatis，2013 年 11 月迁移到 Github。

## 2. MyBatis 的优点

- 简单易学，学习成本低
- SQL 与程序代码的分离，提高了可维护性
- 提供映射标签，支持对象与数据库的 ORM 字段关系映射
- 提供对象关系映射标签，支持对象关系组建维护
- 提供 XML 标签，支持编写动态 SQL 语句

## 3. ORM 框架

ORM（Object Relational Mapping）对象关系映射，是一种程序设计技术，用于实现面向对象编程语言里不同类型系统的数据之间的转换。从效果上说，它其实是创建了一个可在编程语言里使用的“虚拟对象数据库”。

## 4. MyBatis 的核心组件

- SqlSessionFactoryBuilder：用于创建 SqlSessionFactory，它会读取配置文件的信息来创建 SqlSessionFactory 对象。

## iBatis 的使用

1. 导入 mybatis，mysql 驱动，junit 的 jar 包
2. 创建实体类
3. 创建 mybatis 的配置文件
   - 配置数据源
   - 配置 sql 映射文件
4. 创建 sql 映射文件，编写 sql 语句
5. 使用 mybatis 的 api 执行 sql 语句

### 引入外部配置文件

- 在 mybatis 的配置文件中，使用 properties 标签引入外部配置文件
- 在外部配置文件中，使用 properties 标签配置数据库连接信息

```properties
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/mybatis?useUnicode=true&characterEncoding=utf8
username=root
password=123456
```

```xml
<properties resource="db.properties"></properties>
<!-- other configs... -->
<dataSource type="POOLED">
  <property name="driver" value="${driver}"></property>
  <property name="url" value="${url}"></property>
  <property name="username" value="${username}"></property>
  <property name="password" value="${password}"></property>
</dataSource>
```

## lombok

- 通过注解的方式，可以在编译时自动生成 getter/setter、构造方法、toString 等方法，简化代码
- 安装 lombok 插件
  - 在 idea 中安装插件：File -> Settings -> Plugins -> Browse repositories -> 搜索 lombok -> 安装
  - 在 pom.xml 中引入依赖 ：org.projectlombok -> lombok -> 1.18.12
  - 在实体类上添加注解 @Data

## MyBatis 的使用

- ibatis 的缺陷
  - 虽然提供了 curd 的标签，但是需要传入正确的 statementId，如果写错了，编译器不会报错，运行时才会报错
  - 限制了传参个数，如果需要传入多个参数，需要将参数封装成 map 或者 pojo
  - 返回结果只有 Object 和 List，如果需要返回 map，需要自己写代码
- mybatis 的使用
  - 创建实体的 mapper 接口（不允许存在重载方法）
  - 创建实体的 mapper.xml 文件
  - 在 mybatis 的配置文件中，配置 mapper.xml 文件的位置
  - 在 mybatis 的配置文件中，加载 mapper.xml 文件
  - 使用 mybatis 的动态代理机制，使用 mapper 接口对象

### mapper.xml 的参数处理

- 如果是单个参数，直接使用 #{value}/${value} 获取参数值，value 可以任意命名
  - `select * from user where id = #{id}`
- 如果是实体类，直接使用 #{key} 获取属性值，key 是实体类的属性名
  - `insert into user(id, name, pwd) values(#{id}, #{name}, #{pwd})`
- 如果是 Map，直接使用 #{key} 获取 value，key 是 Map 的 key
  - `insert into user(id, name, pwd) values(#{id}, #{name}, #{pwd})`
- 如果是多个参数，无法直接获取参数值
  - 将多个参数封装成 Map 或者实体类`select * from user where id = #{arg0} and name = #{arg1}`
  - 使用 @Param 注解指定参数名`select * from entity where entity_id = #{id} and entity_name = #{name}`
    - 在 mapper 接口中，使用 @Param 注解来指定参数名`User getUserByIdAndName(@Param("id") int id, @Param("name") String name);`

### 代理模式

- 代理模式是一种设计模式，提供了对目标对象另外的访问方式；即通过代理对象访问目标对象。这样做的好处是：可以在目标对象实现的基础上，增强额外的功能操作，即扩展目标对象的功能。
- 代理模式的角色和职责
  - 抽象角色：声明真实对象和代理对象的共同接口
  - 代理角色：代理对象角色内部含有对真实对象的引用，从而可以操作真实对象，同时代理对象提供与真实对象相同的接口以便在任何时刻都能代替真实对象。同时，代理对象可以在执行真实对象操作时，附加其他的操作，相当于对真实对象进行封装。
  - 真实角色：代理角色所代表的真实对象，是我们最终要引用的对象。
- 静态代理：
  - 明确代理类和被代理类
  - 优点：可以做到在符合开闭原则的情况下对目标对象进行功能扩展。
  - 缺点：我们得为每一个服务都得创建代理类，工作量太大，不易管理。同时接口一旦发生改变，代理类也得相应修改。
- 动态代理：
  - 动态代理类的字节码随用随创建，随用随加载
  - 作用：不修改源码的基础上对方法增强
  - 分类：
    - jdk 动态代理
    - cglib 动态代理

### MyBatis 的动态代理

- MyBatis 采用动态代理模式，为 Dao 接口生成代理对象，并由代理对象执行增删改查操作
- MyBatis 为 Dao 接口生成代理对象的步骤
  - 使用 SqlSession.getMapper(Dao.class) 获取 Dao 接口对应的代理对象
  - 代理对象执行增删改查方法时，会调用 SqlSession 对应的增删改查方法

## 开启日志

- 在 mybatis 的配置文件中，配置 settings 标签，开启日志

```xml
<settings>
<!--
  logImpl：日志的实现类
    SLF4J_LOGGING：使用 slf4j 的日志实现类
    LOG4J_LOGGING：使用 log4j 的日志实现类
    LOG4J2_LOGGING：使用 log4j2 的日志实现类
    JDK_LOGGING：使用 jdk 的日志实现类
    COMMONS_LOGGING：使用 apache 的日志实现类
    STDOUT_LOGGING：使用标准输出流的日志实现类
    NO_LOGGING：不使用日志实现类
 -->
  <setting name="logImpl" value="STDOUT_LOGGING" />
</settings>
```
