`
鏈表 linkedList
  多個元素組成的列表
  元素儲存不連續，使用next指針連在一起
    a|next -> b|next -> c|next -> d|next
  
  與數組的區別
    數組增刪非首尾元素往往需要移動元素，而鏈表只需要更改next指針即可
    
  js依然沒有鏈表，此處用Object模擬
`
type ILinkedList = { el: string, next?: ILinkedList }
const a = { el: 'a' } as ILinkedList
const b = { el: 'b' } as ILinkedList
const c = { el: 'c' } as ILinkedList
const d = { el: 'd' } as ILinkedList
a.next = b
b.next = c
c.next = d

;`遍歷鏈表`
let p = a as ILinkedList | undefined
while (p) {
  console.log(p)
  p = p.next
}

`插入(改next指針即可)`
const e = { el: 'e' } as ILinkedList
c.next = e
e.next = d

;`
刪除(改next指針即可)
這樣e就從鏈表裡刪除了
`
c.next = d
