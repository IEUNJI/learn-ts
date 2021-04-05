// 交叉类型 &

// 索引类型查询操作符 索引访问操作符 keyof
interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: 'Jarid',
  age: 35
};

function getValueByKey(obj: Person, key: keyof Person): any {
  return obj[key];
}

getValueByKey(person, 'name');

// 映射类型 in
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// }
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// }

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;

// Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
// Extract<T, U> -- 提取T中可以赋值给U的类型。
// NonNullable<T> -- 从T中剔除null和undefined。
// ReturnType<T> -- 获取函数返回值类型。
// InstanceType<T> -- 获取构造函数类型的实例类型。
