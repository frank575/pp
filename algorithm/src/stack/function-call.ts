;`
函數調用堆棧
後進的函數先執行
`
function fun1(){
  fun2()
  console.log('run fun1')
}

function fun2(){
  fun3()
  console.log('run fun2')
}

function fun3(){
  console.log('run fun3')
}

console.log('======')
fun1()
