-- 单行函数 

-- 日期型
SELECT NOW(); -- 当前日期时间

-- 字符型
SELECT LENGTH('abc'); -- 字符串长度 3
SELECT CONCAT('abc', 'def'); -- 字符串连接（参数个数不限）  abcdef
SELECT SUBSTRING('abcdef', 2, 3); -- 子串（索引从1开始） bcd
SELECT TRIM(' abc '); -- 去除首尾空格 abc
SELECT TRIM('a' FROM 'abca'); -- 去除首尾指定字符 bc
SELECT UPPER('abc'); -- 转换为大写 ABC
SELECT LOWER('ABC'); -- 转换为小写 abc
SELECT REPLACE('abc', 'a', 'A'); -- 替换字符串 Abc
SELECT REVERSE('abc'); -- 反转字符串 cba
SELECT INSTR('abc', 'b'); -- 查找子串位置（索引从1开始，未找到返回-1） 2
SELECT INSTR('abc', 'b', 3); -- 从指定位置开始查找子串位置（索引从1开始，未找到返回-1） -1

-- 数值型
SELECT ABS(-1); -- 绝对值 1
SELECT MOD(5, 3); -- 取模 2
SELECT ROUND(1.2345, 2); -- 四舍五入 1.23
SELECT TRUNCATE(1.2345, 2); -- 截断 1.23
SELECT CEIL(1.2345); -- 向上取整 2
SELECT FLOOR(1.2345); -- 向下取整 1
SELECT RAND(); -- 随机数 0.12345678901234567
SELECT RAND(1); -- 随机数种子 0.7309677873766576

-- 判断
SELECT IF(num > 2, 'yes', 'no'); -- 条件判断 
SELECT IFNULL(num, 'no'); -- 判断是否为NULL 
SELECT CASE num WHEN 1 THEN 'A' 
              WHEN 2 THEN 'B'
              ELSE 'C' END  "result"; -- 多条件判断 