// 函数类型包含两部分：参数类型和返回值类型
function add(x: number, y: number): number {
  return x + y;
}

type myAddType = (x: number, y: number) => number;

const myAdd: myAddType = function (x: number, y: number): number {
  return x + y;
};

// 可选参数
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return firstName + ' ' + lastName;
  }
  else {
    return firstName;
  }
}

// 默认参数
function ajax(url: string, methods: string = 'GET'): void {
  console.log(url, methods);
}

// 剩余参数
function sum(...nums: Array<number>): void {
  console.log(nums);
}

// 重载
function sayType(val: string): void;
function sayType(val: number): void;
function sayType(val: any): void {
  if (typeof val === 'string') {
    console.log('string', val);
  } else if (typeof val === 'number') {
    console.log('number', val);
  }
}
