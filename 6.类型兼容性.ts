// 接口的兼容性
// 如果 x 要兼容 y，那么 y 至少具有与 x 相同的属性
// 检查函数参数时使用相同的规则
namespace A {
  interface Named {
    name: string;
  }

  let x: Named;
  let y = { name: 'Alice', location: 'Seattle' };
  x = y;

  function greet(n: Named) {
    console.log('Hello, ' + n.name);
  }
  greet(y);
}

// 函数的兼容性
// x 的每个参数在 y 中都能找到对应的参数，所以允许赋值
namespace B {
  let x = (a: number) => 0;
  let y = (b: number, s: string) => 0;

  y = x; // OK
  // x = y; // Error
}

// 类的兼容性
namespace C {
  class Animal {
    feet: number = 0;
  }

  class Size {
    feet: number = 1;
  }

  let a: Animal = new Animal();
  let s: Size = new Size();

  a = s;  // OK
  a = { feet: 2 }; // OK
}

// 枚举的兼容性
// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的

// 函数参数的协变
namespace D {
  type logFunc = (a: number | string) => void;

  let log1: logFunc;

  function log2(a: number | string | boolean): void {
    console.log(a);
  }

  log1 = log2; // 兼容，但是调用 log1 只能传入 number 和 string 了
  // log1(false); // 报错：类型“boolean”的参数不能赋给类型“string | number”的参数
}
