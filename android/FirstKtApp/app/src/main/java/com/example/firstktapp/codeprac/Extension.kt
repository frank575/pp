package com.example.firstktapp.codeprac

class Jump {
  fun test() {
    doubleJump(1f)
  }
}

// 擴展函數, 可以為類添加方法
fun Jump.doubleJump(howLong: Float) {
  println("jump: $howLong")
  println("jump: $howLong")
}

fun main () {
  // test 裡的 doubleJump 會被正確調用
  Jump().test()
  Jump().doubleJump(2f)
}