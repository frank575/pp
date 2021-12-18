# 語法筆記

## 類型

| |kt|java|
|---|---|---| 
|字節|Byte|byte/Byte|
|整型|Int, Long|int/Integer, long/Long|
|浮點|Float, Double|float/Float, double/Double|
|字符|Char|char/Character|
|字符串|String|String|

## 聲明變量

### java
```java
public class Main {
  public static void main(String[] args) {
    String b = "Hello Kotlin";
    final String b2 = "Hello Kotlin2";
  }
}
```

### kotlin
```kotlin
val b: String = "Hello Kotlin" // 分號可省
// val: 只讀變量, 如 java final
// var: 讀寫變量, 如 java 類型

val b2 = "Hello Kotlin2" // 類型推斷，可以不用寫類型，使用 IDEA 可以用 ctrl+shift+p 顯示變量類型
```

## 數值類型轉換
### java
```java
public class Main {
  public static void main(String[] args) {
    int e = 10;
    long f = e; // implicit conversion
  }
}
```
### kotlin
```kotlin
val e: int = 10
val f: Long = e // implicitness not allowed
val f2: Long = e.toLong() // ok
```

## 無符號類型
> java 沒有，因為 kt 可兼容 c

| |有符號類型|無符號類型|
|---|---|---|
|字節|Byte|UByte|
|短整型|Short|UShort|
|整型|Int|UInt|
|長整型|Long|ULong|
|字符串|String|String|

## 字符串

### 比較

* `a == b` 比較內容，等價於 java 的 equals
* `a === b` 比較對象是否是同一個對象

### 字符串模板

* `"Hello $name, Hello ${name}"`

### 多行文字

* `"""多行內容"""`

## 數組

| |kotlin|java|
|---|---|---|
|整型|IntArray|int[]|
|整型裝箱|Array<Int>|Integer[]|
|字符|CharArray|char[]|
|字符裝箱|Array<Char>|Character[]|
|字符串|Array<String>|String[]|
