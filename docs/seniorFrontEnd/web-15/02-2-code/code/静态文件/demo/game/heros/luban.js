import S1 from '../skills/s1.js'
import S2 from '../skills/s2.js'
import S3 from '../skills/s3.js'

export default class Luban{
  constructor() {
    this.name = '鲁班'
    this.ico = './sources/heroes/luban1.png'
    this.skills = [new S1(), new S2(), new S3()]
  }
}