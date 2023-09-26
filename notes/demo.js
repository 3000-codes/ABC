// const arr = [1, 2],
//   obj = {};
// arr[Symbol.toPrimitive] = function (hint) {
//   return hint;
// };

// arr.valueOf = function () {
//   return this;
// };

// console.log(+arr + obj + arr + obj);

const avl = [] == ![];

console.log([+avl, [] + 1] == [1, 1] + []);

Array.from = f;
