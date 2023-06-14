import _,{curry,compose,prop,last,head,reduce,add,map,replace,lowerCase, join, filter, sortBy, concat, reverse, flip } from "lodash/fp";
const match = curry(function(what: RegExp, str: string) {
  return str.match(what)
})

let result = match(/\s+/g, "hello world")
console.log(result)

const toUpperCase = (x: string) => x.toUpperCase() 
const exclaim = (x: string) => x + '!'
const shout = compose(exclaim, toUpperCase)
console.log(shout("send in the clowns"))

type Car={
  name:string,
  horsepower:number,
  dollar_value:number,
  in_stock:boolean
}

const CARS:Car[] = [
  {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
  {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
];

// 提取最后的in_stock
const isLastInStock = compose(prop('in_stock'),last)
console.log(isLastInStock(CARS))

// 获取第一辆car的name
const nameOfFirstCar =compose(prop('name'),head)
console.log(nameOfFirstCar(CARS));

// 计算均价
const _average = function(xs:number[]) { return reduce(add, 0, xs) / xs.length; };
const averageDollarValue =compose(_average,map(prop('dollar_value')))
console.log(averageDollarValue(CARS));

// 将车名全部小写并改为用 _ 连接
const _underscore = replace(/\W+/g, '_') // 空格转 _ 
const lowerCaseNames=map(compose(lowerCase,prop('name'))) // 将所有name转为小写
const sanitizeNames =compose(map(_underscore))
const CARS_NAME=lowerCaseNames(CARS)
console.log(sanitizeNames(CARS_NAME))
const sanitizeNamesPro = _.map(_.compose(_underscore, lowerCase, prop('name')));

// var availablePrices = function(cars:Car[]) {
//   var available_cars = _.filter(_.prop('in_stock'), cars);
//   return available_cars.map(function(x){
//     return x.dollar_value
//   }).join(', ');
// };

// 获取在售车的价格
const availablePrices=compose(join(','),map(prop('dollar_value')),filter(prop('in_stock')))
console.log(availablePrices(CARS));

const fastestCar =compose(join(' '), reverse, concat("is the fastest"),prop('name'),last,sortBy(prop('horsepower')))
console.log(fastestCar(CARS));

const append=flip(concat) // 将参数顺序反转然后传入回调函数
const fastestCarPro=compose(append(' is the fastest'),prop('name'),last,sortBy(prop('horsepower')))
console.log(fastestCarPro(CARS));
console.log(append('a',['b'])); // b,a
console.log(append('a')(['b'])); // a,b
