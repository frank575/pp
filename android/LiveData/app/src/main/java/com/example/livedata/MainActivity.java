package com.example.livedata;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
  private MainViewModel model;
  private TextView countText;
  private Button increaseButton;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    countText = findViewById(R.id.textView);
    increaseButton = findViewById(R.id.button);

    model = new ViewModelProvider(this).get(MainViewModel.class);
    model.getCount().observe(this, new Observer<Integer>() {
      @Override
      public void onChanged(@Nullable final Integer count) {
        countText.setText(String.valueOf(count));
      }
    });

    increaseButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        model.increase(1);
      }
    });
  }
}