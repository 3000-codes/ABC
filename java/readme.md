
### java项目结构

#### 第一层结构: 项目(project)

包括:.idea文件夹(项目配置文件夹),out文件夹(编译后的文件夹),项目文件夹(二层项目结构'模块')

#### 第二层结构: 模块(module)

包括:模块名.iml文件(模块配置文件),src文件夹(第三层级'包')

#### 第三层级: 包(package)

包括:java文件(第四层级'类')

##### 作用
package: 多级文件夹

好处:分类管理,方便查找,避免重名

必须在第一行声明

```java
package com.augurit.agcim.datastore.admin.utils;

public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
规范:
+ 一个单词:所有字母都小写,例如:com
+ 多个单词:所有字母都小写,单词之间用.分割,例如:com.augurit

### idea常用快捷模板

主方法            psvm
输出语句          sout(变量名.sout)
输出变量          soutv(变量名.soutv)
for循环           fori(循环次数.fori)
逆序for循环       forr(循环次数.forr)
抽取变量          数据值.var

### idea常用快捷键

+ ctrl+/:单行注释
+ ctrl+shift+/:多行注释
+ ctrl+alt+l:格式化代码
+ ctrl+alt+o:优化导入的类和包
+ ctrl+alt+m:抽取方法
+ alt+/:自动提示 
+ alt+enter:自动修正
+ ctrl+shift+u:大小写转换

### 调试程序(debug)

+ F8:逐行执行程序, idea中蓝色转折箭头(带下划线)
+ F7:进入到方法中, idea中蓝色向下箭头(带下划线)
+ alt+shift+F7:强制进入到方法中, 包括java源码中的方法, idea中红色向下箭头(带下划线)
+ shift+F8:跳出方法, idea中蓝色向上箭头(带下划线)
+ F9:跳到下一个断点,如果没有下一个断点,那么就结束程序
+ ctrl+F2:退出debug模式,停止程序
+ 红色方块:结束调试

### 模块的导入和移除

导入:模块右键->Open Module Settings->Modules->+->选择要导入的模块->OK->Apply->OK

移除:模块右键->remove module


## 数组

+ 说明: 在程序中存储同一种数据类型的多个元素的固定长度的数据结构
+ 特点:
    - 一旦创建,长度不可变
    - 数据类型必须统一

### 数组的声明和初始化

数组的声明

```java
// 声明方式1(推荐): 数据类型[] 数组名;
int[] arr1;

// 声明方式2: 数据类型 数组名[];
int arr2[];

```

数组的初始化:
+ 动态初始化: 只指定长度,由系统给出初始化值
+ 静态初始化: 给出初始化值,由系统决定长度

```java
// 动态初始化: 数据类型[] 数组名=new 数据类型[数组长度];
int[] arr1=new int[3];

// 静态初始化: 数据类型[] 数组名={元素1,元素2,元素3,...};
int[] arr3={1,2,3};
```