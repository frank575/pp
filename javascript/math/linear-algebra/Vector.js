export class Vector {
  constructor(v) {
    this._v = v
  }

  // 取得任一維度的值
  getitem(i) {
    return this._v[i]
  }

  // 返回向量維度
  len() {
    return this._v.length
  }

  toString() {
    return `{${this._v.join(', ')}}`
  }

  // 創建n維零向量
  static zero(n) {
    return new Vector(Array.from(new Array(n), () => 0))
  }

  // 返回向量模(長度) ||U||
  norm() {
    return Math.sqrt(this._v.reduce((p, e) => p + e ** 2, 0))
  }

  // 返回單位向量 (uni vector)
  // U hat = 1 / ||U|| * U = (U1 / ||U||, Un / ||U||)
  // 單位向量的長永遠為 1，所以只關注在方向
  // 根據模取U hat，該行為又稱規範化(normalize)
  // 指向坐標軸的正方向單位向量又稱"標準單位向量(Standard Unit Vector)"用小e表示
  // -e1=(1, 0) -e2=(0, 1), -en=(0, 0, ..., 1)
  normalize() {
    const norm = this.norm()
    if (norm === 0) {
      return console.error('norm為0')
    }
    return new Vector(this._v.map(e => e / norm))
  }

  // 向量加法
  add(vec) {
    if (vec.len() !== this.len()) {
      return console.error('向量維度不一致')
    }
    this._v = this._v.map((e, i) => e + vec.getitem(i))
  }

  // 向量減法
  sub(vec) {
    if (vec.len() !== this.len()) {
      return console.error('向量維度不一致')
    }
    this._v = this._v.map((e, i) => e - vec.getitem(i))
  }

  // 向量乘法
  mul(n) {
    this._v = this._v.map((e, i) => e * n)
  }

  // 點乘又稱內積
  // sum(un * vn) === ||u|| * ||v|| * cosθ (轉成同方向乘積)
  dot(vec) {
    if (vec.len() !== this.len()) {
      return console.error('向量維度不一致')
    }
    let sum = 0
    for (let i = 0; i < this.len(); i++) {
      sum += this.getitem(i) * vec.getitem(i)
    }
    return sum
    /*
      點乘在幾何學的重要應用
      1 取夾角方向, 2 推薦算法, 3 幾何計算
      cosθ = U * V / ||U|| * ||V||
        如果 θ, U * V = 0: 表示兩個向量垂直
        **					 > 0: 表示兩個向量為銳角  /_
        **					 < 0: 表示兩個向量為鈍角  \_
     */
  }
}
