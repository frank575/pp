package com.example.firstktapp

import android.app.Activity
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // 直接調用綁定
        R.id.hello.onClick(this) {
            println("click hello")
        }
    }
}

// 擴展 Int 函數，讓 id 可以直接調用 onClick 方法綁定事件
fun Int.onClick(activity: Activity, onClick: (view: View) -> Unit) {
    activity.findViewById<View>(this).setOnClickListener {
        println("Int.onClick")
        onClick(it)
    }
}