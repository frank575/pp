import 'package:flutter/material.dart';

///如何獲取Flutter應用維度生命週期
///WidgetsBindingObserver：是一個Widget綁定觀察器，通過他我們可以監聽應用的生命週期、語言等變化

class AppLifecycle extends StatefulWidget {
  @override
  _AppLifecycleState createState() => _AppLifecycleState();
}

class _AppLifecycleState extends State<AppLifecycle>
    with WidgetsBindingObserver {
  @override
  void initState() {
    '''
    需要先調用WidgetsBinding.instance.addObserver來添加監聽器
    ''';
    WidgetsBinding.instance?.addObserver(this);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter應用生命週期'),
        leading: BackButton(),
      ),
      body: Container(
        child: Text('Flutter應用生命週期'),
      ),
    );
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    print('state = $state');
    if (state == AppLifecycleState.paused) {
      print('[AppLifecycleState.paused] App進入後台');
    } else if (state == AppLifecycleState.resumed) {
      print('[AppLifecycleState.resumed] App進入前台');
    } else if (state == AppLifecycleState.inactive) {
      '不常用：App處於非活動狀態，並且未接收用戶輸入時調用，比如：來了個電話';
    } else if (state == AppLifecycleState.detached) {
      '不常用：Flutter引擎脫離了宿主view時調用';
    }
  }

  @override
  void dispose() {
    WidgetsBinding.instance?.removeObserver(this);
    super.dispose();
  }
}
