import 'package:flutter/material.dart';
import 'package:flutter_swiper_plus/flutter_swiper_plus.dart';

const appbarScrollOffset = 100.0;

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final List<String> _imageUrls = [
    'https://pages.ctrip.com/commerce/promote/20180718/yxzy/img/640sygd.jpg',
    'https://pages.ctrip.com/commerce/promote/20180718/yxzy/img/640sygd.jpg',
    'https://pages.ctrip.com/commerce/promote/20180718/yxzy/img/640sygd.jpg',
  ];
  var appBarAlpha = 0.0;

  void _onScroll(double offset) {
    double alpha = offset / appbarScrollOffset;
    if (alpha < 0) {
      alpha = 0;
    } else if (alpha > 1) {
      alpha = 1;
    }

    setState(() {
      appBarAlpha = alpha;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 可以使用 Stack 進行黏貼型佈局，跟 css position 一樣，後面的元素蓋在前面上
      body: Stack(
        children: [
          // MediaQuery 用來移除安全區 padding
          MediaQuery.removePadding(
            context: context,
            removeTop: true, // 可以用來移除頂部的安全區
            // NotificationListener 來監聽滾動
            child: NotificationListener(
              onNotification: (ScrollNotification scrollNotification) {
                // scrollNotification.depth == 0 判斷僅用下一層會被監聽，沒判斷的話連 swiper 的滾動都會被監聽到
                if (scrollNotification is ScrollUpdateNotification &&
                    scrollNotification.depth == 0) {
                  // 滾動且是列表滾動的時候
                  _onScroll(scrollNotification.metrics.pixels);
                }
                return true; // 是否冒泡，true 表示父級無法收到
              },
              child: ListView(
                children: [
                  SizedBox(
                    height: 160,
                    child: Swiper(
                      itemCount: _imageUrls.length,
                      autoplay: true,
                      itemBuilder: (BuildContext context, int index) {
                        return Image.network(
                          _imageUrls[index],
                          fit: BoxFit.fill,
                        );
                      },
                      pagination: const SwiperPagination(),
                    ),
                  ),
                  const SizedBox(
                    height: 800,
                    child: ListTile(
                      title: Text('haha'),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Opacity(
            opacity: appBarAlpha,
            child: Container(
              height: 80,
              decoration: const BoxDecoration(color: Colors.white),
              child: const Center(
                child: Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: Text(
                    '首頁',
                    style: TextStyle(),
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
