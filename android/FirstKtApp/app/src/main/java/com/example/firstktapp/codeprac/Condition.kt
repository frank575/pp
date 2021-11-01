package com.example.firstktapp.codeprac

fun maxOf(a: Int, b: Int): Int {
  if (a > b) {
    return a
  }
  return b
}

fun maxOf2(a: Int, b: Int): Int {
  if (a > b) {
    return a
  } else {
    return b
  }
}

fun maxOf3(a: Int, b: Int): Int {
  if (a > b)
    return a
  else return b
}

fun maxOf4(a: Int, b: Int): Int {
  if (a > b) return a else return b
}

fun maxOf5(a: Int, b: Int): Int {
  // 也可以不用三元返回
  return if (a > b) {
    a
  } else {
    b
  }
}

fun maxOf6(a: Int, b: Int): Int {
  return if (a > b) a else b
}

// if...else 版本
fun eval(number: Number) {
  if (number is Int) {}
  else if (number is Double) {}
  else if (number is Float) {}
  else if (number is Long) {}
  else if (number is Byte) {}
  else if (number is Short) {}
  else {}
}

// when 版本
fun evalWhen(number: Number) {
  // when 也是可以 return when
  when (number) {
    is Int -> {}
    is Double -> {}
    is Float -> {}
    is Long -> {}
    is Byte -> {}
    is Short -> {}
    else -> {}
  }
}

fun evalDynamicSet() {
  // 支持 when 內動態賦值 (1.3 版本後)
  when (val number: Number = 1) {
    is Int -> {}
    is Double -> {}
    is Float -> {}
    is Long -> {}
    is Byte -> {}
    is Short -> {}
    else -> {}
  }
}



fun main() {

}