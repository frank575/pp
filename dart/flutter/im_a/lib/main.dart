import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: PracHomePage(),
    );
  }
}

class PracHomePage extends StatelessWidget {
  const PracHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('statelesswidget prac'),
        ),
        body: Center(
            child: Container(
                decoration: const BoxDecoration(color: Colors.white),
                alignment: Alignment.center,
                child: Column(
                  children: const [
                    Text(
                      'I\'m a text',
                      style: TextStyle(fontSize: 20),
                    ),
                    Icon(Icons.android, size: 50, color: Colors.red),
                    CloseButton(),
                    BackButton(),
                    Chip(
                      label: Text('chip text'),
                      avatar: Icon(Icons.picture_as_pdf),
                    ),
                    Divider(height: 10, indent: 10, color: Colors.orange),
                    Card(
                      color: Colors.blue,
                      elevation: 5,
                      margin: EdgeInsets.all(10),
                      child: InkWell(
                        child: const SizedBox(
                          width: 300,
                          height: 100,
                          child: Text('A card that can be tapped'),
                        ),
                      ),
                    ),
                    AlertDialog(title: Text('盤他'), content: Text('aaa'))
                  ],
                ))));
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
