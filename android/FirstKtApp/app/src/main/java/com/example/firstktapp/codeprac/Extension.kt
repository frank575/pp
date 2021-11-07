package com.example.firstktapp.codeprac

public class Jump {
  companion object {}
  fun test() {
    doubleJump(1f)
  }
}

// 擴展函數, 可以為類添加方法
public fun Jump.doubleJump(howLong: Float) {
  println("jump: $howLong")
  println("jump: $howLong")
}

// 使用泛型擴展 MutableList 函數
fun <T> MutableList<T>.swap(i: Int, i2: Int) {
  val tmp = this[i]
  this[i] = this[i2]
  this[i2] = tmp
}

// 為類擴展屬性
val String.lastChar: Char get() = this.get(this.length - 1)
// this 可以省略
val <T> List<T>.last: T get() = get(size - 1)

// 為伴生類擴展函數
fun Jump.Companion.print(str: String) {
  println(str)
}

// 類型? 表示可為空
fun testLet(str: String?) {
  // str 為 null 依然觸發
  str.let {
    val str2 = "hello"
    println(str2 + str)
  }

//  println(str2) // 作用域錯誤，取不到閉包中的 str2

  // ?. 為當 str 不為 null 時觸發，建議這麼寫
  str?.let {
    val str2 = "hello"
    println(str2 + str)
  }
}

// 只有值的類
data class Room(val address: String, val price: Float, val size: Float)

fun testRun(room: Room) {
  // run 可以直接獲取實例中的公有屬性及方法
  // 接收 lambda 表達式，故尾行直接 return，當然可以主動申明 return 關鍵字
  room.run {
    println("Room: $address, $price, $size")
  }
}

fun testApply() {
  // 直接調用對象本身，最後將自己返回，可以用在類初始化等情境
  ArrayList<String>().apply {
    add("111")
    add("222")
    add("333")
  }.run {
    for (s in this) {
      println(s)
    }
  }
}

fun main () {
  // test 裡的 doubleJump 會被正確調用
  Jump().test()
  Jump().doubleJump(2f)
  val ml1 = mutableListOf<Int>(1, 3, 5)
  ml1.swap(0, 2)

  val d = "hello world".lastChar
  val d2 = listOf<Char>('w', 'o', 'r', 'l', 'd').last
}