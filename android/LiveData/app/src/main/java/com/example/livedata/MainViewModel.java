package com.example.livedata;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class MainViewModel extends ViewModel {
  public MutableLiveData<Integer> count = new MutableLiveData<>(0);

  public void increase(Integer _count) {
    this.count.setValue(count.getValue() + _count);
    Log.d("myapp", String.valueOf(count.getValue()));
  }
}
