## 约束

概念: 约束是作用与表中字段的规则，用于限制存储在表中的数据

目的: 保证数据库中数据的正确，有效性和完整性

分类：

| 约束                   | 描述                                                     | 关键字                                |
| ---------------------- | -------------------------------------------------------- | ------------------------------------- |
| 非空约束               | 限制该字段的数据不能为null                               | NOT NULL                              |
| 唯一约束               | 保证该字段的所有数据都是唯一的、不重复的                 | UNIQUE                                |
| 主键约束               | 主键是一行数据的唯一标识，要求非空且唯一                 | PRIMARY KEY，AUTO_INCREMENT(自动增长) |
| 默认约束               | 保存数据时，如果未指定该字段的值，则采用默认值           | DEFAULT                               |
| 检查约束(mysql,8.0.16) | 保证字段值满足某一条件                                   | CHECK                                 |
| 外键约束               | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | FOREIGN KEY                           |

**例子**

```sql
CREATE TABLE test_user (
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR ( 10 ) NOT NULL UNIQUE,
	age TINYINT UNSIGNED,
	STATUS CHAR ( 1 ) DEFAULT '1',
gender CHAR ( 1 ) 
);
```

如果要保证数据的一致性和完整性，则要保证外键约束和关联。

**添加外键**

```sql
create table 表名(
	字段名 数据类型,
	...
	[constraint] [外键名称] foreign key (外键字段名) references 主表 (主表列名)
);
alter table 表名 add constraint 外键名称 foreign key (外键字段名) references 主表 (主表列名);
```

**删除外键**

```sql
alter table 表名 drop foreign key 外键名称;
```

**示范**

在创建表时创建外键

```sql
CREATE TABLE classes ( class_id INT PRIMARY KEY auto_increment, class_name VARCHAR ( 10 ) NOT NULL );
CREATE TABLE students (
	student_id INT PRIMARY KEY auto_increment,
	NAME VARCHAR ( 10 ) NOT NULL,
	class_id INT,
CONSTRAINT fk_student_class FOREIGN KEY ( class_id ) REFERENCES classes ( class_id ) 
);
```

**外键约束行为**

| 行为        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| NO ACTION   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有旧不允许删除/更新。(与RESTRICT一致) |
| RESTRICT    | ...                                                          |
| CASCADE     | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则删除/更新外键在子表中的记录 |
| SET NULL    | 当在父表中删除对应记录时，首先检查该记录是否有对应的外键，如果有则设置子表中该外键值为null。要求该外键允许取NULL。 |
| SET DEFAULT | 父表有更改时，子表将外键列设置成一个默认的值(Innodb不支持)。 |

**语法**

```sql
ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES 主表名 (主表字段名) ON UPDATE CASCADE ON DELETE CASCADE;
```

