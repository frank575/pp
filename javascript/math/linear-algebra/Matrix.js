import { Vector } from './Vector'
;`
矩陣行數=列數 -> 方陣
通常用A(大a)表示矩陣

A = | a11, a12, a13, a1c... | aij 第i行第j列
		|	a21, a22, a23, a2c... | r = row
		| ...  								  | n = column
		|	ar1, ar2, ar3, arc... |
`

export class Matrix {
	constructor(list2d) {
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
	getitem(r, c) {
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

	// 返回兩個矩陣的加法結果
	add(another) {
		if (this.rowNum !== another.rowNum || this.colNum !== another.colNum) {
			return console.error('矩陣雙方的形狀不同')
		}
		return new Matrix(
			this._v.map((e, i) => e.map((f, j) => f + another.getitem(i, j))),
		)
	}

	// 返回兩個矩陣的減法結果
	sub(another) {
		if (this.rowNum !== another.rowNum || this.colNum !== another.colNum) {
			return console.error('矩陣雙方的形狀不同')
		}
		return new Matrix(
			this._v.map((e, i) => e.map((f, j) => f - another.getitem(i, j))),
		)
	}

	// 返回矩陣的乘法結果
	mul(k) {
		return new Matrix(this._v.map(e => e.map(f => f * k)))
	}

	// 返回矩陣的除法結果
	dividedBy(k) {
		return new Matrix(this._v.map(e => e.map(f => f / k)))
	}

	// 返回矩陣取正的結果
	get pos() {
		return this.mul(1)
	}

	// 返回矩陣取負的結果
	get neg() {
		return this.mul(-1)
	}

	// 返回一個r行c列的零矩陣
	static zero(r, c) {
		return new Matrix(
			Array.from(new Array(r), () => Array.from(new Array(c), () => 0)),
		)
	}
}
