package com.example.firstktapp.codeprac

fun main() {
  // 數字
  val n1 = 100 // int(默認) 超過推斷為long
  val b1: Byte = 1 // byte
  val l1 = 10000000000 // long
  val l2 = 1L // long
  val d1 = 1.0 // double(默認)
  val d2 = 1F // Float

  // 字符
  val c1: Char = '1' // 單索引默認char
  val c2 = '2'

  // 布爾
  val bo1 = false
  val bo2: Boolean = true

  // 字符串
  val str1: String = "1"
  val str2 = "2" // 雙索引默認 string
  var firstChar1 = str1[0]

  // 字符串模板
  println("The result is $str1")
  println("The result is ${str1.length}")

  // 換行字符
  val textarea1 = """
    hello
    world!
  """

  // 運算
  val n3 = 1 + 2 * 3 / 6 % 9

  // 位運算 kt 是用函數而不是符號
  // shl(bits) 有符號左移（）shift logical left 縮寫
  // shr(bits) ""   右移
  // ushr(bits)無""  右移
  // and(vits) 位與
  // or(bits)  位或
  // inv()     位非
  // xor(bits) 位異或
}
