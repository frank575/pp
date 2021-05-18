import './preorder-tree'
import './valid-brackets'
import './function-call'
import './ten-to-two'

;`
棧就是後進先出的數據結構
適用場景：
  * 所有需要後進先出的場景
    * 十進制轉二進制、判斷字符串的括號是否有效、函數調用堆棧等
常用操作：
push, pop, stack[stack.length - 1]
`
const stack = [] as number[]
stack.push(1)
stack.push(2)

const item1 = stack.pop()
const item2 = stack.pop()
console.log('======')
console.log('棧')
console.log(item1, item2)
