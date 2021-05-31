import * as tf from '@tensorflow/tfjs'

const t0 = tf.tensor(1)
t0.print();
`
shape 存放維度的數量(由外到內記)
rankType: 存放維度是多少
`
console.log(t0) // rankType: '0', shape: []

const t1 = tf.tensor([1, 2])
t1.print()
console.log(t1) // rankType: '1', shape: [2]

const t2 = tf.tensor([[1, 2], [3, 4], [5, 6]])
t2.print()
console.log(t2) // rankType: '2', shape: [3(第一層長度), 2(第二層長度)]

const t3 = tf.tensor([[[1]]])
t3.print()
console.log(t3) // rankType: '3', shape: [1, 1, 1]


;`
為什麼N層For循環要用tensor
`
// 傳統
const input = [1, 2, 3, 4] // 輸入
const w = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6], [4, 5, 6, 7]] // 權重
const output = [0, 0, 0, 0] // 輸出
for (let i = 0; i < w.length; i++) {
  for (let j = 0; j < input.length; j++) {
    output[i] += input[j] * w[i][j]
  }
}
console.log(output)

// tensor
tf.tensor(w)
  .dot(tf.tensor(input))
  .print()
