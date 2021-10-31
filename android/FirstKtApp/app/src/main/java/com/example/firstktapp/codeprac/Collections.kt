package com.example.firstktapp.codeprac

fun main () {
  val arr1 = arrayOf(1, 2, 3); // Array<Int>
  var arr2 = arrayOf(1, '1') // Array<Any>
  val arrnull1 = arrayOfNulls<String>(5); // 定義固定大小的空數組
  arrnull1[0] = "el1"

  val arr3 = Array(5) { i -> (i + 1).toString() } // 使用 Array 動態創建指定大小數組
  val bytes = ByteArray(5)
  val intarr1 = IntArray(3) { 100 } // [100, 100, 100]
  val indexarr1 = IntArray(3) { it } // [0, 1, 2] (it 為 lambda 表達式專有變量, 這裡指的是數組的下標(索引))

  // 數組常見操作
  // [] 獲取
  // size() 長度
  // get(i: Int) 獲取
  // set(i int, v T) 設值

  // 數組遍歷
  for (el in indexarr1) {}
  for (i in indexarr1.indices /* 下標(index) */) {}
  for ((el, i) in indexarr1.withIndex()) {}
  indexarr1.forEach {
    println(it) // 此 it 表示 element
  }
  indexarr1.forEachIndexed() { i, el -> println("$i: $el")  }  // 包含索引的 forEach


  // 集合 List, Set, Map
  val arr4 = mutableListOf<Int>() // 可變數組
  arr4.add(1)
  arr4.add(0, 9) // 指定索引插入
  println(arr4)

  val arr5 = mutableListOf<String>("a", "b")
  val arr6 = listOf<Int>(1, 3, 5) // 不可變(增,改)數組

  val map1 = mutableMapOf<String, Int>(Pair("frank", 25), Pair("edward", 32)); // Pair 為 k-v Map
  map1.put("jj", 25)
  map1["kk"] = 19 // 同put

  val map2 = mapOf<String, Int>() // 不可變字典

  val set1 = mutableSetOf<Int>() // 可變Ｓet
  set1.add(123)
  val set2 = setOf<Int>() // 不可變Set

  // 集合常用操作
  // isEmpty()
  // contains(el T)
  // get(i Int)
  // indexOf(el T)
  // lastIndexOf(el T)
  // clear()
  // removeAt(i Int)
  // reverse()
  // shuffle() 隨機排列元素
  // sort() 從小到大排序
  // sortDescending() 從大到小排序
  // 
  arr4.forEach { i -> i}
  arr4.iterator().forEach { i -> i } // 同上
}