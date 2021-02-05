import Yase from './heroes/yase.js';

export default class Player{
    constructor(username){
        this.username = username;
        this.heroes = [new Yase()];
    }
}