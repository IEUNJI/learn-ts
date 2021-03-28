export default 'hello typescript';

const name: string = 'ieunji';
const age: number = 18;
const married: boolean = false;

// 数组 元素类型后面接上[]
const hobbies: string[] = ['1', '2', '3'];
// 数组泛型 Array<元素类型>
const interests: Array<string> = ['4', '5', '6'];

// 元组 已知元素数量和类型的数组
let x: [string, number] = ['1', 2];

// 枚举
enum Color {
  Red,
  Green,
  Blue
}

// 常数枚举
const enum Type {
  A,
  B,
  C
}

console.log(Type.A, Type.B, Type.C);

// 任意类型
const root: any = document.getElementById('root');
root.style.color = 'red';

// null undefined 所有类型的子类型
// 空值 void 函数无返回值时使用
function getName(name: string): void {
  console.log(name);
}

// never 所有类型的子类型 表示函数不能正常结束（报错，死循环）
function createError(msg: string): never {
  throw new Error(msg);
}

// 类型推论
let num = 1; // let num: number

// 联合类型
let myAge: string | number;

// 类型断言 jsx 中只能使用 as 语法
myAge = '18';
(myAge as string).toString();
(<string>myAge).toString();

// 字面量类型
let myName: 'ieunji' | 'linzijun';
myName = 'ieunji';
