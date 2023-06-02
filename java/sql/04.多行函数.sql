-- 分组函数（聚合函数）：
-- 对一组数据进行统计，返回一个值，不处理NULL值
-- 不能嵌套使用分组函数

-- 数值函数
SELECT COUNT(*) FROM t_user; -- 统计表行数
SELECT SUM(num) FROM t_user; -- 求和
SELECT AVG(num) FROM t_user; -- 平均值
SELECT MAX(num) FROM t_user; -- 最大值
SELECT MIN(num) FROM t_user; -- 最小值

-- 字符串函数
SELECT GROUP_CONCAT(name) FROM t_user; -- 拼接字符串（将所有name字段值拼接成一个字符串）