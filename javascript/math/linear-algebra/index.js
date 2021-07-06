class Vector {
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

	// 返回向量模(長度)
	norm() {
		return Math.sqrt(this._v.reduce((p, e) => p + e ** 2, 0))
	}

	// 返回單位向量
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

const vec = new Vector([2, 5])
const vec2 = new Vector([1, 3])

console.log(`vec${vec}`)

console.log(`vec${vec} + vec2${vec2} = ${(vec.add(vec2), vec)}`)

console.log(`vec${vec} - vec2${vec2} = ${(vec.sub(vec2), vec)}`)

console.log(`vec${vec} * 2 = ${(vec.mul(2), vec)}`)

console.log(`vec${vec}.norm = ${vec.norm()}`)
console.log(`vec${vec}.normalize = ${vec.normalize()}`)
console.log(vec.normalize().norm())

console.log(`vec${vec}.dot(vec2${vec2} = ${vec.dot(vec2)})`)
