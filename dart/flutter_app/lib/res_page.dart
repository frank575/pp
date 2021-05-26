import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_color/flutter_color.dart';

//如何導入和使用Flutter的資源文件？
class ResPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何導入和使用Flutter的資源文件？'),
        leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back)),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image(
                width: 300, height: 300, image: AssetImage('images/monk.jpeg'))
          ],
        ),
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
