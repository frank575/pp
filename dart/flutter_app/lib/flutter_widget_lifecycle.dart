import 'package:flutter/material.dart';

void _info() {
  '''
  FlutterWidget的生命週期重點講解Statefulwidget的生命週期
  因為無狀態的widgetStateessWidget只有createement與buid兩個生命期方法
  
  statefulwidget的生命期方法按照時期不同可以分為三組:
    1.初始化時期 createState、initstate
    2.更新期間 didChangeDependencies、build、didUpdateWidget
    3.銷毀期 deactivate、dispose
    
  最常用的為：initState、build、dispose
  
  擴展閱讀
  http://www.devio.org/io/flutter_app/img/blog/flutter-widget-lifecycle.png
  https://flutterbyexample.com/stateful-widget-lifecycle/
  ''';
}

class FlutterWidgetLifecycle extends StatefulWidget {
  // 當構建一個新的StatefulWidget時，createState會立即調用
  // 且該方法是必須被複寫的
  @override
  _FlutterWidgetLifecycleState createState() => _FlutterWidgetLifecycleState();
}

// Flutter頁面生命週期
class _FlutterWidgetLifecycleState extends State<FlutterWidgetLifecycle> {
  int _count = 0;

  @override
  void initState() {
    super.initState();
    '''
    這是創建widget時調用的除構造方法外的第一個方法
    類似於Android的:oncreate() 與iOS的viewDidload()
    在這個方法中通常會做一些初始化工作,比如channe的初始化, 監聽器的初始化等
    ''';
    print('----initState----');
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    '''
    當依賴的State對象改變時會調用:
    a.在第一次構建widget時,在initstate()之後立即調用此方法;
    b.如果的StatefulWidgets依賴於InheritedWidget,那麼當當前State所依賴InheritedWidget中的變量改變時會再次調用他
    拓展:Inheritedwidget可以高效的將數據在Widget樹中向下傳遞、共享,可參考：https://book.flutterchina.club/chapter7/inherited_widget.html
    ''';
    print('----didChangeDependencies----');
  }

  @override
  void didUpdateWidget(FlutterWidgetLifecycle oldWidget) {
    '''
    這是一個不常用到的生命週期方法，當父組件需要重新繪製時才會調用
    該方法會攜帶一個oldWidget參數，可以將其與當前的widget進行對比以便執行一些額外邏輯，如：
    if (oldWidget.xxx != widget.xxx)...
    ''';
    super.didUpdateWidget(oldWidget);
    print('----didUpdateWidget----');
  }

  @override
  void deactivate() {
    '''
    很少使用，在組件被移除時調用(在dispose之前調用)
    ''';
    super.deactivate();
    print('----deactivate----');
  }

  @override
  void dispose() {
    '''
    常用，組件被銷毀時調用
    通常在該方法中執行一些資源釋放工作比如：監聽器械載、channel銷毀等
    與 initState 相互對應，一個初始化；一個銷毀
    ''';
    super.dispose();
    print('----dispose----');
  }

  @override
  Widget build(BuildContext context) {
    '''
    這是一個必須實現的方法，在這裡實現你要呈現的頁面內容
    他會在didChangeDependencues()後立即調用
    另外當調用setState後也會再次調用該方法
    ''';
    print('----build----');
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter頁面生命週期'),
        leading: BackButton(),
      ),
      body: Center(
        child: Column(
          children: [
            ElevatedButton(
                onPressed: () {
                  setState(() {
                    _count++;
                  });
                },
                child: Text(
                  '點我',
                  style: TextStyle(fontSize: 26),
                )),
            Text(_count.toString())
          ],
        ),
      ),
    );
  }
}
