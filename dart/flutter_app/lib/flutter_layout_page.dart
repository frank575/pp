import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class FlutterLayoutPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _FlutterLayoutPageState();
}

// 如何進行Flutter布局開發
class _FlutterLayoutPageState extends State<FlutterLayoutPage> {
  var _currentIndex = 0;

  Future<Null> _onRefresh() async {
    // Dart的timeout語法
    await Future.delayed(Duration(microseconds: 200));
    return null;
  }

  @override
  Widget build(BuildContext context) {
    var textStyle = TextStyle(fontSize: 20);
    var chiwawa =
        'https://chiwawadog.com/wp-content/uploads/2019/06/6E1AB3A9-8597-4077-BAF4-E27FC3424278-1024x1013.jpeg';
    var chiwawa2 =
        'https://onepage.nownews.com/sites/default/files/styles/crop_thematic_mobile_banner_img/public/2020-11/%E5%90%89%E5%A8%83%E5%A8%83MB.jpg?h=5e9d654c&itok=X1smr_M_';
    return MaterialApp(
        title: '如何進行Flutter布局開發',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(
                title: Text('如何進行Flutter布局開發'),
                leading: GestureDetector(
                    onTap: () {
                      Navigator.pop(context);
                    },
                    child: Icon(Icons.arrow_back))),
            // 至少要有兩個item
            bottomNavigationBar: BottomNavigationBar(
                currentIndex: _currentIndex,
                onTap: (index) {
                  setState(() {
                    _currentIndex = index;
                  });
                },
                items: [
                  BottomNavigationBarItem(
                      icon: Icon(Icons.home, color: Colors.grey),
                      activeIcon: Icon(Icons.home, color: Colors.blue),
                      label: '首頁'),
                  BottomNavigationBarItem(
                      icon: Icon(Icons.list, color: Colors.grey),
                      activeIcon: Icon(Icons.list, color: Colors.blue),
                      label: '列表'),
                ]),
            floatingActionButton:
                FloatingActionButton(onPressed: null, child: Text('點我')),
            body: _currentIndex == 0
                ?
                // RefreshIndicator 必須配合列表(ListView)使用
                RefreshIndicator(
                    child: ListView(
                      children: [
                        Container(
                          decoration: BoxDecoration(color: Colors.white),
                          alignment: Alignment.center,
                          child: Column(
                            children: [
                              Row(
                                children: [
                                  // 圓形裁切組件
                                  ClipOval(
                                      child: SizedBox(
                                    width: 100,
                                    height: 100,
                                    child: Image.network(
                                      chiwawa,
                                    ),
                                  )),
                                  Padding(
                                    padding: EdgeInsets.all(10),
                                    // 正方形裁切組件
                                    child: ClipRRect(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(10)),
                                        child: Opacity(
                                          opacity: .6,
                                          child: Image.network(
                                            chiwawa,
                                            width: 100,
                                            height: 100,
                                          ),
                                        )),
                                  )
                                ],
                              ),
                              Image.network(
                                chiwawa,
                                width: 100,
                                height: 100,
                              ),
                              TextField(
                                decoration: InputDecoration(
                                    contentPadding:
                                        EdgeInsets.fromLTRB(5, 0, 0, 0),
                                    hintText: '請輸入',
                                    hintStyle: TextStyle(fontSize: 15)),
                              ),
                              Container(
                                height: 100,
                                margin: EdgeInsets.all(10),
                                // decoration: BoxDecoration(
                                //     color: Colors.lightBlueAccent),
                                child: PhysicalModel(
                                    color: Colors.transparent,
                                    borderRadius: BorderRadius.circular(10),
                                    clipBehavior: Clip.antiAlias, // 抗鋸齒
                                    child: PageView(
                                      children: [
                                        _item('Page1', Colors.deepPurple),
                                        _item('Page2', Colors.green),
                                        _item('Page3', Colors.red)
                                      ],
                                    )),
                              ),
                              Column(
                                children: [
                                  FractionallySizedBox(
                                      widthFactor: 1,
                                      child: Container(
                                          decoration: BoxDecoration(
                                              color: Colors.greenAccent),
                                          child: Text(
                                            '寬度稱滿',
                                            textAlign: TextAlign.center,
                                          )))
                                ],
                              )
                            ],
                          ),
                        ),
                        Stack(
                          children: [
                            Image.network(
                              chiwawa,
                              width: 100,
                              height: 100,
                            ),
                            Positioned(
                                left: 0,
                                bottom: 0,
                                child: Image.network(
                                  chiwawa,
                                  width: 36,
                                  height: 36,
                                ))
                          ],
                        ),
                        Wrap(
                          // 從左至右進行排列，會自動換行
                          spacing: 8, // 水平間距
                          runSpacing: 6, // 垂直間距
                          children: [
                            _chip('Flutter'),
                            _chip('Flutter'),
                            _chip('Flutter'),
                            _chip('Flutter'),
                            _chip('Flutter'),
                            _chip('Flutter')
                          ],
                        )
                      ],
                    ),
                    onRefresh: _onRefresh)
                : Row(
                    children: [
                      Column(
                        children: [
                          Text('列表'),
                          Expanded(
                              child: Container(
                                  decoration: BoxDecoration(color: Colors.red),
                                  child: Text('拉伸填滿高度')))
                        ],
                      ),
                      Expanded(
                          child: Container(
                              decoration: BoxDecoration(color: Colors.red),
                              child: Text('拉伸填滿寬度')))
                    ],
                  )));
  }

  _item(String title, Color color) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color),
      child: Text(title, style: TextStyle(fontSize: 22, color: Colors.white)),
    );
  }

  _chip(String label) {
    return Chip(
      label: Text(label),
      avatar: CircleAvatar(
        backgroundColor: Colors.blue.shade900,
        child: Text(
          label.substring(0, 1),
          style: TextStyle(fontSize: 10),
        ),
      ),
    );
  }
}
