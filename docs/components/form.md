# form

## 复选框

<checkbox></checkbox>

* html

```html
<div class="kw-checkox">
  <input type="checkbox" id="filter">
  <label for="filter"></label>
  <span>我是美颜过的复选框</span>
</div>
```

* less
```less
.kw-checkox {
  input[type="checkbox"] {
    display: none;
    &+label {
      top: 3px;
      width: 14px;
      height: 14px;
      cursor: pointer;
      display: inline-block;
      position: relative;
      margin-left: 14px;
      border: 1px solid #ccc;
      top: 3px;
    }
    &:checked+label {
      border: 1px solid #4496f9;
      background-color: #4496f9;
      &:after {
        content: '';
        width: 7px;
        height: 4px;
        position: absolute;
        top: 3px;
        left: 3px;
        border: 2px solid #fff;
        border-top: none;
        border-right: none;
        
        opacity: 0.4;
        transform: rotate(-45deg);
        opacity: 1;
        border-top: none;
        border-right: none;
      }
    }
  }
  span{
    font-size: 14px;
    padding-left: 4px;
  }
}
```

## 单选框

<radiobox labelTxt='我是1号'></radiobox>
<radiobox labelTxt='我是2号'></radiobox>

* html
```html
<div class='dc-input-radio'>
  <input type="radio" name="radio" :id='"radio"+labelTxt'>
  <label :for='"radio"+labelTxt'></label>
  <span>{{labelTxt}}</span>
</div>
```

* less
```less
.dc-input-radio{
  input[type='radio'] {
    display: none;
    &+label{
      width: 18px;
      height: 18px;
      border: 1px solid #ddd;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      display:inline-block;
      position: relative;
      top: 5px;
      -moz-box-shadow:1px 1px 1px #fff inset; /* For Firefox3.6+ */
      -webkit-box-shadow:1px 1px 1px #fff inset; /* For Chrome5+, Safari5+ */
      box-shadow:1px 1px 1px #fff inset; /* For Latest Opera */
    }
    &:checked+label:after{
      content: '';
      width: 12px;
      height: 12px;
      position: absolute;
      top: 3px;
      left: 3px;
      background: #293D97;
      border-radius: 50%;
    }
  }
  >span{
    padding-left: 10px;
    font-size: 14px;
  }
}
```

## 下拉框

<selectbox></selectbox>