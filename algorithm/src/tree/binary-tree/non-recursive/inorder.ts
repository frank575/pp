import {createSimpleBinaryTree, ISimpleBinaryTree} from "../../helper";

`
非遞規版中序遍歷(inorder LDR)
    1(5)
   /    \
  2(2)   6(6)
 /  \     \
3(1) 4(4)  7(7)
    /
   5(3)
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
