import 'reflect-metadata'
export type MyParamDec=(target:any, paramname:string, paramindex:number)=>void

export function InjectConstructorDec (injectId?:string):MyParamDec {
  return function (target, paramname, paramindex) {
    console.log('InjectConstructorDec called')
    console.log('target', target)
    console.log('paramname', paramname)
    console.log('paramindex', paramindex)
    const paramtypes = Reflect.getMetadata('design:paramtypes', target)
    console.log('paramtypes', paramtypes)
    const paramtypeObj = new paramtypes[paramindex]()
    console.log('paramtypeObj', paramtypeObj)
  }
}
