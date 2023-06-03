## SQL 语句三种类型

- DML: Data Manipulation Language 数据操作语言
- DDL: Data Definition Language 数据定义语言
- DCL: Data Control Language 数据控制语言

### DML

用于对数据库中的数据进行操作，包括增删改查

- insert : 插入数据
- delete : 删除数据
- update : 更新数据
- select : 查询数据

#### 查询

- 只有给列起别名时，才使用双引号
- 日期和字符需要使用单引号

```sql
-- 注释以 -- 开头(注意空格)

-- 查询显示表结构(describe/desc)
desc table_name;

-- 查询所有列
select * from table_name where condition;

-- 查询指定列
select column1, column2 from table_name;

-- 查询指定列并拼接
select column1 || column2 from table_name; --oracle
select concat(column1, column2) from table_name; --mysql

-- 查询列并执行运算(+-*/,可以搭配sql函数),空值运算结果为null
select column1 + column2 from table_name;

-- 查询指定列并重命名(as)
select column1 + column2 as sum from table_name;

-- 查询指定列并去重(distinct)
select distinct column1 from table_name;

```

#### 过滤(where)

- 用于对查询结果进行过滤,紧跟在 from 之后

condition : 过滤条件,可以是列名,也可以是运算表达式

```sql
-- 查询条件
select * from table_name where condition;

-- 同时符合多个条件(and)
select * from table_name where condition1 and condition2;

-- 符合其中一个条件(or)
select * from table_name where condition1 or condition2;

-- 不符合条件(not)
select * from table_name where not condition1;

-- 模糊查询(like): %表示任意多个字符,_表示一个字符
select * from table_name where column1 like '%value%'; -- 包含value字符的值

-- 存在(in):在其中一个值时返回
select * from table_name where column1 in (value1, value2, value3);

-- 区间(between and):在区间内返回
select * from table_name where column1 between value1 and value2;

-- 查询null值(is null)
select * from table_name where column1 is null;

-- 查询非null值(is not null)
select * from table_name where column1 is not null;

-- 分页
select * from table_name where condition limit start, size; -- mysql
select * from table_name where condition limit size offset start; -- oracle

-- row_number窗口函数：用于分页，去重，排序
select row_number() over(order by column1) as rownum, column1 from table_name where condition;
```

#### 排序(order by)

- 用于对查询结果进行排序,升序(asc,默认)和降序(desc),通常在 sql 语句最后

```sql
-- 升序(asc,默认)
select * from table_name where condition order by column1;

-- 降序(desc)
select * from table_name where condition order by column1 desc;

-- 按别名排序(别名尽量不使用""),尽量不要使用别名排序
select column1 + column2 as sum from table_name order by sum;

-- 按多个列排序
select * from table_name order by column1 asc, column2 desc;

```

#### 多表查询

- 等值连接与非等值连接
- 外连接与内连接
- 自连接与非自连接

```sql
select column1, column2 from table_name, table_name2 ; -- 笛卡尔积,未指定连接条件

-- 解决笛卡尔积问题:提供连接条件
select column1, column2 from table_name, table_name2 where table_name.column1 = table_name2.column1;

-- 完成n个表的连接,至少需要n-1个连接条件
select column1, column2 from table_name, table_name2, table_name3 where table_name.column1 = table_name2.column1 and table_name.column2 = table_name3.column2;

-- 等值连接:使用=连接
select column1, column2 from table_name, table_name2 where table_name.column1 = table_name2.column1;

-- 非等值连接:使用>,<,>=,<=连接
select column1, column2 from table_name, table_name2 where table_name.column1 > table_name2.column1;

-- 内连接:只返回符合条件的数据 (inner join on)
select column1, column2 from table_name inner join table_name2 on table_name.column1 = table_name2.column1;

-- 外连接:返回符合条件的数据和不符合条件的数据 (left/right outer join on)
-- 左外连接:返回符合条件的数据和左表不符合条件的数据
-- 右外连接:返回符合条件的数据和右表不符合条件的数据
-- 满外连接:返回左表和右表所有数据(oracle支持,mysql需要使用union)(full outer join on)
select column1, column2 from table_name left join table_name2 on table_name.column1 = table_name2.column1;

-- 自连接:将一张表看成两张表,进行连接
select column1, column2 from table_name t1, table_name t2 where t1.column1 = t2.column1;

```

### DDL 与 DCL

- DDL(Data Definition Language)：数据定义语言，用来定义数据库对象、
  - 创建和管理表
  - 不可回滚
- DCL(Data Control Language)：数据控制语言，用来定义访问权限和安全级别
  - 授权
  - 回滚

#### 创建表

语句格式:

- 创建新表：`create table table_name(column1 type1, column2 type2, ... columnN typeN);`
- 基于其他表：`create table table_name as select column1, column2, ... columnN from table_name;`
  - 不包含约束
  - 包含原来表的数据
  - 可以使用 where 子句过滤数据（使用一个不可能成立的条件，如 1=2，这样就不会复制任何数据）

