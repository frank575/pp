import {createSimpleTree, ISimpleTree} from "./helper";

`
深度優先遍歷(dfs Depth-First Search)
盡可能深的搜索樹的分支，照著以下順序遍歷(數字為順序)
a(1)
  b(2)
    d(3)
    e(4)
  c(5)
    f(6)
    g(7)
a>b>d>e>c>f>g
算法步驟：
1 訪問根節點
2 對根節點的children進行深度優先遍歷
`
const tree = createSimpleTree()
const dfs = (root: ISimpleTree) => {
  console.log(root.el)
  root.children.forEach(dfs)
}
console.log('======')
console.log('深度優先遍歷 dfs')
dfs(tree)
