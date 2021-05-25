import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

// StatelessWidget與基礎組件
// 這裡調用常用的Container,Text,Icon,CloseButton,BackButton,Chip,Divider,Card,AlertDialog
class LessGroupPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var textStyle = TextStyle(fontSize: 20);
    return MaterialApp(
        title: 'StatelessWidget與基礎組件',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(
                title: Text('StatelessWidget與基礎組件'),
                leading: GestureDetector(
                    onTap: () {
                      Navigator.pop(context);
                    },
                    child: Icon(Icons.arrow_back))),
            body: Container(
              decoration: BoxDecoration(color: Colors.white),
              alignment: Alignment.center,
              child: Column(
                children: [
                  Text('I am Text', style: textStyle),
                  Icon(Icons.android, size: 50, color: Colors.red),
                  CloseButton(),
                  BackButton(),
                  Chip(
                    //有點像是標籤組件
                    avatar: Icon(Icons.people),
                    label: Text('StatelessWidget與基礎組件'),
                  ),
                  //線高不能設置，需要的話請使用Container
                  Divider(
                    //容器高度非線高度
                    height: 10,
                    //左側間距
                    indent: 10,
                    color: Colors.orange,
                  ),
                  //帶有圓角,陰影,邊框等效果的組件
                  Card(
                    color: Colors.blue,
                    elevation: 5,
                    margin: EdgeInsets.all(10),
                    child: Container(
                      padding: EdgeInsets.all(10),
                      child: Text(
                        'I am Card',
                        style: textStyle,
                      ),
                    ),
                  ),
                  AlertDialog(
                    title: Text('盤他'),
                    content: Text('你這個遭老頭子壞的很！'),
                  )
                ],
              ),
            )));
  }
}