```sql
create table table_name(
    id int(10) auto_increment primary key, -- 主键,自增
    'name' varchar(20), -- name为关键字,需要使用''
    score float(5,2),
    birthday date
);

```

| 数据类型    | 说明                                                                |
| :---------- | :------------------------------------------------------------------ |
| int         | 整数 , 4 字节                                                       |
| char(n)     | 字符串, n 字节,默认 1 ,1-255                                        |
| varchar(n)  | 可变字符串, 必须指定长度                                            |
| float(m,d)  | 单精度浮点数, m 总位数, d 小数位数,d<=m<=255,0<=d<=30，默认 m+d<=6  |
| double(m,d) | 双精度浮点数, m 总位数, d 小数位数,d<=m<=255,0<=d<=30 ,默认 m+d<=15 |
| date        | 日期,格式为 YYYY-MM-DD                                              |
| blob        | 二进制数据,最大 4G                                                  |
| text        | 文本数据,最大 4G                                                    |

#### 表管理

```sql
-- 添加列
alter table table_name add column_name type;-- 在table_name表中添加类型为type的column_name列
alter table table_name add column_name type first;-- 放在第一列
alter table table_name add column_name type after column_name2;-- 放在column_name2列后面
alter table table_name add column_name type default value;-- 设置默认值

-- 修改列
alter table table_name modify column_name type;-- 修改列类型
alter table table_name modify column_name type first;-- 放在第一列
alter table table_name modify column_name type after column_name2;-- 放在column_name2列后面

-- 重命名
alter table table_name change column_name new_column_name type;-- 修改列名

-- 删除列
alter table table_name drop column_name;-- 删除列

-- 修改表名
alter table table_name rename new_table_name;-- 修改表名

-- 清空表数据
truncate table table_name;-- 清空表数据,不可回滚

-- 删除表
drop table table_name;-- 删除表,不可回滚

-- DCL

COMMIT;-- 提交事务：将事务中的操作永久保存到数据库中
set autocommit = false;-- 关闭自动提交
rollback;-- 回滚事务：将事务中的操作全部撤销，回到事务开始前的状态

DELETE FROM table_name;-- 删除表中的数据，可以回滚
```

### 数据操作

```sql
-- 插入数据
insert into table_name values(value1, value2, ... valueN);-- 全部插入，可以省略列名，但是必须按照列顺序插入
insert into table_name(column1, column2, ... columnN) values(value1, value2, ... valueN);-- 指定列插入，列名和值必须一一对应
insert into table_name(column1, column2, ... columnN) values(value1, value2, ... valueN), (value1, value2, ... valueN);-- 批量插入
insert into table_name(column1, column2, ... columnN) select column1, column2, ... columnN from table_name;-- 从其他表中插入数据

-- 更新数据（注意：更新数据时，where 条件必须保证唯一性，否则会更新多条数据）
update table_name set column1=value1, column2=value2, ... columnN=valueN where condition;-- 更新数据

-- 删除数据（注意：删除数据时，where 条件必须保证唯一性，否则会删除多条数据）
delete from table_name where condition;-- 删除数据
```

### 约束

- 约束：对表中的数据进行限制，保证数据的完整性和准确性
  - 主键约束：primary key
  - 非空约束：not null
  - 唯一约束：unique
  - 外键约束：foreign key
  - 检查约束：check
- 约束的分类
  - 列级约束：添加在某一列上
  - 表级约束：添加在整张表上

```sql
create table students(
    sno char(10) primary key auto_increment, -- 主键,自增
    'name' varchar(20) not null, -- name为关键字,需要使用''
    gender char(1) default '男' check(gender in('男','女')), -- 默认值,检查约束
    email varchar(50) unique, -- 唯一约束
    class_id int(10) not null, -- 非空约束
    constraint fk_class foreign key(class_id) references classes(id) -- 外键约束
);

-- email在t1表中唯一
create table t1(
  email varchar(50),
  constraint t1_email unique(email)
)
--组合唯一： email和phone在t2表中唯一，二者完全相同才算重复
create table t2(
  email varchar(50),
  phone varchar(50),
  constraint t1_email_phone unique(email,phone)
)

-- 添加约束
alter table table_name add constraint constraint_name constraint_type(column_name);-- 添加约束
alter table table_name add constraint constraint_name constraint_type(column_name) references table_name(column_name);-- 添加外键约束


-- 删除唯一约束
alter table table_name drop INDEX constraint_name;-- 删除索引
-- 删除外键约束
alter table table_name drop foreign key constraint_name;-- 删除外键约束
-- 删除检查约束
alter table table_name drop check constraint_name;-- 删除检查约束
-- 删除主键约束
alter table table_name drop primary key;-- 删除主键约束

-- 级联操作
-- 级联更新：当主表中的数据更新时，从表中的数据也会更新
-- 级联删除：当主表中的数据删除时，从表中的数据也会删除
-- 级联置空：当主表中的数据删除时，从表中的数据置空
```
