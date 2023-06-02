-- Group BY 语句:对查询结果进行分组

SELECT AVG(scroe) FROM t_user GROUP BY class_id; -- 按班级分组求平均分

-- 多级分组
-- 出现在SELECT子句中的列名必须出现在GROUP BY子句中，或者是聚合函数
SELECT class_id, AVG(scroe) FROM t_user GROUP BY class_id; -- 按班级分组求平均分
SELECT AVG(scroe) FROM t_user GROUP BY class_id ,group_id; -- 按班级的小组 分组求平均分

-- HAVING 语句:对分组后的结果进行过滤
SELECT class_id, AVG(scroe) FROM t_user GROUP BY class_id HAVING AVG(scroe) > 60; -- 按班级分组求平均分，过滤平均分大于60的班级
