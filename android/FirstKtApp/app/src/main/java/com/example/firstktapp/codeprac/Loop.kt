package com.example.firstktapp.codeprac

fun main() {
  val arr1 = listOf('1', '2', '3')

  // for loop
  for (el in arr1) {}
  for (i in arr1.indices) {}

  // forEach
  arr1.forEach { it }
  arr1.forEachIndexed {i, el -> i}

  // while
  while(false) {}
  do {} while(false)

  // iterator for loop
  for (i in 1..10) {} // 1, 2, 3, ...10
  for (i in 1 until 10) {} // 同上
  for (i in 10 downTo 1 step 2) {} // 10, 8, 6, ...2
}