import S1 from '../skills/s1.js'
import S2 from '../skills/s2.js'
import S3 from '../skills/s3.js'

export default class Yase{
  constructor() {
    this.name = '亚瑟'
    this.ico = './sources/heroes/yase1.png'
    this.skills = [new S1(), new S2(), new S3()]
  }
}