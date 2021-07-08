import { Vector } from './Vector'
import { Matrix } from './Matrix'

const vec = new Vector([2, 5])
const vec2 = new Vector([1, 3])

console.log(`vec${vec}`)

console.log(`vec${vec} + vec2${vec2} = ${(vec.add(vec2), vec)}`)

console.log(`vec${vec} - vec2${vec2} = ${(vec.sub(vec2), vec)}`)

console.log(`vec${vec} * 2 = ${(vec.mul(2), vec)}`)

console.log(`vec${vec}.norm = ${vec.norm()}`)
console.log(`vec${vec}.normalize = ${vec.normalize()}`)
console.log(`vec${vec}.normalize.norm = ${vec.normalize().norm()}`)

console.log(`vec${vec}.dot(vec2${vec2} = ${vec.dot(vec2)})`)


const matrix = new Matrix([[1, 2], [3, 4]])
console.log(`matrix${matrix}`)
console.log(`matrix.shape = ${matrix.shape}`)
console.log(`matrix.rowNum = ${matrix.rowNum}`)
console.log(`matrix.colNum = ${matrix.colNum}`)
console.log(`matrix.size = ${matrix.size}`)
console.log(`matrix[0][0] = ${matrix.getItem(0, 0)}`)
console.log(`matrix.rowVector[0] = ${matrix.rowVector(0)}`)
console.log(`matrix.colVector[0] = ${matrix.colVector(0)}`)
