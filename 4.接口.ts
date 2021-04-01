// 接口
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 可选属性
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });

// 只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 可索引的类型
// 支持字符串和数字2种索引签名
// 因为JavaScript会转换数字为字符串，所以数字索引的返回值必须是字符串索引返回值类型的子类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 类类型

// 实现接口
// 类可以实现接口，且可以实现多个接口
// 对于类的构造函数的约束，可以通过工厂函数传参的形式进行约束
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }

  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }

  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// 继承接口
// 接口可以继承接口，且可以继承多个接口
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square: Square = { color: "blue", sideLength: 10 };

// 继承类
// 接口继承类，会继承类的成员但不包括其实现，接口同样会继承到类的 private 和 protected 成员，这意味着这个接口类型只能被这个类或其子类所实现

// 重写和重载
// 重写是子类实现父类的方法，重载是函数根据参数的不同，实现不同的逻辑
