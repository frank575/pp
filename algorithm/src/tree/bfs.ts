import {createSimpleTree, ISimpleTree} from "./helper";

`    
廣度優先遍歷(bfs Breadth-First Search)
先訪問與根節點最近的節點
a(1)
  b(2)
    d(4)
    e(5)
  c(3)
    f(6)
    g(7)
a>b>c>d>e>f>g    
算法步驟：
1 新建一個隊列，把根節點入隊
2 把隊頭出隊並訪問
3 把隊頭的children挨個入對
4 重複2,3直到隊列為空
`

const tree = createSimpleTree()
const bfs1 = (root: ISimpleTree) => {
  const nextRoots: ISimpleTree[] = []
  console.log(root.el)
  root.children.forEach(e => {
    console.log(e.el)
    nextRoots.push(e)
  })
  nextRoots.forEach(e => e.children.forEach(bfs))
}
const bfs2 = (root: ISimpleTree) => {
  const q = [root]
  while (q.length) {
    const e = q.shift()!
    console.log(e.el)
    e.children.forEach(f => q.push(f))
  }
}
const bfs3 = (root: ISimpleTree, q: ISimpleTree[] = [root]) => {
  const e = q.shift()!
  console.log(e.el)
  e.children.forEach(f => q.push(f))
  q.forEach(e => bfs3(e, q))
}
const bfs = (root: ISimpleTree) => bfs3(root)
console.log('======')
console.log('廣度優先遍歷 bfs')
bfs(tree)
