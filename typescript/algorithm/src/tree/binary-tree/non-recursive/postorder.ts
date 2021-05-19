import {createSimpleBinaryTree, ISimpleBinaryTree} from "../../helper";

`
非遞規版後序遍歷(postorder LRD)
    1(7)
   /    \
  2(4)   6(6)
 /  \     \
3(1) 4(3)  7(5)
    /
   5(2)
`
const tree = createSimpleBinaryTree()
const postorder = (root: ISimpleBinaryTree) => {
  if (!root) return
  const stack = [root] as ISimpleBinaryTree[]
  const outputStack = [] as ISimpleBinaryTree[]
  while (stack.length){
    const e = stack.pop()!
    outputStack.push(e)
    if (e.left) stack.push(e.left)
    if (e.right) stack.push(e.right)
  }
  while (outputStack.length) {
    console.log(outputStack.pop()!.el)
  }
}
console.log('======')
console.log('非遞規版後序遍歷 postorder')
postorder(tree)
