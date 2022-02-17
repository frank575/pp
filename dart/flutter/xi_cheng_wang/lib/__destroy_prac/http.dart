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

void main() {
  Future<CommonModal> fetchPost() async {
    final response = await http.get(Uri.parse(
        'http://www.devio.org/io/flutter_app/json/test_common_model.json'));
    final result = json.decode(response.body);
    return CommonModal.fromJson(result);
  }

  fetchPost().then((CommonModal e) {
    print(e.url);
  });
}
