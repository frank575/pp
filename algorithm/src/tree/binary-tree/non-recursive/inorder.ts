import {createSimpleBinaryTree, ISimpleBinaryTree} from "../../helper";

`
非遞規版中序遍歷(inorder LDR)
`
const tree = createSimpleBinaryTree()
const inorder = (root: ISimpleBinaryTree) => {
  const stack = [] as ISimpleBinaryTree[]
  let e = root as ISimpleBinaryTree | null
  while (stack.length || e) {
    while (e) {
      stack.push(e)
      e = e.left
    }
    const f = stack.pop()!
    console.log(f.el)
    e = f.right
  }
}
console.log('======')
console.log('非遞規版中序遍歷 inorder')
inorder(tree)
