import 'package:flutter/material.dart';

class TutorialHome extends StatelessWidget {
  const TutorialHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const IconButton(
          onPressed: null,
          icon: Icon(
            Icons.menu,
            color: Colors.white,
          ),
          tooltip: 'Navigation menu',
        ),
        title: const Text('Example title'),
        actions: const [
          IconButton(
            onPressed: null,
            icon: Icon(
              Icons.search,
              color: Colors.white,
            ),
            tooltip: 'Search',
          ),
        ],
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
          MyButton(),
          Counter(),
        ],
      ),
      floatingActionButton: const FloatingActionButton(
        tooltip: 'Add',
        child: Icon(Icons.add),
        onPressed: null,
      ),
    );
  }
}

class MyButton extends StatelessWidget {
  const MyButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        print('MyButton was tapped!');
      },
      child: Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: Colors.lightGreen.shade500,
        ),
        child: const Center(
          child: Text('Engage'),
        ),
      ),
    );
  }
}

class Counter extends StatefulWidget {
  const Counter({Key? key}) : super(key: key);

  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  var _count = 0;

  void _increment() {
    setState(() {
      _count++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Padding(
          padding: EdgeInsets.only(top: 8.0),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: _increment,
              child: const Text('Increment'),
            ),
            const Padding(
              padding: EdgeInsets.only(right: 8.0),
            ),
            Text(
              'Count: $_count',
            ),
          ],
        )
      ],
    );
  }
}

void main() {
  runApp(const MaterialApp(
    title: 'Flutter Tutorial',
    home: TutorialHome(),
  ));
}
