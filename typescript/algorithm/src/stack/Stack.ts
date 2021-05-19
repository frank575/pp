`
封裝簡易Stack類
`
class Stack<T> {
  private stack: T[] = []
  constructor(stack?: T[]) {
    if (stack) this.stack = stack
  }
  push(e: T) {
    this.stack.push(e)
  }
  pop(): T | undefined {
    if (this.stack.length)
      return this.stack.pop()
  }
  peek(): T | undefined {
    return this.stack[this.stack.length - 1]
  }
  toString(): string {
    return `[${this.stack.join(', ')}]`
  }
}
console.log('======')
console.log('Stack類')
const s = new Stack<string>()
s.push('a')
s.push('b')
s.push('c')
console.log(`${s.toString()}`)
console.log(`(pop) ${s.pop()}`)
console.log(`${s.toString()}`)
console.log(`(peek) ${s.peek()}`)
console.log(`${s.toString()}`)
