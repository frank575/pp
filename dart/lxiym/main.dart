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
  num num1 = -1.0;
  num num2 = 2;

  '整數';
  int int1 = 3;

  '雙精度';
  double d1 = 1.68;
  print('----num type----');
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


  '字符串類型';
  String str1 = '字符串',
      str2 = "雙引號字符串";
  String str3 = str1 + ' ' + str2;

  '可以使用單或雙引號+\$[變量名稱]來拼接字符串';
  String str4 = '$str1 $str2';
  String str5 = 'hello world';

  '''
  常用方法
  擷取字符串 hel
  ''';
  print('----string type----');
  print(str5.substring(0, 3));

  '獲取字符串索引 6';
  print(str5.indexOf('wor'));
  'startsWith, replaceAll, contains, split...';


  '''
  布爾類型
  dart是強bool類型檢查，只有值是true才被認為是true
  ''';
  bool success = true,
      fail = false;
  print('----bool type----');
  print(success);
  print(fail);
  print(success || fail); // true
  print(success && fail); // false


  '''
  List集合 List<T>
  使用List, []表示集合
  ''';
  List list = [1, 3, 5, '集合'];
  print('----list type----');
  print(list);

  List<int> intList = [1, 3, 5];
  intList.add(7);
  intList.addAll([9, 11]);
  print(intList); // [1,3,5,7,9,11]

  'List.generate如同js的Array.from(new Array)';
  List list3 = List.generate(3, (i) => i * 2);
  print(list3);

  '''
  集合遍歷方式
  ''';
  for(int i=0;i<list3.length;i++){
    int e=list3[i];
  }
  for(var e in list) {}
  list3.forEach((e){});
  '常用方法removeXx,insert,sublist,indexOf,...';






}