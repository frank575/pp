import 'package:flutter/material.dart';

class StatefulGroup extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _StatefulGroupState();
}

// StatefulWidget與基礎組件
class _StatefulGroupState extends State<StatefulGroup> {
  var _currentIndex = 0;

  Future<Null> _onRefresh() async {
    // Dart的timeout語法
    await Future.delayed(Duration(microseconds: 200));
    return null;
  }

  @override
  Widget build(BuildContext context) {
    var textStyle = TextStyle(fontSize: 20);
    return MaterialApp(
        title: 'StatefulWidget與基礎組件',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: Scaffold(
            appBar: AppBar(
                title: Text('StatefulWidget與基礎組件'),
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
                              Image.network(
                                'https://onepage.nownews.com/sites/default/files/styles/crop_thematic_mobile_banner_img/public/2020-11/%E5%90%89%E5%A8%83%E5%A8%83MB.jpg?h=5e9d654c&itok=X1smr_M_',
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
                                margin: EdgeInsets.only(top: 10),
                                decoration: BoxDecoration(
                                    color: Colors.lightBlueAccent),
                                child: PageView(
                                  children: [
                                    _item('Page1', Colors.deepPurple),
                                    _item('Page2', Colors.green),
                                    _item('Page3', Colors.red)
                                  ],
                                ),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                    onRefresh: _onRefresh)
                : Text('列表')));
  }

  _item(String title, Color color) {
    return Container(
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color),
      child: Text(title, style: TextStyle(fontSize: 22, color: Colors.white)),
    );
  }
}
