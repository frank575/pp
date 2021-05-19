import {createSimpleBinaryTree, ISimpleBinaryTree} from "../helper";

`
先序遍歷(preorder DLR)
資料樹結構(括號數字為執行順序)
    1(1)
   /    \
  2(2)   6(6)
 /  \     \
3(3) 4(4)  7(7)
    /
   5(5)
步驟：
1訪問根節點
2對根節點的左子樹進行先序遍歷
3對根節點的右子樹進行先序遍歷
簡單來講就是：根>左>右
`
const tree = createSimpleBinaryTree()
const preorder = (root: ISimpleBinaryTree | null) => {
  if (root == null) return
  console.log(root.el)
  preorder(root.left)
  preorder(root.right)
}
console.log('======')
console.log('先序遍歷 preorder')
preorder(tree) ;'1>2>3>4>5>6>7'
