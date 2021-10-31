package com.example.livedata;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.DataBindingUtil;
import androidx.lifecycle.ViewModelProvider;

import com.example.livedata.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    ActivityMainBinding binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
    MainViewModel viewModel = new ViewModelProvider(this).get(MainViewModel.class);
    binding.setViewmodel(viewModel);
    binding.setLifecycleOwner(this);
  }
}