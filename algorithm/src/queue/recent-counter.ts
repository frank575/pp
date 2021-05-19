`
最近的請求次數
力扣933

执行用时：244 ms, 在所有 TypeScript 提交中击败了93.18%的用户
内存消耗：48 MB, 在所有 TypeScript 提交中击败了45.46%的用户
`
class RecentCounter {
  private queue: number[] = []
  constructor() {
  }

  ping(t: number): number {
    this.queue.push(t)
    while (this.queue[0] < t - 3000) {
      this.queue.shift()
    }
    return this.queue.length
  }
}
