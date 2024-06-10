# 多表查询

## 一对多的关系

在多的一方建立外键，指向一的一方的主键。

## 多对多的关系

例如：学生与课程的关系，一个学生可以选修多门课程，一门课程也可以供多个学生选择。

>  实现：建立<u>第三张中间表</u>，中间表至少包含两个外键，分别关联两方主键。

![image-20240610164821924](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610164821924.png)

**创建一张表**

```sql
create DATABASE school;
use school;

create table student (
	id int auto_increment primary key auto_increment comment '主键id',
	name varchar(10) comment '姓名',
	no varchar(10) comment '学号'
) comment '学生表';
insert into student values (null, '黛绮丝', '200100101'), (null, '张三', '200100102'),(null, '牛魔', '200100103');

create table course(
	id int auto_increment primary key auto_increment comment '主键id',
	name varchar(10) comment '课程名称'
) comment '课程表';

insert into course values (null, 'java'), (null, 'php'), (null, 'MysQL'), (null, 'Hadoop');

create table student_course(
	id int auto_increment primary key auto_increment comment '主键id',
	student_id int not null comment '学生id',
	course_id int not null comment '课程id',
	CONSTRAINT fk_course_id foreign key (course_id) references course (id),
	CONSTRAINT fk_student_id foreign key (student_id) references student (id)
) comment '学生课程信息表';

insert into student_course values (null, 1,1), (null, 1,2), (null, 1,3),(null, 2,2),(null, 2,3),(null, 3,4);
```

**学生表**

![image-20240610170840206](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610170840206.png)

**课程表**

![image-20240610170853939](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610170853939.png)

**学生课程信息表**

![image-20240610170902642](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610170902642.png)

## 一对一关系

案例：用户与用户详情的关系

关系：一对一关系，多用于单表拆分，将一张表的基础字段放在一张表中，其他详情字段放在另一张表中，以提升操作效率。

![image-20240610171219401](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610171219401.png)

拆分后

![image-20240610171248203](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610171248203.png)

>  实现：在任意一方加入外键，关联另外一方的主键，并且设置外键为唯一的(UNIQUE)。

##  多表查询 -- 笛卡尔积

笛卡尔积指的是在数学中，两个集合A集合和B集合的所有组合情况。

> 在多表查询中需要消除掉无效的笛卡尔积

## 多表查询分类

### 1. 连接查询

#### 内连接：相当于查询A,B交集部分数据

内连接查询语法，分为隐式内连接以及显示内连接。

**隐式内连接**

语法：

```sql
SELECT 字段列表 FROM 表1，表2 WHERE 条件...;
```

**显式内连接**

```sql
SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件 ...;
```

**例子**

```sql
use codecat;
-- 查询每个员工的姓名及其所属的部门名称
-- 隐式内连接查询
select e.name, d.dept from emp as e, dept as d where e.dept = d.id;
-- 显示内连接查询
-- select e.name, d.dept from emp e inner join dept d on e.dept = d.id;
select e.name, d.dept from emp as e inner join dept as d on e.dept = d.id;
```

------

#### 外连接：

##### 左外连接：查询左表所有数据，以及两张表交集部分数据

语法：

```sql
SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件;
```

##### 右外连接：查询右表所有数据，以及两张表交集部分数据

```sql
SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件;
```

**例子**

```sql
-- 查询emp表的所有数据，和相应的部门信息 (左外连接)
select e.*, d.dept as 所属部门 from emp as e left outer join dept as d on e.dept = d.id;

-- 查询dept表的所有数据，和对应的员工信息（右外连接）
(select d.*, e.* from emp as e right outer join dept as d on e.dept = d.id) order by d.id;
```

-----

#### 自连接： 当前表与自身的连接查询，自连接必须使用表别名。

语法：
``` sql
SELECT 字段列表 FROM 表A 别名A JOIN 表A 别名B ON 条件...;
```

### 2. 子查询

![image-20240610174000254](D:\KnowledgeRepository\KnowledgeRepository\Mysql\assets\image-20240610174000254.png)

## 使用chatgpt做的练习

```sql
CREATE DATABASE chatgpt_practices;
USE chatgpt_practices;
CREATE TABLE students ( student_id INT PRIMARY KEY, student_name VARCHAR ( 50 ), age INT, gender CHAR ( 1 ) );
INSERT INTO students ( student_id, student_name, age, gender )
VALUES
	( 1, 'Alice', 20, 'F' ),
	( 2, 'Bob', 22, 'M' ),
	( 3, 'Charlie', 23, 'M' ),
	( 4, 'Diana', 21, 'F' );
CREATE TABLE courses ( course_id INT PRIMARY KEY, course_name VARCHAR ( 50 ), instructor VARCHAR ( 50 ) );
INSERT INTO courses ( course_id, course_name, instructor )
VALUES
	( 1, 'Mathematics', 'Dr. Smith' ),
	( 2, 'Physics', 'Dr. Johnson' ),
	( 3, 'Chemistry', 'Dr. Lee' );
CREATE TABLE enrollments (
	enrollment_id INT PRIMARY KEY,
	student_id INT,
	course_id INT,
	enrollment_date DATE,
	FOREIGN KEY ( student_id ) REFERENCES students ( student_id ),
	FOREIGN KEY ( course_id ) REFERENCES courses ( course_id ) 
);
INSERT INTO enrollments ( enrollment_id, student_id, course_id, enrollment_date )
VALUES
	( 1, 1, 1, '2023-01-10' ),
	( 2, 2, 2, '2023-02-12' ),
	( 3, 3, 3, '2023-03-15' ),
	( 4, 1, 2, '2023-04-18' ),
	( 5, 2, 3, '2023-05-20' );
```
#### 练习题1：简单的内连接查询

**题目**: 查询所有学生的名字及他们所选的课程名字。


```sql
use chatgpt_practices;

-- 练习题1：简单的内连接查询
-- 题目: 查询所有学生的名字及他们所选的课程名字。
select s.student_name, c.course_name from students as s 
inner join enrollments as e on s.student_id = e.student_id
inner join courses as c on c.course_id = e.course_id;
```

#### 练习题3：带条件的查询

**题目**: 查询选了“Physics”课程的学生名字和选课日期。

```sql
-- 练习题3：带条件的查询
-- 题目: 查询选了“Physics”课程的学生名字和选课日期。
select s.student_name, e.enrollment_date, c.course_name from students as s 
join enrollments as e on e.student_id = s.student_id
join courses as c on c.course_id = e.course_id and c.course_name = 'Physics'; 
```

