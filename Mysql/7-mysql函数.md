# 函数

是指可以直接被另一段程序调用的程序或者代码。

## 字符串函数

| 函数                           | 功能                                  |
| ------------------------------ | ------------------------------------- |
| concat(s1,s2)                  | 字符串拼接                            |
| lower(str)                     | 转小写                                |
| upper(str)                     | 转大写                                |
| lpad(str, length, char)        | 使用char填充str到length长度，左侧填充 |
| rpad(str, length, char)        | 使用char填充str到length长度，右侧填充 |
| substring(str， index, length) | 对str开始从index处截取length个字符    |
| trim(str)                      | 去除两端的空格                        |

**使用示范**

```sql
-- 拼接
select concat('hello', 'worrld');
-- 转小写
select LOWER('HeWorld');
-- 转大写
select UPPER('abcd');
-- 填充左侧字符
select LPAD('a', 5, '-');
-- 填充右侧字符
select RPAD('a', 5, '-');
-- 去除两端空格
select trim('  abd  ');
-- 字符串截取
select substring('HelloWOrld', 1, 5);
```

## 数值函数

| 函数       | 功能                               |
| ---------- | ---------------------------------- |
| ceil(x)    | 向上取整                           |
| floor(x)   | 向下取整                           |
| mod(x,y)   | 返回x/y的模                        |
| rand()     | 返回0~1内的随机数                  |
| round(x,y) | 求参数x的四舍五入的值，保留y位小数 |

## 日期函数

| 函数                              | 功能                                       |
| --------------------------------- | ------------------------------------------ |
| curdate()                         | 返回当前日期                               |
| curtime()                         | 返回当前时间                               |
| now()                             | 返回当前日期和时间                         |
| year(date)                        | 返回指定date的年份                         |
| mouth(date)                       | 返回指定date的月份                         |
| day(date)                         | 获取指定date的日期                         |
| day_add(date, interval_expr type) | 返回一个日期或时间间隔expr后的时间值       |
| datediff(date1, date2)            | 返回起始时间date1和结束时间date2之间的天数 |

