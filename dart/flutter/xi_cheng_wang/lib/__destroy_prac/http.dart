import 'package:http/http.dart' as http;

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
