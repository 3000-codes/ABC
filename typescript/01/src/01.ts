export{}
let str: string = 'Hello World';
console.log(str);

type DataFlow=string|number;

function foo(data:DataFlow){
  //  data.toLocaleString
  if(typeof data === 'string'){
    return data.concat('123');
  }
  data.toPrecision(2);
}


let data:any=[1,2,3];
let data2:number=data

let data3:unknown=[1,2,3];
// let data4:number=data3 //不可以 (unknown不是number的子类)


interface Person{
  name:string;
  age:number;
  eat():void;
}

class Student implements Person{
  name: string="zhangsan";
  age: number=18;

  eat(): void {
    throw new Error("Method not implemented.");
  }
}

const symid = Symbol();
interface Person2{
  [symid]:string|number;
  name:string;
  age:number;
}

type Name = Person2['name']; // string
type Values = Person2['name' | 'age']; // string | number
// type ID=Person2[symis] //=>Error
type ID=Person2[typeof symid] //=>string|number;

type Person2Keys = keyof Person2; // 'name' | 'age'

let k1:Person2Keys=symid
console.log(k1);

let str1:string|undefined
console.log(str1);

function fn(data?:string){
  // 三种写法
  data?.toLocaleString();
  if(data)data.toLocaleString();
  data&&data.toLocaleString();
}


let data4={
  name:'zs',
  age:18
} 
let username2: keyof typeof data4 = 'name';
let user2=data4[username2] //zs