### 目标
-	掌握组件的通信方式
-	掌握 vuex 的使用

## 1、组件通信

通信的本质就是数据共享，组件间能够进行数据交互：
- 父子组件通信
- 多层级父子组件通信
- 非关系组件通信

###	父子组件间的通信

- **（1）`props/$emit`**（推荐）<br>
  - `props: parent -> child`
  - `$emit: child -> parant`
  - 解耦度高
  ```html
    // Home.vue
    <template>
      <div class="home">
        <h1>home page</h1>
        <div>get emit data from child: <span v-show="childData">{{childData}}</span></div>
        <br>
        <HomeChild title="home" @getChildData="getChildData"></HomeChild>    
      </div>
    </template>

    <script>
    // @ is an alias to /src
    import HomeChild from '@/components/HomeChild.vue'

    export default {
      name: 'Home',
      components: {
        HomeChild
      },
      data() {
        return {
          childData: ''
        }
      },
      methods: {
        getChildData(txt) {
          this.childData = txt
          console.log(txt);
        }
      },
    }
    </script>  
  ```

  ```html
  // HomeChild.vue
  <template>
    <div>
      <h2>child-component</h2>
      props data : <strong>{{title}}</strong>
      <div @click="handleClick"><button>$emit</button></div>
    </div>
  </template>
  <script>
  export default {
    props: ['title'],
    methods: {
      handleClick() {
        let rendomDatas = [
          'my data is getting from child',
          'data get from home child',
          'my name is homechild'
        ]
        this.$emit('getChildData', rendomDatas[Math.floor(Math.random()*rendomDatas.length)])
      }
    },
  }
  </script>  
  ```

- **（2）`$refs/ref`**<br>
  - `ref`：给元素或子组件**注册引用信息**
  - `$refs`：获取通过 ref 注册的引用
  - 不同情况获取到的引用信息不一样：
    - 挂载到自定义组件：获取当前VueComponent的实例；
    - 挂载到普通元素，获取原生元素的实例
  ```html
  // About.vue
  <template>
    <div class="about">
      <h1>This is an about page</h1>
      <button @click="sayHi">say hi to aboutChild</button> <span>:{{txt}}</span>
      <AboutChild ref="aboutChild"></AboutChild>
    </div>
  </template>

  <script>
  import AboutChild from '@/components/AboutChild.vue'
  export default {
    components: {
      AboutChild,
    },
    data() {
      return {
        txt: ''
      }
    },
    methods: {
      sayHi() {
        const { aboutChild } = this.$refs
        console.log(aboutChild);
        aboutChild.sayHello()
        this.txt = aboutChild.txt
      }
    },
  }
  </script>
  ```
  ```html
  // AboutChild.vue
  <template>
    <div>
      <h2>About-child</h2>
      <div>。。。</div>
      <button @click="handleChange">change</button>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
        txt: 'hello about'
      }
    },
    methods: {
      sayHello() {
        console.log(this.txt);
      },
      handleChange() {
        this.txt = 'hi about'
        console.log(this);
      }
    },
  }
  </script>
  ```
  
-	**（3）`$parent/$children`**（组件复杂多变情况下不推荐）<br>
    - `$parent`：获取当前组件的父组件实例
    - `$children`：获取当前组件的所有子组件实例
    - 强依赖，脆弱，容错性差。
    ```html
    // Parent.vue
    <template>
      <div>
        <h1>This is a Parent Page</h1>
        <button @click="handleClick">get Child</button><span>{{txt}}</span>
        <ParentChild></ParentChild>
      </div>
    </template>
    <script>
    import ParentChild from '@/components/ParentChild.vue'
    export default {
      components: {
        ParentChild,
      },
      data() {
        return {
          txt: ''
        }
      },
      methods: {
        handleClick() {
          this.txt = this.$children[0].txt
        },
        changeTxt() {
          this.txt = 'change from child'
        }
      },
    }
    </script>
    ```
    ```html
    // ParentChild.vue
    <template>
      <div>
        <h2>parent--child</h2>
        <button @click="handleChange">change</button>
      </div>
    </template>
    <script>
    export default {
      data() {
        return {
          txt: 'hello parent'
        }
      },
      methods: {
        handleChange() {
          this.$parent.changeTxt()
        }
      },
    }
    </script>
    ```

###	多层级父子组件间的通信

####	provide/inject：依赖注入

[依赖注入](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E4%BE%9D%E8%B5%96%E6%B3%A8%E5%85%A5)是单向数据流，只能父组件给子孙组件传递数据，
[`provide/inject`](https://cn.vuejs.org/v2/api/#provide-inject)这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效

- `provide` 提供
  - 父组件提供给子孙组件要使用的数据
  - 形式: 对象、函数
```js
// 写法一：this指向provide
provide: {
  compATitle: 'a----',
  compA: this
}
// 写法二：this指向调用的对象
provide ()  {
  return {
    compATitle: 'a----',
    compA: this
  }
}
```

- `inject` 注入
  - 父组件通过`provide`提供数据，所有子组件都可以通过`inject`获取值
  - 形式：字符串数组、对象（from、default）
  ```js
  inject: ['compATitle', 'compA']
  ```

####	$attrs/$listeners

- 子组件搭配 `inheritAttrs: false `使用

-	`$attrs`：通信的本质

  包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)

  当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件

- `$listeners`
  
  - 包含了父作用域中的 (不含 .native 修饰器的) `v-on` 事件监听器
  - 它可以通过 `v-on="$listeners"` 传入内部组件
  - 一般运用与组件库的逻辑，普通的业务逻辑不需要用到


###	非关系组件通信


- [`EventBus`](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95-%E4%BA%8B%E4%BB%B6)：Vue的实例对象
  - $on
  - $off
  - $emit
  - $once

## 2、vuex

### 概念

- **what（是什么）?**<br>
  Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**

- **why（解决什么问题）？**
  -	多个视图依赖于同一状态
  -	来自不同视图的行为需要变更同一状态

- **How（怎么做）？**<br>
  把组件的共享状态抽取出来，以一个全局单例模式管理

- **好处？**<br>
	我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！
	
  通过定义和隔离状态管理中的各种概念，并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。

- **什么时候用**？<br>
	Flux 架构就像眼镜：您自会知道什么时候需要它。

### 安装

`npm install vuex --save`

## 3、全局状态 state

在 vue 组件中获取**计算属性**和**mapState**

### mapState
- 动机<br>
	当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。
- 形式<br>
  对象、数组
- 与局部计算属性混合使用<br>
  展开运算符

## 4、getter

### 概述

- 动机<br>
  需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
  
  如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想

- 和计算属性一样，会缓存

### 使用

- 通过属性访问<br>
  store.getters.xxx

- 通过函数访问<br>
  返回一个函数，来实现给 getter 传参

- mapGetters<br>
  将 store 中的 getter 映射到局部计算属性  

## 5、mutation

###	概述

- 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
-	必须是同步的<br>
	方便追踪状态的改变

###	使用
- 调用<br>
  `store.commit("")`
- 提交负荷<br>
  传参
- mapMutation<br>
  扩展到 methods


## 6、action
###	概述
-  异步操作解决方案
-  提交的是 mutation，而不是直接变更状态
 - 可以包含任意异步操作
###	使用
- store.dispatch
- mapActions: 扩展到 methods
- 组合 Action: 可返回 promise
