import 'package:flutter/material.dart';
import 'package:flutter_app/gesture_page.dart';
import 'package:flutter_app/less_group_page.dart';
import 'package:flutter_app/plguin_use.dart';
import 'package:flutter_app/res_page.dart';
import 'package:flutter_app/stateful_group_page.dart';

import 'flutter_layout_page.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(title: Text('如何創建和使用Flutter路由及導航？')),
            body: RootNavigator()),
        routes: {
          'plugin': (context) => PluginUse(),
          'less': (context) => LessGroupPage(),
          'full': (context) => StatefulGroup(),
          'layout': (context) => FlutterLayoutPage(),
          'gesture': (context) => GesturePage(),
          'res': (context) => ResPage(),
        });
  }
}

class RootNavigator extends StatefulWidget {
  @override
  _RootNavigatorState createState() => _RootNavigatorState();
}

class _RootNavigatorState extends State<RootNavigator> {
  bool byName = true; // false 表示不透過Navigator直接跳轉
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        children: [
          SwitchListTile(
              title: Text('${byName ? '' : '不'}通過Navigator跳轉'),
              value: byName,
              onChanged: (value) {
                setState(() {
                  byName = value;
                });
              }),
          _item('如何在flutter使用plugin？', PluginUse(), 'plugin'),
          _item('StatelessWidget與基礎組件', LessGroupPage(), 'less'),
          _item('StatefulWidget與基礎組件', StatefulGroup(), 'full'),
          _item('如何進行Flutter布局開發', FlutterLayoutPage(), 'layout'),
          _item('如何檢測用戶手勢以及處理點擊事件？', GesturePage(), 'gesture'),
          _item('如何導入和使用Flutter的資源文件？', ResPage(), 'res'),
        ],
      ),
    );
  }

  _item(String title, page, String routeName) {
    return Container(
        child: ElevatedButton(
            child: Text(title),
            onPressed: () {
              if (byName) {
                Navigator.pushNamed(context, routeName);
              } else {
                Navigator.push(
                    context, MaterialPageRoute(builder: (context) => page));
              }
            }));
  }
}
