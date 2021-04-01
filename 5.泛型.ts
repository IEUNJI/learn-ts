// 函数泛型
function createArray<T>(length: number, value: T): Array<T> {
  let result: Array<T> = [];

  for (let i = 0; i < length; i++) {
    result[i] = value;
  }

  return result;
}

let result = createArray<string>(3, 'x');
console.log(result); // [ 'x', 'x', 'x' ]

// 类泛型
class MyArray<T> {
  private list: T[] = [];

  add(val: T) {
    this.list.push(val);
  }

  getMax(): T {
    let result = this.list[0];

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] > result) {
        result = this.list[i];
      }
    }

    return result;
  }
}

let arr1 = new MyArray<number>();
arr1.add(1);
arr1.add(2);
arr1.add(3);

let res1: number = arr1.getMax();
console.log(res1); // 3

let arr2 = new MyArray<string>();
arr2.add('1');
arr2.add('2');
arr2.add('3');

let res2: string = arr2.getMax();
console.log(res2); // '3'

// 接口泛型
interface First {
  <T>(a: T, b: T): T;
}

let firstFn: First = function <T>(a: T, b: T): T {
  return a;
}

let res3: number = firstFn<number>(1, 2);
console.log(res3); // 1

interface Cart<T> {
  list: T[]
}

let cart: Cart<string> = {
  list: ['1', '2', '3']
};

// 多个类型参数
function swap<A, B>(tuple: [A, B]): [B, A] {
  return [tuple[1], tuple[0]];
}

let res4 = swap<string, number>(['1', 2]);
console.log(res4); // [2, '1']

// 泛型约束
interface LengthWise {
  length: number
}

function logger<T extends LengthWise>(val: T): void {
  console.log(val.length); // 3
}

logger('123');

// 泛型类型别名
// 接口interface是一个真正的类型，类型别名type并不是一个真正的类型
// 类型别名type不能被实现和继承
// 类型别名type更适合联合类型

type MyCart<T> = { list: T[] } | T[];

let cart1: MyCart<string> = {
  list: ['1', '2', '3']
};

let cart2: MyCart<number> = [1, 2, 3];
