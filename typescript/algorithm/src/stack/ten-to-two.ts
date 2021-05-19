;`
十進制轉二進制
`
function tenToTwo(ten: number): number {
  let two = [] as number[]
  let result = ''
  while (ten > 0) {
    two.push(ten % 2)
    ten = Math.floor(ten / 2)
  }
  while (two.length) {
    result += two.pop()
  }
  return Number(result)
}

console.log('======')
console.log('十進制轉二進制')
console.log(tenToTwo(18))
console.log(tenToTwo(2))
console.log(tenToTwo(3))
