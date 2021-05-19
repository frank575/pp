`
隊列 queue
就是先進先出的數據結構

enqueue 入隊(從後入)
dequeue 出隊(從前出)

js沒有queue所以用array模擬
`
const queue = []
queue.push(1) // 模擬 enqueue
queue.push(2)
const item1 = queue.shift() // 模擬 dequeue
const item2 = queue.shift()
