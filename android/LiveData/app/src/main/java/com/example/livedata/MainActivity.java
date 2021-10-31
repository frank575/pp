package com.example.livedata;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;
import android.view.View;

import com.example.livedata.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
  private ActivityMainBinding binding;
  private MainViewModel model;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    binding = ActivityMainBinding.inflate(getLayoutInflater());
    View view = binding.getRoot();
    setContentView(view);

    model = new ViewModelProvider(this).get(MainViewModel.class);
    model.getCount().observe(this, new Observer<Integer>() {
      @Override
      public void onChanged(@Nullable final Integer count) {
        binding.textView.setText(String.valueOf(count));
      }
    });

    binding.button.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        model.increase(1);
      }
    });
  }
}