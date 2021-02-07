// 组织所有和节点操作有关系的内容
// 分析对象  --》抽象 ---》类 --》实例化 逻辑关系处理

// 分析对象 ：玩家对象（玩家姓名）、英雄 、技能、皮肤 ；
// 游戏管理对象
//  亚瑟 、 鲁班 。。。 --类抽象 基类（继承） -->英雄

// 游戏管理 登录 ---》  玩家 ---》英雄 --》皮肤、技能 


/* game {
    login(){
        player:{
            heroes:[{
                yase :{
                    skins:[....],
                    skills:[....]
                },
                luban :{
                    skins:[....],
                    skills:[....]
                }
                ...
            }]
        }
    }
} */

import Game from './game/game.js';
let game = new Game();
// game.login("张三");
// console.log(game);
// game.login


document.querySelector(".sub").onclick = function(){
    let username = document.querySelector(".username").value;
    game.login(username);
    console.log(game);
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    document.querySelector(".chioseusername").innerHTML = username;
    renderHeroes(game.player.heroes);
}

function renderHeroes(heroes){
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach(hero=>{
        let heroItem = document.createElement("div");
        heroItem.classList.add("heroItem");
        heroItem.innerHTML = ` <img src="${hero.ico}" />
        <span>${hero.name}</span>`;
        document.querySelector(".heroView").appendChild(heroItem);
        heroItem.onclick = function(){
            document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`
            // console.log(hero)
            renderSkills(hero.skills);
            renderSkins(hero.skins);
        }
    })
}
function renderSkills(skills){
    document.querySelector(".skillsView").innerHTML = "";
    skills.forEach(skill=>{
        let img = new Image();
        img.src = skill.ico;
        document.querySelector(".skillsView").appendChild(img);
    })
}

function renderSkins(skins){
    document.querySelector(".skinView").innerHTML = "";
    skins.forEach(skin=>{
        let div = document.createElement("div");
        div.classList.add("skinItem");
        div.innerHTML = ` <img src="${skin.ico}" />
        <span>${skin.name}</span>`;
        document.querySelector(".skinView").appendChild(div);
        div.onclick = function(){
            document.querySelector(".skinShow").innerHTML = `<img src="${skin.img}" />`;
        }
    })
}


// 作业： 扩展一个鲁班英雄，包含 英雄及技能 渲染；

document.querySelector(".heroBtn").onclick = function(){
    document.querySelector(".heroContainer").style.display = "block";
    document.querySelector(".skinContainer").style.display = "none";
}

document.querySelector(".skinBtn").onclick = function(){
    document.querySelector(".heroContainer").style.display = "none";
    document.querySelector(".skinContainer").style.display = "block";
}



//今天内容： 1.扩展皮肤   2. 抽象基类 3. 常见设计模式
// 设计原则 solid；  单例 、通用单例模式 、一个弹框例子
// 装饰者模式（扩展） ：和继承区别 装饰者链  观察者模式 1解耦2惰性执行； 


// 设计模式 
// 函数 类 组件 ---》 代码复用
// 设计模式 ---》经验复用（解决方案）--》提高复用性可维护性 。。。
// 1.设计：设计原则  2.模式 ：设计模式
// 状态共享---》多组件状态统一管理；
// 高内聚 ，低耦合
// let obj = {

// }

// ex



