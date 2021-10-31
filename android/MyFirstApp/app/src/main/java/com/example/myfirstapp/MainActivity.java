package com.example.myfirstapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.Switch;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {
  TextView textView;
  Button leftButton;
  Button rightButton;
  Switch aSwitch;
  SeekBar seekBar;
  EditText editText;
  Button sendButton;


  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    textView = findViewById(R.id.textView7);
    leftButton = findViewById(R.id.button4);
    rightButton = findViewById(R.id.button5);
    aSwitch = findViewById(R.id.switch1);
    seekBar=findViewById(R.id.seekBar);
    editText=findViewById(R.id.editTextTextPersonName2);
    sendButton=findViewById(R.id.button6);

    leftButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        textView.setText("左");
      }
    });

    rightButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        textView.setText("右");
      }
    });

    aSwitch.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
      @Override
      public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
          textView.setText("開");
        } else {
          textView.setText("關");
        }
      }
    });

    seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
      @Override
      public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
        if (fromUser) {
          textView.setText(String.valueOf( progress));
        }
      }

      @Override
      public void onStartTrackingTouch(SeekBar seekBar) {}

      @Override
      public void onStopTrackingTouch(SeekBar seekBar) {}
    });

    sendButton.setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View v) {
        Editable text = editText.getText();
        String s = text.toString();
        if (TextUtils.isEmpty(s)) {
          s = "0";
        }
        seekBar.setProgress(Integer.parseInt(s));
      }
    });
  }
}