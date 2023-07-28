# SSM

## 1. SSM 框架

### 1.1. 什么是 SSM 框架

SSM 框架是指 Spring + SpringMVC + MyBatis 框架整合在一起使用,组合成标准的 MVC 模式

标准的 SSM 框架有四层:DAO 层(数据访问层,mapper),Service 层(业务逻辑层),Controller 层(控制层),View 层(视图层)

Spring 实现业务对象管理,SpringMVC 负责请求转发,MyBatis 负责数据库访问

#### 1.1.1. 持久层:DAO 层(mapper)

DAO 层是指数据访问层,主要负责与数据库进行交互,进行增删改查等数据库操作

- DAO 层首先设计的是接口,然后通过 Spring 配置文件将接口和实现类进行关联
- 然后在 Service 层中注入 DAO 层接口,在 Service 层中调用 DAO 层接口中的方法(不关心 DAO 层接口的实现类是谁)
- 数据源以及数据库连接的配置在 Spring 配置文件中进行配置

#### 1.1.2. 业务层:Service 层

Service 层是指业务逻辑层,主要负责业务逻辑处理,事务控制等

- Service 层首先设计的是接口再进行实现,然后通过 Spring 配置文件配置其实现的关联
- 建立好 DAO 层再建立 Service 层,Service 层中又在 Controller 层中之下,因为既要调用 DAO 层的方法,又要提供给 Controller 层调用
- 每个模型都有一个 Service 接口,Service 接口中有增删改查的方法,然后在 Service 接口的实现类中实现这些方法

#### 1.1.3. 表现层:Controller 层(Hander)

Controller 层是指控制层,主要负责接收请求,进行响应,进行请求转发等

- 在 SpringMVC 中,Controller 层是一个 Servlet,负责接收请求,进行响应,进行请求转发等
- 配置在 Spring 的配置文件中,配置的是一个 Handler 映射器,负责将请求映射到对应的 Controller 层的 Servlet 中
- 调用 Service 层的方法,将结果返回给 View 层
- Controller 层中的方法,返回值是一个 ModelAndView 对象,ModelAndView 对象中包含了 Model 对象和 View 对象

#### 1.1.4. 视图层:View 层

View 层是指视图层,主要负责展示数据,进行页面跳转等

#### 1.1.5. 各层之间的关系

- DAO 层与 Service 层可以单独开发,耦合度较低
- Controller 层与 View 层耦合度较高,通常一起开发,也常看作一个整体

## 2. Spring 框架

### 2.1. Spring 核心

- IOC(Inversion of Control):控制反转,将对象(bean)的创建交给 Spring 容器来管理
- AOP(Aspect Oriented Programming):面向切面编程,将一些公共的代码抽取出来,例如日志,事务等,然后在需要的地方进行调用
  - 横切关注点:跨越应用程序多个模块的方法或功能,通常是同一类(功能)的非核心业务,例如日志,安全,缓存,事务等
  - 切面(Aspect):横切关注点被模块化的特殊对象,即它是一个类
  - 通知(Advice):切面必须要完成的工作,即它是类中的一个方法
  - 目标(Target):被通知对象
  - 代理(Proxy):向目标对象应用通知之后创建的对象
  - 链接点(JointPoint):与切面通知关联的点,例如目标对象的方法上或者异常处理器上
  - 切入点(PointCut):切面通知执行的"地点"的定义

## 3. Spring MVC

- 1. 客户端发送请求到前端控制器 DispatcherServlet
- 2. DispatcherServlet 收到请求调用 HandlerMapping 处理器映射器
- 3. 处理器映射器找到具体的处理器(xml 配置,注解),生成处理器对象及处理器拦截器(如果有则生成)一并返回给 DispatcherServlet
- 4. DispatcherServlet 调用 HandlerAdapter 处理器适配器
- 5. HandlerAdapter 经过适配调用具体的处理器(Controller,也叫后端控制器)
- 6. Controller 执行完成返回 ModelAndView
- 7. HandlerAdapter 将 Controller 执行结果 ModelAndView 返回给 DispatcherServlet
- 8. DispatcherServlet 将 ModelAndView 传给 ViewResolver 视图解析器
- 9. ViewResolver 解析后返回具体的 View
- 10. DispatcherServlet 根据 View 进行渲染视图(即将模型数据填充至视图中)
- 11. DispatcherServlet 响应用户

简化流程:

- 1. 客户端发送请求到前端控制器 DispatcherServlet
- 2. DispatcherServlet 收到请求调用 HandlerMapping 处理器映射器,找到具体的处理器(Controller,也叫后端控制器)
- 3. Controller 执行完成返回 ModelAndView
- 4. DispatcherServlet 将 ModelAndView 传给 ViewResolver 视图解析器
- 5. ViewResolver 解析后返回具体的 View

## 4. MyBatis 框架

mybatis 是对 jdbc 的封装,简化了 jdbc 的操作,提供了很多的便捷功能

mybatis 的操作围绕 SqlSessionFactory 实例展开

- SqlSessionFactoryBuilder:根据配置文件创建 SqlSessionFactory 实例
- SqlSessionFactory:根据配置文件创建 SqlSession 实例
- SqlSession:用于执行持久化操作的对象
- Mapper:用于定义持久化操作的接口

mybatis 通过配置文件来管理 sql 语句,配置文件中的 sql 语句是以 xml 的形式存在的
