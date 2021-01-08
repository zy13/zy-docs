<template>
  <div>
    <!-- <h2>百度音乐榜单</h2> -->
    <div>
      <ul>
        <li v-for="item in list" :key="item.id">
          <input type="checkbox" class="check" :checked="item.checked" @click="clickEvent(item, 'check')">
          <span>{{item.title}}</span>
          <a :class="item.collect?'cancelCollect':'collect'" @click="clickEvent(item, item.collect?'cancelCollect':'collect')">{{item.collect?'取消收藏':'收藏'}}</a>
          <a class="remove" @click="clickEvent(item, 'remove')">删除</a>
        </li>
      </ul>
      <footer>
        <label>
          <input type="checkbox" id="checkAll" @click="checkAll">
          全选/全不选
        </label>
        <a id="remove" @click="remove"> 删除</a>
        <input type="text" id="newInfo" v-model="inputValue">
        <a id="add" @click="add">添加</a>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
     list: [
        {
        id: 1,
        title: "残酷月光 - 费启鸣",
        checked: false,
        collect: true
      }, {
        id: 2,
        title: "兄弟 - 艾热",
        checked: true,
        collect: false
      }, {
        id: 3,
        title: "毕生 - 夏增祥",
        checked: true,
        collect: true
      }, {
        id: 4,
        title: "公子向北去 - 李春花",
        checked: false,
        collect: false
      }, {
        id: 5,
        title: "战场 - 沙漠五子",
        checked: true,
        collect: false //是否收藏 true 收藏 false 没有收藏
      }
     ]
    }
  },
  methods: {
    clickEvent(item, className) {
      switch(className) {
        case 'check':
          item.checked = !item.checked
          break
        case 'collect':
          item.collect = true
          break
        case 'cancelCollect':
          item.collect = false
          break
        case 'remove':
          this.list.splice(this.list.indexOf(item), 1)
          break
      }
    },
    checkAll(e) {
      this.list = this.list.map(item => {
        item.checked = e.target.checked
        return item
      })
    },
    remove() {
      this.list = this.list.filter(item => !item.checked)
    },
    add() {
      if(this.inputValue) {
        this.list.push({
          id: this.list.length + 1,
          title: this.inputValue,
          checked: false,
          collect: false
        })
      }
    }
  }
}
</script>

<style lang="less">
  li a, footer a{
    padding: 0 10px;
    cursor:pointer;
  }
</style>
