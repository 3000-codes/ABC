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