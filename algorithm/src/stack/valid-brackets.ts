`
有效的括號
力扣20(簡單)
`

;`
执行用时76 ms, 在所有 TypeScript 提交中击败了 97.78% 的用户
内存消耗39.2 MB, 在所有 TypeScript 提交中击败了 96.98% 的用户
`
const validBrackets1 = (s: string) => {
  const sLen = s.length
  if (sLen % 2 === 1) return false
  const stack = []
  for (let i = 0; i < sLen; i++) {
    const t = s[i]
    if (/[({\[]/.test(t)) stack.push(t)
    else {
      const c = stack[stack.length - 1]
      if (
        (c === '(' && t === ')') ||
        (c === '{' && t === '}') ||
        (c === '[' && t === ']')
      ) stack.pop()
      else return false
    }
  }
  return stack.length === 0
}

;`
执行用时：76 ms, 在所有 TypeScript 提交中击败了 97.78% 的用户
内存消耗：39.7 MB, 在所有 TypeScript 提交中击败了 47.30% 的用户
`
const validBrackets2 = (s: string) => {
  const sLen = s.length
  if (sLen % 2 === 1) return false
  const stack = [] as string[]
  const bracketsDict: {[key: string]: [number, number]} = {
    '(': [0,0], ')': [1,0],
    '{': [0,1], '}': [1,1],
    '[': [0,2], ']': [1,2],
  }
  for (let i = 0; i < sLen; i++) {
    const e = s[i]
    const eel = bracketsDict[e];
    if (eel != null) {
      const f = stack[stack.length-1]
      const [ed, et] = eel
      if (f == null || ed === 0) stack.push(e)
      else {
        const [fd, ft] = bracketsDict[f];
        if (fd === 0 && ft !== et
          || fd === 1 && ed === 1) break
        else stack.pop()
      }
    }
  }
  return stack.length===0
}

const validBrackets = (s:string) => {
  return validBrackets2(s)
}

console.log('======')
console.log('有效的括號')
console.log(validBrackets('])'))
console.log(validBrackets(']]'))
console.log(validBrackets(']'))
console.log(validBrackets('()'))
console.log(validBrackets('(}'))
console.log(validBrackets('({})[({})]'))
console.log(validBrackets('((((}})'))
console.log(validBrackets('(])()[]['))
console.log(validBrackets('({}{}(()[()]))'))
console.log(validBrackets('([)]'))
