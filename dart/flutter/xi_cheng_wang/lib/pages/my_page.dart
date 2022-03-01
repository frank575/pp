import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class CommonModal {
  final String icon;
  final String title;
  final String url;
  final String statusBarColor;
  final bool hideAppBar;

  CommonModal(
      {required this.title,
      required this.icon,
      required this.url,
      required this.statusBarColor,
      required this.hideAppBar});
  factory CommonModal.fromJson(Map<String, dynamic> json) {
    return CommonModal(
      title: json['title'],
      icon: json['icon'],
      url: json['url'],
      statusBarColor: json['statusBarColor'],
      hideAppBar: json['hideAppBar'],
    );
  }
}

class MyPage extends StatefulWidget {
  const MyPage({Key? key}) : super(key: key);

  @override
  _MyPageState createState() => _MyPageState();
}

class _MyPageState extends State<MyPage> {
  Future<CommonModal> fetchPost() async {
    final response = await http.get(Uri.parse(
        'http://www.devio.org/io/flutter_app/json/test_common_model.json'));
    Utf8Decoder utf8decoder = const Utf8Decoder();
    final result = json.decode(utf8decoder.convert(response.bodyBytes));
    return CommonModal.fromJson(result);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: FutureBuilder<CommonModal>(
            future: fetchPost(),
            builder:
                (BuildContext context, AsyncSnapshot<CommonModal> snapshot) {
              switch (snapshot.connectionState) {
                case ConnectionState.none:
                  return const Text('Input a URL to start');
                case ConnectionState.waiting:
                  return const Center(
                    child: CircularProgressIndicator(),
                  );
                case ConnectionState.active:
                  return const Text('');
                case ConnectionState.done:
                  if (snapshot.hasError) {
                    return Text(
                      '${snapshot.error}',
                      style: const TextStyle(color: Colors.red),
                    );
                  } else {
                    if (snapshot.data == null) {
                      return const Text('snapshot.data us null');
                    } else {
                      return Column(
                        children: [
                          Text('icon:${snapshot.data?.icon}'),
                          Text(
                              'statusBarColor:${snapshot.data?.statusBarColor}'),
                          Text('title:${snapshot.data?.title}'),
                          Text('url:${snapshot.data?.url}'),
                        ],
                      );
                    }
                  }
              }
              return Text('hello world');
            }),
      ),
    );
  }
}
