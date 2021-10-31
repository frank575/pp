package com.example.basketballscorecounter;

import android.util.Log;

import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import java.util.ArrayList;
import java.util.List;

class Prev {
  private String type;
  private int score;

  public Prev(String type, int count) {
    this.type = type;
    this.score = count;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public int getScore() {
    return score;
  }

  public void setScore(int score) {
    this.score = score;
  }
}

public class MainViewModel extends ViewModel {
  private List<Prev> restoreList = new ArrayList<>();
  public MutableLiveData<Integer> redScore = new MutableLiveData<>(0);
  public MutableLiveData<Integer> greenScore = new MutableLiveData<>(0);

  public void addRedScore(Integer _count) {
    restoreList.add(new Prev("red", redScore.getValue()));
    redScore.setValue(redScore.getValue() + _count);
  }

  public void addGreenScore(Integer _count) {
    restoreList.add(new Prev("green", greenScore.getValue()));
    greenScore.setValue(greenScore.getValue() + _count);
  }

  public void reset() {
    restoreList.clear();
    redScore.setValue(0);
    greenScore.setValue(0);
  }

  public void undo() {
    if (restoreList.size() > 0) {
      Prev prev = restoreList.remove(restoreList.size() - 1);
      Log.d("myapp", String.valueOf(prev.getScore()));
      int score = prev.getScore();
      if (prev.getType().equals("red")) {
        redScore.setValue(score);
      } else {
        greenScore.setValue(score);
      }
    }
  }
}
