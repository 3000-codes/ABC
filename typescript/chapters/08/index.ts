interface Customer{
  customname: string;
  buymoney: number;
}

type CustFn = (cust: Customer) => string;
// 获取CustFn的参数类型
/**
 *  (cust: infer P)=>string 的意思是 一个函数，这个函数的参数是cust，类型是infer P，返回值是string
 *  infer P 的意思是 从函数的参数中推断出P的类型
 *  CustFn extends (cust: infer P)=>string? P: never; 的意思是 如果CustFn是一个函数，这个函数的参数是cust，类型是infer P，返回值是string，那么P的类型就是CustFn的参数类型，否则P的类型就是never
 */
type CustFnParaTy=CustFn extends (cust: infer P)=>string? P: never;

type CustFnReturnTy=CustFn extends (cust: Customer)=>infer P? P: never;

type GetReturnType<T>=T extends (params:any)=>infer P? P: never;

type A=GetReturnType<CustFn>

type EleOfArr<T>=T extends Array<infer P>?P:never

const arr:number[] = [1]

type EA=EleOfArr<typeof arr>
