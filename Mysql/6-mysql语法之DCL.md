# 控制权限 DCL，data control language

## 1. 查询用户

```sql
USE mysql；
SELECT * FROM user;
```

## 2. 创建用户

```SQL
CREATE USER 用户名@访问地址 IDENTIFIED BY 密码; /* 创建一个用户，指定用户名，访问地址以及密码*/
-- 示范
create user 'testUser'@'localhost' identified by '123456'; -- 用户只能在当前主机登录
create user 'testUser'@'%' identified by '123456'; --用户可以在任意主机上登录，通配符%
-- 示范结束
alter user '用户名'@'主机号' identified with mysql_native_password by '新密码'; --修改密码
drop user'用户名'@'主机号'; -- 删除用户
```

## 3. 权限控制

| 权限                | 说明               |
| ------------------- | ------------------ |
| ALL, ALL PRIVILEGES | 所有权限           |
| SELECT              | 查询               |
| INSERT              | 插入               |
| UPDATE              | 更新               |
| DELETE              | 删除               |
| ALTER               | 修改表             |
| DROP                | 删除数据库/表/视图 |
| CREATE              | 创建数据库/表      |

```sql
show grants for '用户名'@'主机名'; /* 查询权限 */
grant 权限列表 on 数据库名.表名 to '用户名'@'主机名' /* 授予权限 */
revoke 权限列表 on 数据库名.表名 from '用户名'@'主机名' /* 撤销权限 */ 
```

