# DDL语句

DDL语句就是对数据进行定义的语言。如数据库，表和字段。

## 数据库DDL操作

> [XXX]表示参数。

```sql
SHOW DATABASES; /*查询所有数据库*/
SELECT DATABASE(); /*查询当前所处的数据库*/
CREATE DATABASE [database name]; /*创建数据库*/
CREATE DATABASE IF NOT EXISTS [database name]; /*如果数据库不存在则创建*/
CREATE DATABASE IF NOT EXISTS [database name] DEFAULT CHARSET [字符集] COLLATE [排序规则]; /*创建数据库时指定字符集和排序规则*/
DROP DATABASE IF EXISTS [database name];/*删除数据库*/
USE [database name];/*使用数据库*/
```

创建数据库的默认字符集最好为`utf8mb4`，因为`utf`会导致有些汉字存不了。

## 表DDL操作

### 创建和展示表的语法, []表示可选。

```sql
SHOW TABLES;/*查询所有表，前提是进入数据库*/
CREATE TABLE 表名(字段1 字段1类型[COMMENT 字段1注释],字段2 字段2类型[COMMENT 字段2注释])[COMMENT 表的注释]; /*创建一张表*/
DESC 表名; /*查询表结构*/
SHOW CREATE TABLE 表名; /*获取创建表的语句*/
```

创建表示例

```sql
USE codecat;
CREATE TABLE test_table ( NAME VARCHAR ( 50 ) COMMENT '名字', age INTEGER COMMENT '年龄' ) COMMENT '测试表'; /*varchart要指定长度*/
```

MySQL的数据类型
常用的数据类型有：

- 整型（xxxint）/*tinyint,samllint,mediumint,int,integer,bigint*/
- 位类型(bit)
- 浮点型（float和double、real）
- 定点数（decimal,numeric）
- 日期时间类型（date,time,datetime,year）
- 字符串（char,varchar,xxxtext）/*char是固定的长度，varchar表示不固定，但是有最长的长度*/
- 二进制数据（xxxBlob、xxbinary）
- 枚举（enum）
-  集合（set）

**创建一张表练习**

```sql
CREATE TABLE employee
(id int unsigned comment '员工编号',
job_number varchar(10) comment '工号',
 name varchar(10) comment '姓名',
 gender char(1) comment '性别',
 age tinyint unsigned comment '年龄',
 id_card char(18) comment '身份证号',
 hire_date date comment '入职时间'
)comment '员工信息表'
```

### 修改表

```sql
ALTER TABLE 表名 ADD 字段名 类型(长度) [comment 注释];/*增添字段*/
ALTER TABLE 表名 MODIFY 字段名 新数据类型(长度); /*修改字段的类型*/
ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型(长度) [COMMENT 注释] [约束]; /*修改字段的名称和属性*/
ALTER TABLE 表名 DROP 字段名; /*删除字段*/
ALTER TABLE 表名 RENAME TO 新的表名; /*修改表名*/
DROP TABLE [IF EXISTS] 表名; /*删除表*/
TRUNCATE TABLE 表名;/*删除表重新见表*/ 
```

