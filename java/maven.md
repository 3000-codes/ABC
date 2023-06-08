### POM

- 项目的配置文件，用于描述项目的基本信息，以及如何构建、报告、单元测试等。
- maven 不会读取 src 目录下的文件，只会读取 pom.xml 文件

#### 基本结构

```xml
<!-- 约束头： xml版本 ,编码-->
<?xml version="1.0" encoding="UTF-8"?>
<!--  项目根元素，xml约束有两种：dtd和schema -->
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
         <!-- maven配置文件的版本 -->
    <modelVersion>4.0.0</modelVersion>
<!-- 
  项目基本信息gavp
  groupId:项目组的唯一标识
  artifactId:项目的唯一标识
  version:项目的版本
 -->
    <groupId>com.maven</groupId>
    <artifactId>maven01</artifactId>
    <version>1.0-SNAPSHOT</version>
    <packaging>war</packaging>
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <dependencies>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>


</project>

```
