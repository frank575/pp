import {createSimpleBinaryTree, ISimpleBinaryTree} from "../../helper";

`
非遞規版中序遍歷(inorder LDR)
`
const tree = createSimpleBinaryTree()
const inorder = (root: ISimpleBinaryTree) => {
  const stack = [root] as ISimpleBinaryTree[]
  while (stack.length){
    const e = stack.pop()!
    console.log(e.el)
    if (e.right) stack.push(e.right)
    if (e.left) stack.push(e.left)
  }
}
console.log('======')
console.log('非遞規版中序遍歷 inorder')
inorder(tree)
