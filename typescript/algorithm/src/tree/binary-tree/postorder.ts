import {createSimpleBinaryTree, ISimpleBinaryTree} from "../helper";

`
後序遍歷(postorder LRD)
資料樹結構(括號數字為執行順序)
    1(7)
   /    \
  2(4)   6(6)
 /  \     \
3(1) 4(3)  7(5)
    /
   5(2)
步驟：
1對根節點的左子樹進行後序遍歷
2對根節點的右子樹進行後序遍歷
3訪問根節點
簡單來講就是：左>右>根
`
const tree = createSimpleBinaryTree()
const postorder = (root: ISimpleBinaryTree|null) => {
  if (root ==null)return
  postorder(root.left)
  postorder(root.right)
  console.log(root.el)
}
console.log('======')
console.log('後序遍歷 postorder')
postorder(tree) ;'3>5>4>2>7>6>1'
