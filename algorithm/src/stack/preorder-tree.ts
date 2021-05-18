`
二叉樹的前序遍歷
力扣144
`
class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
}
const tree = new TreeNode(
  1,
  null,
  new TreeNode(
    2,
    new TreeNode(3),
    new TreeNode(4),
  )
)
;`
执行用时76 ms, 在所有 TypeScript 提交中击败了100.00%的用户
内存消耗38.9 MB, 在所有 TypeScript 提交中击败了100.00%的用户
`
const preorder1 = (root: TreeNode | null): number[] => {
  if (!root) return []
  const stack = [root]
  const output = []
  while (stack.length) {
    const e = stack.pop()!
    output.push(e.val)
    if (e.right) stack.push(e.right)
    if (e.left) stack.push(e.left)
  }
  return output
}
;`
执行用时88 ms, 在所有 TypeScript 提交中击败了67.84%的用户
内存消耗39.5 MB, 在所有 TypeScript 提交中击败了48.63%的用户
`
const preorder2 = (root: TreeNode | null): number[] => {
  if (!root) return []
  const result = [] as number[]
  const rec = (root: TreeNode | null, result: number[]) => {
    if (root == null) return
    result.push(root.val)
    rec(root.left, result)
    rec(root.right, result)
  }
  rec(root, result)
  return result
}
const preorder = (tree: TreeNode | null): number[] => {
  return preorder2(tree)
}
console.log('======')
console.log('棧的二叉樹的前序遍歷')
console.log(preorder(tree))
