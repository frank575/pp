`
刪除鏈表中的節點
力扣237
`
class ListNode {
  constructor(
    public val: number = 0,
    public next: ListNode | null = null
  ) {}
}
const node = new ListNode(
4,
  new ListNode(
    5,
    new ListNode(
      1,
      new ListNode(9)
    )
  )
)
;`
执行用时96 ms, 在所有 TypeScript 提交中击败了77.19%的用户
内存消耗39.8 MB, 在所有 TypeScript 提交中击败了67.54%的用户
`
const deleteNode = (root: ListNode | null) => {
  if (!root) return
  const n = root.next
  if (n) {
    root.val = n.val
    root.next = n.next
  }
}
console.log('======')
console.log('刪除鏈表中的節點 deleteNode')
deleteNode(node!.next!.next!.next)
console.log(node)
