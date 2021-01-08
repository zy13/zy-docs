<template>
  <div>
    <div class="wrap">
      <!-- <h2>员工列表</h2> -->
      <div>
        <div class="age_sort" @click="ageSort">
          <a :data-type="0">年龄从小到大</a>
          <a :data-type="1">年龄从大到小</a>
          <a :data-type="2" class="active">默认排序</a>
        </div>
        <div class="gender_show" @click="genderFilter">
          <a :data-type="0">只显示男性</a>
          <a :data-type="1">只显示女性</a>
          <a :data-type="2" class="active">默认</a>
        </div>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th>id</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in renderList.length ? renderList : list" :key="item.id">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
            <td>{{item.gender}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ageIndex: 2,
      genderIndex: 2,
      list: [
        {
          id: 1,
          name: '小明',
          age: 24,
          gender: '男'
        },
        {
          id: 2,
          name: '小芳',
          age: 30,
          gender: '女'
        },
        {
          id: 3,
          name: '小美',
          age: 31,
          gender: '女'
        },
        {
          id: 4,
          name: '小刚',
          age: 21,
          gender: '男'
        },
        {
          id: 5,
          name: '小琪',
          age: 18,
          gender: '女'
        }
      ],
      sortArr: [
        list => list.map(item => item).sort((r1, r2) => r1.age - r2.age),
        list => list.map(item => item).sort((r1, r2) => r2.age - r1.age),
        list => list
      ],
      genderArr: [
        list => list.filter(item => item.gender === '男'),
        list => list.filter(item => item.gender === '女'),
        list => list
      ],
      renderList: []
    }
  },
  methods: {
    ageSort(e) {
      let idx = e.target.dataset.type
      let ageBtns = document.querySelectorAll('.age_sort a')
      ageBtns.forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      this.ageIndex = idx
      let resData = this.genderArr[this.genderIndex](this.list)
      this.renderList = this.sortArr[idx](resData)
    },
    genderFilter(e) {
      let idx = e.target.dataset.type
      let ageBtns = document.querySelectorAll('.gender_show a')
      ageBtns.forEach(item => {
        item.classList.remove('active')
      })
      e.target.classList.add('active')
      this.genderIndex = idx
      let resData = this.sortArr[this.ageIndex](this.list)
      this.renderList = this.genderArr[idx](resData)
    }
  }
}
</script>

<style lang="less">
  .wrap{
    a{
      color: #333;
      padding: 0 8px 18px 0;
      line-height: 30px;
      &.active{
        color: green;
      }
      cursor: pointer;
    }
  }
</style>