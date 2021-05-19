`
封裝基本的隊列類
`
class Queue<T> {
  private q = [] as T[]
  constructor() {
  }
  push(v: T) {
    this.q.push(v)
  }
  shift(): T | undefined {
    return this.q.shift()
  }
  peek(): T | undefined {
    return this.q[0]
  }
}
