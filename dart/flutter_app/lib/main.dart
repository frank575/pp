import 'package:flutter/material.dart';
import 'package:flutter_app/app_lifecycle.dart';
import 'package:flutter_app/gesture_page.dart';
import 'package:flutter_app/launch_page.dart';
import 'package:flutter_app/less_group_page.dart';
import 'package:flutter_app/photo_app_page.dart';
import 'package:flutter_app/plguin_use.dart';
import 'package:flutter_app/res_page.dart';
import 'package:flutter_app/stateful_group_page.dart';

import 'flutter_layout_page.dart';
import 'flutter_widget_lifecycle.dart';

void main() => runApp(DynamicTheme());

class DynamicTheme extends StatefulWidget {
  @override
  _DynamicThemeState createState() => _DynamicThemeState();
}

class _DynamicThemeState extends State<DynamicTheme> {
  var _brightness = Brightness.light;

  //字體下載地址：https://fonts.google.com/specimen/Noto+Sans+TC
  //字體設定參考：https://flutter.dev/docs/cookbook/design/fonts
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          // fontFamily: 'NotoSansTC', // 此為全APP配置
          brightness: _brightness,
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(title: Text('如何創建和使用Flutter路由及導航？')),
            body: Column(
              children: [
                SwitchListTile(
                    title: Text(
                      '夜間模式',
                      style: TextStyle(fontFamily: 'NotoSansTC'), // 局部配置
                    ),
                    value: _brightness != Brightness.light,
                    onChanged: (value) {
                      setState(() {
                        if (value) {
                          _brightness = Brightness.dark;
                        } else {
                          _brightness = Brightness.light;
                        }
                      });
                    }),
                RootNavigator(),
              ],
            )),
        routes: {
          'plugin': (context) => PluginUse(),
          'less': (context) => LessGroupPage(),
          'full': (context) => StatefulGroup(),
          'layout': (context) => FlutterLayoutPage(),
          'gesture': (context) => GesturePage(),
          'res': (context) => ResPage(),
          'launch': (context) => LaunchPage(),
          'lifecycle': (context) => FlutterWidgetLifecycle(),
          'applifecycle': (context) => AppLifecycle(),
          'photoapp': (context) => PhotoAppPage(),
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
          _item('如何打開第三方應用？', LaunchPage(), 'launch'),
          _item('Flutter頁面生命週期', FlutterWidgetLifecycle(), 'lifecycle'),
          _item('Flutter應用生命週期', AppLifecycle(), 'applifecycle'),
          _item('拍照APP開發', PhotoAppPage(), 'photoapp'),
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
