import 'package:flutter/material.dart';
import 'package:xi_cheng_wang/navigator/tab_navigator.dart';

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '攜程網',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const TabNavigator(),
    );
  }
}

void main() {
  runApp(const MyApp());
}
