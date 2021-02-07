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

// 作业： 扩展一个鲁班英雄，包含 英雄及技能 渲染；