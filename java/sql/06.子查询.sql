-- 子查询：嵌套在其他查询中的查询，也称为内查询或嵌套查询。

-- 比Jack分数高的学生
SELECT name, scroe FROM t_user 
WHERE scroe > (SELECT scroe FROM t_user WHERE name = 'Jack');