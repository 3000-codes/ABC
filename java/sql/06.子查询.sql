-- 子查询：嵌套在其他查询中的查询，也称为内查询或嵌套查询。

-- 比Jack分数高的学生
SELECT name, scroe FROM t_user 
WHERE scroe > (SELECT scroe FROM t_user WHERE name = 'Jack');

-- Jack同组且比Jack分数高的学生
SELECT name, scroe FROM t_user 
WHERE group_id = (SELECT group_id FROM t_user WHERE name = 'Jack')
AND scroe > (SELECT scroe FROM t_user WHERE name = 'Jack');

-- 多列子查询

-- any：只要子查询中的任意一个值满足条件即可
-- all：子查询中的所有值都满足条件
-- in：子查询中的任意一个值满足条件即可

-- 1.与Jake同组的学生
SELECT name FROM t_user 
WHERE group_id =  (SELECT group_id FROM t_user WHERE name = 'Jack');

-- 2.班上高于平均分的学生
SELECT name, scroe FROM t_user 
WHERE scroe > (SELECT AVG(scroe) FROM t_user);

-- 3.各小组中高于所在小组平均分的学生
-- 连接子查询
SELECT name, scroe FROM t_user JOIN
(SELECT AVG(scroe) AS avg_scroe, group_id FROM t_user GROUP BY group_id) AS t 
ON t_user.group_id = t.group_id
WHERE scroe > t.avg_scroe;
-- 相关子查询
SELECT c1.name, c1.scroe FROM t_user AS c1 
WHERE c1.scroe > (SELECT AVG(c2.scroe) FROM t_user AS c2 WHERE c1.group_id = c2.group_id);
