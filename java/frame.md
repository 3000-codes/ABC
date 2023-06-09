## SSM

### 三层架构

- Controller->Service->Dao
- SpringMVC->Spring->Mybatis
- Controller: 接收请求，调用 Service 层
- Service: 业务逻辑，调用 Dao 层
- Dao: 数据库操作

### maven

- 项目管理工具
- 依赖管理工具
  - 管理第三方 jar 包
  - 存储了 jar 包的版本信息,下载地址等
- 项目构建工具
  - 项目构建：从源代码到最终可执行程序的过程
  - 构建过程:清理->编译->测试->报告->打包->安装->部署

### maven 的环境配置

- 下载 maven
- 配置环境变量
  - 新建系统变量
  - 变量名: MAVEN_HOME
  - 变量值: maven 的安装目录
  - 编辑系统变量 Path
  - 在变量值的最后添加: %MAVEN_HOME%\bin
- 验证 maven 是否安装成功
  - 打开 cmd
  - 输入 mvn -v
  - 出现 maven 的版本信息则安装成功
- 配置本地仓库
  - 在 maven 安装目录下的 conf 目录中的 settings.xml 文件中配置
  - 找到 localRepository 标签
  - 修改标签中的值为本地仓库的路径(E:\repository)
  - 默认路径: C:\Users\用户名\.m2\repository
- 配置镜像
  - 在 maven 安装目录下的 conf 目录中的 settings.xml 文件中配置
  - 找到 mirrors 标签
  - 在 mirrors 标签中添加 mirror 标签
  - 在 mirror 标签中添加 id、mirrorOf、name、url 四个标签
  - id: 镜像的 id
  - mirrorOf: 要被镜像的仓库的 id
  - name: 镜像的名字
  - url: 镜像的地址
  - 配置阿里云镜像
    ```xml
    <mirror>
        <id>alimaven</id>
        <name>aliyun maven</name>
        <url>
            http://maven.aliyun.com/nexus/content/groups/public/
        </url>
        <mirrorOf>central</mirrorOf>
    </mirror>
    ```
- 配置编译版本
  - 在 maven 安装目录下的 conf 目录中的 settings.xml 文件中配置
  - 找到 profiles 标签
  - 在 profiles 标签中添加 profile 标签
  - 在 profile 标签中添加 id、activation、properties、repositories 四个标签
  - id: profile 的 id
  - activation: 激活 profile 的条件
  - properties: profile 的属性
  - repositories: profile 的仓库
  - 配置 jdk 版本
  ```xml
  <profile>
      <id>jdk-1.8</id>
      <activation>
          <activeByDefault>true</activeByDefault>
          <jdk>1.8</jdk>
      </activation>
      <properties>
          <maven.compiler.source>1.8</maven.compiler.source>
          <maven.compiler.target>1.8</maven.compiler.target>
          <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>
  </profile>
  ```
- idea 配置
  - file->settings->build,execution,deployment->build tools->maven->maven home directory

#### 项目配置信息

- 配置文件: pom.xml(pom: project object model)
- 配置内容: 项目信息、依赖信息、构建信息
- 配置位置: 项目根目录(与 src 同级)

### mybatis

### spring

### springMVC

```

```
