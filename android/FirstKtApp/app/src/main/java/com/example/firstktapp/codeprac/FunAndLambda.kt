package com.example.firstktapp.codeprac

fun max(a: Int, b: Int): Boolean {
  return a > b
}

class Person {
  // companion object 伴生類方法 (kt 沒 static 關鍵字)
  companion object {
    fun hello() {}
  }

  // 普通類方法
  fun ask() { }
}

// 靜態類方法
object Util {
  fun test() {}
}

// 默認參數
fun read(start: Int, offset: Int = 0) {}

// 最後參數為方法 (方法參數返回 Unit 表示 void)
fun lastParamFunFun(a: Int, cb: () -> Unit) {}

// 方法有返回值的方法
fun hasReturnValFun(cb: () -> String) {}

// 可變長度參數
fun append(vararg ch: Char): String {
  val result = StringBuffer()
  for (e in ch) {
    result.append(e)
  }
  return result.toString()
}

// lambda
// 多傳值
fun <T> transform(arr: Array<T>, cb: (i: Int, el: T) -> T) {
  for (i in arr.indices) {
    val newValue = cb(i, arr[i])
    arr[i] = newValue
  }
}
// 單傳值
fun <T> transform2(arr: Array<T>, cb: (el: T) -> T) {
  for (i in arr.indices) {
    val newValue = cb(arr[i])
    arr[i] = newValue
  }
}

fun main() {
  Person().ask() // kt class 不用 new 關鍵字
  Util.test() // 靜態類調用方法
  Person.hello() // 伴生類調用
  read(5);
  // 具名參數, 可以具名傳參
  read(start= 5, offset =6);

  // 調用最後參數為方法的方法, 方法傳遞可以扔到函數尾, 當然也可以具名或直接傳
  lastParamFunFun(9) {}
  lastParamFunFun(10, {})
  lastParamFunFun(10, cb = {})

  // 調用方法有返回值的方法
  // 1. 需要使用 return@方法名 返回值 的格式來返回值
  // 2. 直接在最後一行寫返回值
  hasReturnValFun { return@hasReturnValFun "hello world!" }
  hasReturnValFun { "hello world!" }
  hasReturnValFun {
    val a = 1
    "hello world!" // 最後一行表示返回值
  }

  // 調用可變長度參數方法
  val world = charArrayOf('w', 'o', 'r', 'l', 'd')
  val hello = append('h', 'e', 'l', 'l', 'o')
  var helloWorld = append('h', 'e', 'l', 'l', 'o', *world) // *數組 可以理解為解構數組


  // 調用 lambda 方法
  val arr1 = arrayOf(1, 3, 5)
  transform(arr1) { i, el->
    el * 5
  }
  transform(arr1, cb = { i, el -> el * 10 })
  // 當 lambda 傳參只有一個參數, 將有 it 的 lambda 關鍵字
  transform2(arr1) {
    it / 10
  }
}