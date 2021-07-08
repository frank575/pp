import { Vector } from './Vector'

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
