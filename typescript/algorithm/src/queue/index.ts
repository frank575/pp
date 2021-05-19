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

;`
什麼場景使用隊列
需要先進先出的場景：
排隊買飯、JS異步中的任務隊列、進算最近請求次數等
`
