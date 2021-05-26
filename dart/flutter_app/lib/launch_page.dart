import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

const _url = 'https://flutter.dev';

//如何打開第三方應用？
class LaunchPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('如何打開第三方應用？'),
        leading: GestureDetector(
            onTap: () {
              Navigator.pop(context);
            },
            child: Icon(Icons.arrow_back)),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(onPressed: () => _launchURL(), child: Text('打開瀏覽器')),
            ElevatedButton(onPressed: () => _launchMap(), child: Text('打開地圖')),
          ],
        ),
      ),
    );
  }

  void _launchURL() async => await canLaunch(_url)
      ? await launch(_url)
      : throw 'Could not launch $_url';

  void _launchMap() async {
    // Android
    const _url = 'geo:52.32,4.917'; // APp提供者的schema
    if (await canLaunch(_url)) {
      await launch(_url);
    } else {
      // IOS
      const _url = 'http://maps.apple.com/?ll=52.32,4.917';
      if (await canLaunch(_url)) {
        await launch(_url);
      } else {
        throw 'Could not launch $_url';
      }
    }
  }
}
