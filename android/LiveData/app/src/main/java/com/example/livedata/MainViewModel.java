package com.example.livedata;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

public class MainViewModel extends ViewModel {
  private MutableLiveData<Integer> count;

  public MutableLiveData<Integer> getCount() {
    if (count == null) {
      count = new MutableLiveData<>();
      count.setValue(1);
    }
    return count;
  }


  public void increase(Integer _count) {
    Integer countValue = count.getValue() == null ? 0 : count.getValue();
    count.setValue(countValue + _count);
  }
}
