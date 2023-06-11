### POM

- 项目的配置文件，用于描述项目的基本信息，以及如何构建、报告、单元测试等。
- maven 不会读取 src 目录下的文件，只会读取 pom.xml 文件

#### 基本结构

```xml
<!-- 约束头： xml版本 ,编码-->
<?xml version="1.0" encoding="UTF-8"?>
<!--  项目根元素，xml约束有两种：
dtd和schema
dtd：约束文件，约束力度弱，只能约束标签
schema：标签不可随意命名，也有规定顺序
 -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
         <!-- maven配置文件的版本 -->
    <modelVersion>4.0.0</modelVersion>
<!--
  项目基本信息gavp
  groupId:项目组的唯一标识
  artifactId:项目的唯一标识
  version:项目的版本，每次【install/deploy】根据代码修改程度调整版本号（必须）主版本.次版本.修订版本
  packaging:项目打包方式：
  jar(默认)：java项目
  war：web项目
  pom：父项目，聚合项目，通常不会打包
 -->
    <groupId>com.maven</groupId>
    <artifactId>maven01</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>

        <!--
            自定义属性,常用于统一管理jar包的版本号
            使用方式：${属性名}
         -->
         <spring.version>5.2.5.RELEASE</spring.version>

    </properties>
<!--
    dependencies：项目依赖
    dependency：项目依赖的jar包的信息
    如何找到jar包：
        1. maven官网：https://mvnrepository.com/
        2. idea自带的maven仓库：pom.xml中,右键->generate->dependency->搜索
    scope:依赖范围
        compile(默认)：编译范围，项目运行时需要
        test：测试范围，项目测试时需要
        provided：已提供范围，项目运行时需要，但是不会打包到项目中，例如：servlet-api
        runtime：运行时范围，项目运行时需要，但是不会参与编译，例如：jdbc驱动
        system：系统范围，项目运行时需要，但是不会参与编译，需要手动指定jar包路径
        import：导入范围，用于管理依赖的版本号
 -->
    <dependencies>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
<build>
<!-- 构建信息配置 -->
<!-- 打包命名：
    默认：${artifactId}-${version}.${packaging}
 -->
    <finalName>maven01</finalName>

    <plugins>
        <!--
        plugins：插件
        plugin：插件
        groupId：插件的唯一标识
        artifactId：插件的唯一标识
        version：插件的版本
        executions：插件的执行阶段
        execution：插件的执行阶段
        id：执行阶段的唯一标识
        phase：执行阶段
        goals：执行目标
        goal：执行目标
     -->
     <!-- 替换打包分析的站点插件 -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-site-plugin</artifactId>
            <version>3.7.1</version>
        </plugin>

        <!-- tomcat插件 -->
        <plugin>
            <groupId>org.apache.tomcat.maven</groupId>
            <artifactId>tomcat7-maven-plugin</artifactId>
            <version>2.2</version>
            <configuration>
                <!-- 项目部署的端口号 -->
                <port>8080</port>
                <!-- 项目部署的路径 -->
                <path>/</path>
                <!-- 项目部署的上下文 -->
                <contextReloadable>true</contextReloadable>
                <!-- 设置编码 -->
                <uriEncoding>UTF-8</uriEncoding>
                <!-- 设置服务器 -->
                <server>tomcat001</server>
            </configuration>
    </plugins>

    <resources>
    <!-- 控制需要打包的资源 -->
        <!--
            resources：资源
            resource：资源
            directory：资源目录
            includes：包含的资源
            exclude：排除的资源
            filtering：是否过滤资源
         -->
        <resource>
            <directory>src/main/resources</directory>
            <includes>
            <!--
                通配符：
                *：匹配任意字符，不包含路径分隔符
                **：匹配任意字符，包含路径分隔符,即任意层次文件夹
                ?：匹配任意一个字符，不包含路径分隔符
                {}：匹配多个字符串，用逗号分隔
             -->
                <include>**/*.properties</include>
            </includes>
            <filtering>true</filtering>
        </resource>
    </resources>

</project>

```

### 依赖管理

#### 依赖范围

- compile(默认)：编译范围，项目运行时需要
- test：测试范围，项目测试时需要
- provided：已提供范围，项目运行时需要，但是不会打包到项目中，例如：servlet-api
- runtime：运行时范围，项目运行时需要，但是不会参与编译，例如：jdbc 驱动
- system：系统范围，项目运行时需要，但是不会参与编译，需要手动指定 jar 包路径
- import：导入范围，用于管理依赖的版本号

#### 依赖传递与冲突

- 依赖传递：A 依赖 B，B 依赖 C，那么 A 依赖 C
  - 依赖导入时，会自动导入依赖的依赖
- 依赖冲突：A 依赖 B 1.0，A 依赖 C 1.0，B 依赖 C 2.0，那么 A 依赖 C 1.0 还是 2.0
  - 循环依赖时，会中断依赖的自动导入
  - 发生依赖冲突时，中断依赖的自动导入
  - 依赖冲突时，会优先使用依赖路径更短的 jar 包，其次使用先声明的 jar 包
- 手动排除依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <!-- 排除依赖 -->
    <exclusions>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jcl</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## 聚合与继承

### 继承

- 通过继承，可以将相同的配置抽取到父项目中，子项目只需要声明自己的 artifactId
- 父工程打包方式为 pom，子工程打包方式为 jar 或 war
- 子工程通过 `<parent>` 标签声明父工程
- 父工程版本管理`<dependencyManagement>`标签中的依赖，子工程可以直接使用，不需要声明版本号

```xml
<!--
    子项目中的父项目，可以通过<parent>标签进行管理
    然后子项目只需要声明自己的artifactId
 -->
<parent>
    <groupId>父项目的groupId</groupId>
    <artifactId>父项目的artifactId</artifactId>
    <version>父项目的version</version>
</parent>
<artifactId>子项目的artifactId</artifactId>
```

### 聚合

- 通过聚合，可以将多个项目组合在一起，统一管理
- 父工程打包方式为 pom，子工程打包方式为 jar 或 war
- 父工程通过 `<modules>` 标签声明子工程

```xml
<moudles>
    <moudle>子项目1的artifactId</moudle>
    <moudle>子项目2的artifactId</moudle>
</moudles>
```
