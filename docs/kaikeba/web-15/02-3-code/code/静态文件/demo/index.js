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

document.querySelector(".heroBtn").onclick = function(){
  document.querySelector(".heroContainer").style.display = "block";
  document.querySelector(".skinContainer").style.display = "none";
}

document.querySelector(".skinBtn").onclick = function(){
  document.querySelector(".heroContainer").style.display = "none";
  document.querySelector(".skinContainer").style.display = "block";
}

document.querySelector('.backLogin').onclick  = function() {
  document.querySelector('.login').style.display = 'block'
  document.querySelector('.game').style.display = 'none'
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
    renderSkins(hero.skins)
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

//今天内容： 1.扩展皮肤  
function renderSkins(skins) {
  document.querySelector('.skinView').innerHTML = ''
  skins.forEach(skin => {
    let div = document.createElement('div')
    div.className = 'skinItem'
    div.innerHTML = ` <img src="${skin.ico}" />
    <span>${skin.name}</span>`
    document.querySelector('.skinView').appendChild(div)
    div.onclick = function() {
      document.querySelector('.skinShow').innerHTML = `<img src="${skin.img}" alt="">`
    }
  })
}