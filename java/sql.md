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
