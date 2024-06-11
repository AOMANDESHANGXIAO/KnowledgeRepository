# 小练习(暂时做不出来，学完多表查询再来)

[MySQL 经典练习 50 题（完美解答版）_mysql经典50题答案-CSDN博客](https://blog.csdn.net/GodSuzzZ/article/details/106930311)

## 1. 创建数据库和表

```sql
CREATE DATABASE mysql_test;
USE mysql_test;
create table student (
	s_id int,
	s_name varchar(8),
	s_birth date,
	s_sex varchar(4)
);
insert into student values
(1,'赵雷','1990-01-01','男'),
(2,'钱电','1990-12-21','男'),
(3,'孙风','1990-05-20','男'),
(4,'李云','1990-08-06','男'),
(5,'周梅','1991-12-01','女'),
(6,'吴兰','1992-03-01','女'),
(7,'郑竹','1989-07-01','女'),
(8,'王菊','1990-01-20','女');
create table course (
	c_id int,
	c_name varchar(8),
	t_id int
);
insert into course values
(1,'语文',2),
(2,'数学',1),
(3,'英语',3);
create table teacher (
	t_id int,
	t_name varchar(8)
);
insert into teacher values
(1,'张三'),
(2,'李四'),
(3,'王五');

create table score (
	s_id int,
	c_id int,
	s_score int
);
insert into score values
(1,1,80),
(1,2,90),
(1,3,99),
(2,1,70),
(2,2,60),
(2,3,65),
(3,1,80),
(3,2,80),
(3,3,80),
(4,1,50),
(4,2,30),
(4,3,40),
(5,1,76),
(5,2,87),
(6,1,31),
(6,3,34),
(7,2,89),
(7,3,98);
```

## 2. 数据库和表的样子
### 课程表

![image-20240610163855995](.\assets\image-20240610163855995.png)

### 考试得分表

![image-20240610163904972](.\assets\image-20240610163904972.png)

### 学生信息表

![image-20240610163914408](.\assets\image-20240610163914408.png)

### 教师表

![image-20240610163923096](.\assets\image-20240610163923096.png)

## 3. 查询练习

### 1. 查询01课程比02课程成绩高的学生的信息及课程分数

```sql
use mysql_test;

select student.*, sc1.s_score as score_01, sc2.s_score as score_02 from student
inner join 
( select * from score where c_id = 1) as sc1 on sc1.s_id = student.s_id
inner join 
(select *  from score where c_id = 2) as sc2 on sc2.s_id = student.s_id
where sc1.s_score > sc2.s_score;

```

### 2、查询"01"课程比"02"课程成绩低的学生的信息及课程分数

```sql
-- 查询 01 课程比02课程成绩低的学生的信息及课程分数
select s.*, score_01.s_score as 第一门课成绩, score_02.s_score as 第二门课成绩 from student as s
join (select * from score where c_id=1) as score_01 on score_01.s_id = s.s_id
join (select * from score where c_id=2) as score_02 on score_02.s_id = s.s_id
where score_02.s_score > score_01.s_score;
```

### 3. 查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩

``` sql
-- 查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
select s.s_id, s.s_name, c1.s_score as 语文课, c2.s_score as 数学课, c3.s_score as 英语课, (c1.s_score+c2.s_score+c3.s_score)/3 as 平均成绩 from student as s
join (select * from score where score.c_id=1) as c1
on c1.s_id=s.s_id
join (select * from score where score.c_id=2) as c2
on c2.s_id=s.s_id
join (select * from score where score.c_id=3) as c3
on c3.s_id=s.s_id
where (c1.s_score+c2.s_score+c3.s_score)/3 >= 60;

-- 更好的方法
-- 查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
-- 平均成绩怎么算出来?
select s.s_id, s.s_name from student s;

-- 查出来每个学生的平均成绩
select s_id, avg(s_score) as Avg_score from score group by s_id having Avg_score >= 60;

-- 现在连接两张表
select s.s_id, s.s_name,Avg_score from student s left join
(select s_id, avg(s_score) as Avg_score from score group by s_id having Avg_score >= 60) sc on sc.s_id = s.s_id;
```

### 4. 查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩(包括有成绩的和无成绩的)

``` sql
-- 查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩(包括有成绩的和无成绩的)
select s.s_id, s.s_name from student s;


select s_id, avg(s_score) as Avg_score from score group by s_id having Avg_score < 60;

SELECT
	s.s_id,
	s.s_name,
	Avg_score AS '平均成绩' 
FROM
	student s
	LEFT JOIN ( SELECT s_id, avg( s_score ) AS Avg_score FROM score GROUP BY s_id HAVING Avg_score < 60 ) AS sc ON s.s_id = sc.s_id;
```

### 5. 查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩

```sql
-- 5. 查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩

SELECT
	s.s_id,
	s.s_name,
	courseNum,
	sum_of_courses 
FROM
	student s
	JOIN ( SELECT s_id, count( s_id ) AS courseNum FROM score GROUP BY s_id ) AS score_t ON score_t.s_id = s.s_id
	JOIN ( SELECT s_id, sum( s_score ) AS sum_of_courses FROM score GROUP BY s_id ) AS score_sum ON score_sum.s_id = s.s_id;
```

总结下来就是：分开来写，要查什么就查什么，最后进行汇总。

### 6. 查询"李"姓老师的数量

```sql
-- 查询"李"姓老师的数量
use mysql_test;
select count(*) as 老师数量 from teacher where teacher.t_name like '李%';
```

### 7. 询学过"张三"老师授课的同学的信息

```sql
-- 最后连接表
SELECT
	s.* 
FROM
	student s
	JOIN (
	SELECT
		s_id 
	FROM
		score 
	WHERE
	score.c_id = ( SELECT c_id FROM course WHERE t_id = ( SELECT t_id FROM teacher WHERE t_name = '张三' ) ) 
	) AS t ON t.s_id = s.s_id;
```

### 8. 查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息

```sql

SELECT
	s.* 
FROM
	student s
	JOIN (
	SELECT
		t1.s_id 
	FROM
		score AS t1
		INNER JOIN ( SELECT s_id FROM score WHERE score.c_id = 2 ) AS t2 ON t2.s_id = t1.s_id 
	WHERE
		t1.c_id = 1 
	) AS t ON t.s_id = s.s_id;
```

