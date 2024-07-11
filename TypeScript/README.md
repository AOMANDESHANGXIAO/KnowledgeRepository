## 命令
观测ts文件是否变化
``` bash
tsc --w
```
创建ts配置文件
``` bash
tsc --init
```

## 顶级类型
1. top type => any unknown
2. Object # 构造类型
3. Number String Boolean # 构造类型
4. number string boolean object # 原始类型, 可以用于泛型约束

unknown 只能赋值给自身，或者是any。
没有办法读任何属性，方法也不可以调用。
any 被any，自身，以及其他所有类型赋值

## Interface

必须定义的一模一样，不能多属性也不能少属性
遇到同名的interface，会合并.
interface可以继承，定义只读类型，定义索引签名，定义函数类型。
``` ts
/*
 * @Author       : ridiculous adventurer
 * @Version      : V1.0
 * @Date         : 2024-07-11 17:30:20
 * @Description  :
 */
interface Person {
  name: string
  age: number
  readonly id: number /* 只读 */
  [propName: string]: any /* 索引签名， 可以让任何属性都可以赋值 */
}

/**
 * 重名合并
 */

interface Person {
  sex: string
}

interface Man extends Person {
  /* 接口继承 */ attck: number
}

const person: Person = {
  id: 1,
  name: 'adventurer',
  age: 22,
  sex: 'male',
  address: 'shenzhen',
}

const man: Man = {
  id: 1,
  name: 'adventurer',
  sex: 'male',
  age: 22,
  attck: 100,
}

/**
 * 定义函数类型
 */

interface Fn {
  (name: string): number[]
}

const fn: Fn = (name: string) => [1, 2, 3]

```


