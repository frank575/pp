import {createSimpleBinaryTree, ISimpleBinaryTree} from "../../helper";

`
非遞規版先序遍歷(preorder DLR)
`
const tree = createSimpleBinaryTree()
const preorder1 = (root: ISimpleBinaryTree|null) => {
  const stack = [] as ISimpleBinaryTree[]
  while (root){
    console.log(root.el)
    if (root.right) stack.push(root.right)
    root = root.left
    if (root==null) root = stack.pop() as ISimpleBinaryTree|null
  }
}
const preorder2 = (root: ISimpleBinaryTree) => {
  const stack = [root] as ISimpleBinaryTree[]
  while (stack.length){
    const e = stack.pop()!
    console.log(e.el)
    if (e.right) stack.push(e.right)
    if (e.left) stack.push(e.left)
  }
}
const preorder = (tree: ISimpleBinaryTree) => preorder2(tree)
console.log('======')
console.log('非遞規版先序遍歷 preorder')
preorder(tree)
