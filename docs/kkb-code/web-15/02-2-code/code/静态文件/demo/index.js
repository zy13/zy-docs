// 分析对象：玩家对象（玩家姓名），英雄，技能，皮肤
// 游戏管理对象
// 亚瑟、鲁班 ---- 类抽象 基类（继承） -->英雄
// 游戏管理 登陆 --》 玩家 --》 英雄 --》皮肤、技能

import Game from './game/game.js'
let game = new Game()

// 登录
document.querySelector('.sub').onclick = function () {
  let username = document.querySelector('.username').value
  game.login(username)
  console.log(game.player)
  document.querySelector('.login').style.display = 'none'
  document.querySelector('.game').style.display = 'block'
  document.querySelector('.chioseusername').innerHTML = username
  renderHeroes(game.player.heros)
}

function renderHeroes(heroes) {
  document.querySelector('.heroView').innerHTML = ''  
  console.log(heroes)
  heroes.forEach(hero => {
    let heroItem = document.createElement('div')
    heroItem.className = 'heroItem'
    heroItem.innerHTML = `<img src="${hero.ico}" />
    <span>${hero.name}</span>`
    document.querySelector('.heroView').appendChild(heroItem)
    heroItem.onclick = function() {
      document.querySelector('.heroShow').innerHTML = `<img src="${hero.ico}" />`
      renderSkills(hero.skills)
    }
  })
}

function renderSkills(skills) {
  document.querySelector(".skillsView").innerHTML = ''
  skills.forEach(skill => {
    let img = new Image()
    img.src = skill.ico
    document.querySelector('.skillsView').appendChild(img)
  })
}

