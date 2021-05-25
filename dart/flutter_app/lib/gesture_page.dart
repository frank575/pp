import 'package:flutter/material.dart';

class GesturePage extends StatefulWidget {
  @override
  _GesturePageState createState() => _GesturePageState();
}

// 如何檢測用戶手勢以及處理點擊事件？
class _GesturePageState extends State<GesturePage> {
  var printString = '', moveX = 0.0, moveY = 0.0;
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(
              title: Text('如何檢測用戶手勢以及處理點擊事件？'),
              leading: GestureDetector(
                onTap: () {
                  Navigator.pop(context);
                },
                child: Icon(Icons.arrow_back),
              ),
            ),
            body: FractionallySizedBox(
                widthFactor: 1,
                child: Stack(
                  children: [
                    Column(
                      children: [
                        //在Flutter裡所有手勢都是用此處理
                        GestureDetector(
                          onTap: () => _printMsg('點擊'),
                          onDoubleTap: () => _printMsg('雙擊'),
                          onLongPress: () => _printMsg('長按'),
                          onTapCancel: () => _printMsg('點擊取消'),
                          onTapUp: (e) => _printMsg('鬆開'),
                          onTapDown: (e) => _printMsg('按下'),
                          child: Container(
                              padding: EdgeInsets.all(60),
                              decoration:
                                  BoxDecoration(color: Colors.blueAccent),
                              child: Text('點我',
                                  style: TextStyle(
                                      fontSize: 36, color: Colors.white))),
                        ),
                        Text(printString)
                      ],
                    ),
                    Positioned(
                      left: moveX,
                      top: moveY,
                      child: GestureDetector(
                          onPanUpdate: (e) => _doMove(e),
                          child: Container(
                            width: 72,
                            height: 72,
                            decoration: BoxDecoration(
                                color: Colors.amber,
                                borderRadius: BorderRadius.circular(36)),
                          )),
                    )
                  ],
                ))));
  }

  _printMsg(String msg) {
    setState(() {
      printString += ', $msg';
    });
  }

  _doMove(DragUpdateDetails e) {
    setState(() {
      moveY += e.delta.dy;
      moveX += e.delta.dx;
    });
    print(e);
  }
}
