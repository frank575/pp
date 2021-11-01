package com.example.firstktapp.codeprac

interface Drink<T> {
  fun drink(t: T)
}

class DrinkApple: Drink<String> {
  override fun drink(t: String) {
    println("drink: $t")
  }
}

abstract class Color<T>(val t: T) {
  abstract fun printColor();
}

class BlueColor(private val color: String): Color<String>(color) {
  override fun printColor() {
    println("color: $color")
  }
}

// 泛型方法
fun <T> fromJson(json: String, tClass: Class<T>): T? {
  return tClass.newInstance()
}

interface User {}

class Student: User {}

// 泛型約束
fun <T: User> fromUser(user: T) {}

class ComparableStudent: User, Comparable<User> {
  override fun compareTo(other: User): Int {
    TODO("Not yet implemented")
  }
}

// 泛型約束2 多約束 where
fun <T> fromUser2(user: T): T where T: User, T: Comparable<T> {
  return user
}

// out 約束泛型參數類型的上限(允許傳入 Ｔ 及 Ｔ 的子類)
// 申明處 out
class X1<out T>(val number: T) {}
class X2<T>(val number: T) {}


// in 約束泛型參數類型的下限(允許傳入 Ｔ 及 Ｔ 的父類)
class Y1<T>(val number: T) {}

fun main() {
  fromJson("{}", String.javaClass)
  fromUser(Student());
  fromUser2(ComparableStudent())
  val x1: X1<Number> = X1<Int>(6)
  // 調用處 out
  val x2: X2<out Number> = X2<Int>(6)
//  val x2_2: X2<Number> = X2<Int>(6) // error 類型不匹配

  val y1: Y1<in Int> = Y1<Number>(5)
}