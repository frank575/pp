void main() {
  '''
  dart 靜態強類型OOP語言
    JIT 即時編譯, 開發期間, 更快編譯, 更快的重載
    AOT 事前編譯, release期間, 更快更流暢
  ''';

  '''
  常用數據類型
    數字類型
    num 數字類型的父類
  ''';
  print('----num type----');
  num num1 = -1.0;
  num num2 = 2;

  '整數';
  int int1 = 3;

  '雙精度';
  double d1 = 1.68;
  print('num:$num1, num:$num2, int:$int1, double:$d1');

  '''
  常用方法
  絕對值
  ''';
  num1.abs();

  '轉換成int類型';
  num1.toInt();

  '轉換成double類型';
  num1.toDouble();

  '''
  字符串類型
  ''';
  print('----string type----');
  String str1 = '字符串', str2 = "雙引號字符串";
  String str3 = str1 + ' ' + str2;

  '可以使用單或雙引號+\$[變量名稱]來拼接字符串';
  String str4 = '$str1 $str2';
  String str5 = 'hello world';

  '''
  常用方法
  擷取字符串 hel
  ''';
  print(str5.substring(0, 3));

  '獲取字符串索引 6';
  print(str5.indexOf('wor'));
  'startsWith, replaceAll, contains, split...';

  '''
  布爾類型
  dart是強bool類型檢查，只有值是true才被認為是true
  ''';
  print('----bool type----');
  bool success = true, fail = false;
  print(success);
  print(fail);
  print(success || fail); // true
  print(success && fail); // false

  '''
  List集合 List<T>
  使用List, []表示集合
  ''';
  print('----list type----');
  List list = [1, 3, 5, '集合'];
  print(list);

  List<int> intList = [1, 3, 5];
  intList.add(7);
  intList.addAll([9, 11]);
  print(intList);
  '[1,3,5,7,9,11]';

  'List.generate如同js的Array.from(new Array)';
  List list3 = List.generate(3, (i) => i * 2);
  print(list3);

  '''
  集合遍歷方式
  ''';
  for (int i = 0; i < list3.length; i++) {
    int e = list3[i];
  }
  for (var e in list) {}
  list3.forEach((e) {});
  '常用方法removeXx,insert,sublist,indexOf,...';

  '''
  Map key-value
  ''';
  print('----list type----');
  Map users = {'1': 'frank', 2: 'jeff'};
  print(users);
  Map ages = {};
  ages['frank'] = 24;

  '遍歷';
  ages.forEach((key, value) {});
  'dart map也可以使用map, 這裡用MapEntry更改原本的key-value';
  Map ages2 = ages.map((key, value) => MapEntry(value, key));
  print('ages: $ages');
  '{frank: 24}';
  print('ages2: $ages2');
  '{24: frank}';
  for (var key in ages.keys) {
    '\${}如同js的\${}, 用來處理非單一值得區塊';
    print('$key: ${ages[key]}');
  }
  '''
  ages.key == Object.keys(arr)
  ages.values == Object.values(arr)
  ''';
  '常見方法keys,values,remove,containsKey';

  '''
  dynamic, var, Object三者區別
  ''';
  print('----dynamic, var, Object三者區別----');
  dynamic aa = 'aa';
  '運行時的type, dynamic只能在運行時知道type, 但會讓dart語法檢查失效';
  print(aa.runtimeType);
  'String';
  print(aa);
  // aa.foo(); 不會報錯，因為放棄類型檢查
  aa = 123;
  print(aa.runtimeType);
  'int';
  print(aa);

  'var 為類型推斷，申明是什麼類型最終就是什麼類型';
  var aaa = 'aaa';
  print(aaa.runtimeType);
  'String';
  print(aaa);
  // aaa=123; 報錯，aaa應該是字串

  'Object dart對象的基類';
  Object o1 = '111';
  print(o1.runtimeType); //String
  print(o1);
  // o1.foo() 與dynamic插在不能調用Object裡沒有的方法

  '''
  OOP
  ''';
  '實例化可以省略new關鍵字';
  var person = Person('frank', 24);
  print(person);

  var student = Student('真香國小', 'frank', 24);
  print(student);

  var log1 = Logger();
  var log2 = Logger();
  print(log1 == log2);
  log1.log('hello world');
}

// OOP 在dart裡所有類都繼承於Object
class Person {
  String name;
  int age;

  // constructor, 可以使用這種方式省略 this.name=name, ... 的寫法
  // this.xxx == 初始化自有參數
  Person(this.name, this.age);

  @override
  String toString() {
    '可以使用@override複寫父類方法';
    return 'Person:: name: $name, age: $age';
  }
}

//繼承
class Student extends Person {
  String _school; // 通過_表示私有字段
  String? city; // ? 表示可選
  String? country;
  String name;

  // 初始化子類必須要調用父類構造方法(super)
  // {}表示可選參數, =xx默認參數
  Student(this._school, String name, int age,
      {this.country = 'taiwan', this.city = 'taichung'})
      :
        // 初始化列表：除了調用父類構造器，在子類構造器方法體之前，你也可以初始化實例變量，不同的初始化變量之間用逗號分開
        // 這裡的name=為this.name=，不是構造參數的name
        name = '$country.$city.$name',
        // 如果父類沒有默認構造方法，則需要在初始化列表中調用父類的構造方法
        // super(值, 值) // 將值傳給父類構造器
        super(name, age) {
    '構造方法體 不是必需的';
    print('this.name: ${this.name}, name: $name');
  }

  // 命名構造方法: [類明.方法名]
  // 使用命名構造方法為類實現多個構造方法
  Student.cover(Student stu, this._school, this.name): super(stu.name, stu.age);

  @override
  String toString() {
    return '_school: $_school, city: $city, name: $name';
  }
}

class Logger {
  static Logger _cache = Logger._internal();
  factory Logger(){
    '''
    工廠構造方法：
    不僅是構造方法，更是一種模式
    有時候為了返回一個之前已經創建的緩存對象, 原始的構造方法已經不能滿足要求
    那麼便可使用工廠模式來定義構造方法(也可理解為單例)
    ''';
    return Logger._cache;
  }
  Logger._internal();
  void log(String msg) {
    print(msg);
  }
}

class Logger2 {
  String history;
  Logger2(this.history);

  factory Logger2.v(Logger2 log){
    '''
    命名工廠構造方法：factory 類名.方法名
    她可以有返回值, 而且不需要將類型的final變量作為參數，是提供一種靈活獲取類對象的方式
    可以當作靈活的命名構造類看待
    ''';
    return Logger2(log.history);
  }
}