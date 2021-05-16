import {createSimpleBinaryTree, ISimpleBinaryTree} from "../helper";

`
中序遍歷(inorder LDR)
資料樹結構(括號數字為執行順序)
    1(5)
   /    \
  2(2)   6(6)
 /  \     \
3(1) 4(4)  7(7)
    /
   5(3)
步驟：
1對根節點的左子樹進行中序遍歷
2訪問根節點
3對根節點的右子樹進行中序遍歷
簡單來講就是：左>根>右
`
const tree = createSimpleBinaryTree()
const inorder = (root: ISimpleBinaryTree|null) => {
  if (root ==null)return
  inorder(root.left)
  console.log(root.el)
  inorder(root.right)
}
console.log('======')
console.log('中序遍歷 inorder')
inorder(tree) ;'3>2>5>4>1>6>7'
