/**
 * TypeScript类
 * class的基本用法 继承、类型约束 implements关键字
 * 修饰符 readonly private protected public static
 * get set
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 虚拟 dom 简单版
var Dom = /** @class */ (function () {
    function Dom() {
    }
    // 创建元素
    /* 私有的，不允许外部调用， 只允许在父类本身使用，不允许子类的外部调用 */
    Dom.prototype.createElement = function (el) {
        return document.createElement(el);
    };
    // 填充文本
    /* 受保护的，不允许外部调用，但是允许子类使用 */
    Dom.prototype.setText = function (el, text) {
        el.textContent = text;
    };
    // 渲染函数
    /* 公共的，外部自身子类都可以用，所有方法默认都是public */
    Dom.prototype.render = function (data) {
        var _this = this;
        var root = this.createElement(data.tag);
        if (data.children && Array.isArray(data.children)) {
            data.children.forEach(function (item) {
                var child = _this.render(item);
                root.appendChild(child);
            });
        }
        else {
            this.setText(root, data.text || '');
        }
        return root;
    };
    return Dom;
}());
/* implemets关键字为类添加约束 */
var Vue = /** @class */ (function (_super) {
    __extends(Vue, _super);
    function Vue(options) {
        var _this = _super.call(this) || this; // 原理就是调用父类的prototype.constructor.call()
        _this.options = options;
        _this.init();
        return _this;
    }
    Vue.xxx = function () {
        return 'xxx';
    };
    /* 静态方法，只能在类本身调用 */
    Vue.version = function () {
        /* 静态方法中的this只能指向类本身，也就是说通过构造函数生成的实例，无法访问到 */
        this.xxx();
        return '1.0.0';
    };
    Vue.prototype.init = function () {
        // 虚拟dom，就是使用js 渲染的dom
        var data = {
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
        };
        this.render(data);
        var app = typeof this.options.el === 'string' ? document.querySelector(this.options.el) : this.options.el;
        if (app !== null) {
            app.appendChild(this.render(data));
        }
        else {
            throw new Error('el 不存在');
        }
    };
    return Vue;
}(Dom));
new Vue({
    el: '#app',
});
var Ref = /** @class */ (function () {
    function Ref(value) {
        this._value = value;
    }
    Object.defineProperty(Ref.prototype, "value", {
        /* 和Object.defineProperty一样，可以实现get set */
        get: function () {
            return this._value + 'value';
        },
        set: function (newValue) {
            this._value = newValue + 'value';
        },
        enumerable: false,
        configurable: true
    });
    return Ref;
}());
var ref = new Ref("hello");
ref.value = "world";
console.log(ref.value);
