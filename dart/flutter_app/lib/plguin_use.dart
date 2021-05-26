import 'package:flutter/material.dart';
import 'package:flutter_color/flutter_color.dart';

//如何在flutter使用plugin？
class PluginUse extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何在flutter使用plugin？'),
        leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back)),
      ),
      body: Column(
        children: [
          Expanded(
              child: Padding(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _text('1 dart pub'),
                _text('2 查看Installing'),
                _text(
                    '3 添加dependencies到pubspec.yaml或是執行flutter pub add [plugin_name]'),
                _text('4 (如果是添加到pubspec.yaml)執行flutter pub get'),
                _text('5 import使用'),
              ],
            ),
          ))
        ],
      ),
    );
  }

  _text(String text) {
    return Column(
      children: [
        Text(
          text,
          style: TextStyle(color: HexColor('#ff0000')),
        ),
        Padding(padding: EdgeInsets.only(top: 5)),
      ],
    );
  }
}
