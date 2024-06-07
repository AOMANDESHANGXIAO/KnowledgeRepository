# DML Data Query Language即数据查询语言

## 1. 基本查询

```sql
SELECT 字段1,字段2,字段3... FROM 表名; /*查询多个字段*/
SELECT * FROM 表名; /*查询所有字段*/
SELECT 字段1 [AS 别名1]，字段2 [AS 别名2]... FROM 表名; /*为字段取别名*/
SELECT DISTINCT 字段列表 FROM 表名; /*去除重复记录*/
```

## 2. 条件查询

关键字 `WHERE`。

可以跟上条件列表。条件可以有比较运算符或者逻辑运算符。

#### 比较运算符

| 比较运算符          | 功能                                         |
| ------------------- | -------------------------------------------- |
| >                   | 大于                                         |
| >=                  | 大于等于                                     |
| <                   | 小于                                         |
| <=                  | 小于等于                                     |
| =                   | 等于                                         |
| <> 或 !=            | 不等于                                       |
| BETWEEN ... AND ... | 在某个范围之内(包含最小，最大值)             |
| IN (...)            | 在in之后的列表中的值，多选一                 |
| LIKE 占位符         | 模糊匹配(`_`匹配单个字符，`%`匹配任意个字符) |
| IS NULL             | 是NULL                                       |

#### 逻辑运算符

| 逻辑运算符   | 含义 |
| ------------ | ---- |
| AND 或者 &&  | 并且 |
| OR 或者 \|\| | 或者 |
| NOT 或者 ！  | 非   |

使用示范

```sql
-- SELECT DISTINCT
-- 	* 
-- FROM
-- 	emp 
-- WHERE
-- 	age BETWEEN 20 
-- 	AND 30;
-- 查找年龄小于30的员工
-- SELECT * FROM emp WHERE age < 30; 
-- 插入一个身份证号码为空的员工
-- INSERT INTO emp(job_number, name, gender, age, hire_date, username) 
-- VALUES 
-- ('E0XX', '神秘人', '男', 18, '2022-11-10', 'Niu'); 
-- 查找没有身份证号的员工
-- SELECT * FROM emp where id_card IS NULL; 
 -- in 关键字的使用，满足一个条件即可。
-- select * from emp where age in (20,33);
-- 查找名字是两个字的员工
-- select * from emp where name like '__'; 
-- 查找以张开头名字是两个字的员工
-- select * from emp where name like '张_';
-- 查找身份证号最后一位是X的员工信息,%匹配任意个字符
-- SELECT * from emp where id_card like '%3';
```

## 3. 聚合函数

将一列数据作为一个整体，进行纵向计算。

### 常用聚合函数

| 函数  |   功能   |
| :---: | :------: |
| count | 统计数量 |
|  max  |  最大值  |
|  min  |  最小值  |
|  avg  |  平均值  |
|  sum  |   求和   |

### 语法

```sql
SELECT 聚合函数(字段列表)FROM 表名：
```

注意：`NULL`不参与聚合函数的计算。

**使用案例**

```sql
/*统计个数*/
-- SELECT count(*) from emp;
/*求最大值*/
-- SELECT max(age) from emp;
/*求最小值*/
-- SELECT min(age) from emp;
/*求和*/
-- SELECT sum(age) from emp;
/*求平均值*/
-- SELECT avg(age) from emp;
```

## 4. 分组查询

语法：

```sql
SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后的过滤条件];
```

1. where是过滤前的，having是过滤后的
2. having可以跟聚合函数

**使用示范**

```sql
-- 根据性别分组，查出男女员工的数量
-- select gender, count(*) from emp GROUP BY gender;
-- 根据性别分组，查出男女员工的平均年龄
-- select gender, avg(age) from emp GROUP BY gender;
```

执行顺序：`where` > 聚合函数 > `having`。

## 5. 排序查询

语法：

```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1， 排序方式1，字段2，排序方式2；
```

排序方式：ASC 升序(默认)；DESC 降序

> 如果是多字段排序，当第一个字段值相同时。才会根据第二个字段进行排序。

**使用示范**

```sql
-- 按照入职时间排序
SELECT * FROM emp ORDER BY hire_date, age;
```

## 6. 分页查询

语法：

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引，查询记录数；
```

起始索引从0开始，起始索引 = (查询页码 - 1) * 每页显示记录数