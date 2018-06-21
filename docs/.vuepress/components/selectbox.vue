<template>
  <div class='dc-select-box' :id='idDefault'>
    <div class='dc-select-container'>
      <div class='dc-sel-val' @click='openOrClose'>
        <span class='dc-inline val'>{{actVal}}</span>
        <span class='dc-inline arrow'></span>
      </div>
      <ul class='dc-sel-box box-show dis'>
        <li v-for='item in dataOption' :class='actVal==item?"active":""' @click='changeVal'>{{typeof item=='object'?item.value:item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  
  export default{
    props: {
      id: {
        type: string,
        defult: ''
      },
      dataOptions: {
        type: Array,
        default () {
          return [
            {
              name: 'sel-1',
              value: 'sel-1'
            }
          ]
        }
      },
      mapValue: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        idDefault: Math.random(),
        actVal: '',
        dataOption: this.dataOptions
      }
    },
    mounted () {
      if (this.dataOptions.length) {
        if (['string', 'number', 'boolean'].includes(typeof this.dataOptions[0])) {
          this.actVal = this.dataOptions[0]
        }
        if (typeof this.dataOptions[0] === 'object') {
          this.ObjToArr(this.dataOptions[0])
          this.normalizeArr()
        }
      }
    },
    methods: {
      openOrClose (e) {
        const $el = $(e.target)
        const $el1 = '.dc-select-box'
        const $el2 = '.dc-sel-box'

        Array.from($($el1)).forEach((v, i) => {
          if ($(v).attr('id').toString() !== this.idDefault.toString()) {
            $(v).find($el2).addClass('dis')
          }
        })

        $($el).parents($el1).find($el2).toggleClass('dis')

        $(document).on('click', (event) => {
          if (!$($el).parents($el1).find($el2).is('.dis')) {
            if (!$(event.target).closest($el1).length) {
              $($el).parents($el1).find($el2).toggleClass('dis')
            }
          }
        })
      },
      changeVal (e) {
        const val = $(e.target).text()
        this.actVal = val
        $(e.target).parents('.dc-sel-box').addClass('dis')
      },
      ObjToArr (obj) {
        const objTemp = obj

        Object.keys(objTemp).map((k, i) => {
          if (typeof k === 'string') {
            this.actVal = objTemp[k]
          }
        })
      },
      normalizeArr () {
        if (this.mapValue.length) {
          this.dataOptions.forEach((v, i) => {
            this.dataOption.push(Object.assign({}, v, {
              value: this.dataOptions[i].mapValue
            }))
          })
        } else {
          this.dataOptions.forEach((v, i) => {
            let value = ''
            Object.keys(v).map((k, j) => {
              if (j === 0) {
                value = k
              }
            })
            this.dataOption.push(Object.assign({}, v, {
              value: value
            }))
          })
        }
        console.log(this.dataOption)
      }
    }
  }
</script>

<style lang="less">
  @sel-box-size: 6px;
  .dc-select-box{
    font-size: 12px;
    vertical-align: top;
    .dc-select-container{
      .dc-sel-val{
        width: 210px;
        border: 1px solid #e5e5e5;
        height: 32px;
        line-height: 32px;
        border-radius: 2px;
        padding: 0 4px;
        &:hover{
          cursor: pointer;
        }
        .val{
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
          width: 90%;
        }
        .arrow{
          float: right;
          width: 0;
          height: 0;
          border-top: @sel-box-size solid #333;
          border-left: @sel-box-size solid transparent;
          border-right: @sel-box-size solid transparent;
          margin-top: 12px;
        }
      }
      ul.dc-sel-box{
        width: 218px;
        border: 1px solid #e5e5e5;
        border-top: 0;
        &.dis{
          display: none;
        }
        li{
          line-height: 28px;
          padding: 0 4px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: keep-all;
          width: 90%;
          &:hover{
            cursor: pointer;
          }
          &.active{
            background-color: #e5e5e5;
          }
        }
      }
    }
  }
</style>