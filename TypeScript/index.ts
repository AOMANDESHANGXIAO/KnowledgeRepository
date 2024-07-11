/**
 * TypeScript类
 * class的基本用法 继承、类型约束 implements关键字
 * 修饰符 readonly private protected public static
 * get set
 */

interface Options {
  el: string | HTMLElement
}

interface VueCls {
  options: Options
  init(): void
}

interface Vnode {
  tag: string
  text?: string
  children?: Vnode[]
}

// 虚拟 dom 简单版
class Dom {
  // 创建元素
  /* 私有的，不允许外部调用， 只允许在父类本身使用，不允许子类的外部调用 */
  private createElement(el: string) {
    return document.createElement(el)
  }
  // 填充文本
  /* 受保护的，不允许外部调用，但是允许子类使用 */
  protected setText(el: HTMLElement, text: string) {
    el.textContent = text
  }
  // 渲染函数
  /* 公共的，外部自身子类都可以用，所有方法默认都是public */
  public render(data: Vnode) {
    let root = this.createElement(data.tag)
    if (data.children && Array.isArray(data.children)) {
      data.children.forEach((item: Vnode) => {
       let child = this.render(item)
       root.appendChild(child)
      })
    } else {
      this.setText(root, data.text || '')
    }

    return root
  }
}

/* implemets关键字为类添加约束 */
class Vue extends Dom implements VueCls {
  options: Options
  constructor(options: Options) {
    super() // 原理就是调用父类的prototype.constructor.call()
    this.options = options
    this.init()
  }
  static xxx() {
    return 'xxx'
  }
  /* 静态方法，只能在类本身调用 */
  static version(){
    /* 静态方法中的this只能指向类本身，也就是说通过构造函数生成的实例，无法访问到 */
    this.xxx()
    return '1.0.0'
  }

  public init(): void {
    // 虚拟dom，就是使用js 渲染的dom
    let data: Vnode = {
      tag: 'div',
      text: 'hello world',
      children: [
        {
          tag: 'p',
          text: '子节点1',
          children: [
            {
              tag: 'span',
              text: '子节点1-1',
            },
          ],
        },
        {
          tag: 'section',
          text: '子节点2',
        },
      ],
    }
    this.render(data)
    let app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el
    if(app!==null) {
      app.appendChild(this.render(data))
    } else {
      throw new Error('el 不存在')
    }
  }
}

new Vue({
  el: '#app',
})

class Ref {
  _value: any
  constructor(value: any) {
    this._value = value
  }
  /* 和Object.defineProperty一样，可以实现get set */
  get value() {
    return this._value + 'value'
  }
  set value(newValue) {
    this._value = newValue + 'value'
  }
}

const ref = new Ref("hello")
ref.value = "world"
console.log(ref.value)