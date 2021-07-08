import { Vector } from './Vector'

;`
矩陣行數=列數 -> 方陣
通常用A(大a)表示矩陣

A = | a11, a12, a13, a1n... | aij 第i行第j列
		|	a21, a22, a23, a2n... |
		| ...  								  |
		|	an1, an2, an3, ann... |
`

export class Matrix {
  constructor (list2d) {
    this._v = list2d.map(e => [...e])
  }

  toString() {
    return `[${this._v.map(e => `{${e.join(', ')}}`).join(', ')}]`
  }

  // // 返回矩陣的第i個列向量
  colVector(i) {
    return new Vector(this._v.map(e => e[i]))
  }

  // 返回矩陣的第i個行向量
  rowVector(i) {
    return new Vector(this._v[i])
  }

  // 返回矩陣row, column位置的元素
  getItem(r, c) {
    return this._v[r][c]
  }

  // 返回矩陣的形狀：(行數, 列數)
  get shape() {
    return [this._v.length, this._v[0].length]
  }

  // 返回矩陣的行數
  get rowNum() {
    return this.shape[0]
  }

  // 返回矩陣的列數
  get colNum() {
    return this.shape[1]
  }

  // 返回矩陣個數
  get size() {
    return this.shape[0] * this.shape[1]
  }
}
