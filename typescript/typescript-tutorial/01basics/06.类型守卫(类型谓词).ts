export {}
interface interfaceA {
  name: string
  age: number
}
interface interfaceB {
  name: string
  height: number
}

type interfaceC = interfaceA | interfaceB
const isInterfaceA = (item: interfaceC): item is interfaceA => {
  return (item as interfaceA).age !== undefined
}

//判断target是否是isInterfaceA类型的子类型
let target: interfaceC = {
  name: '1',
  age: 1
}
if (isInterfaceA(target)) {
  console.log('isInterfaceA')
} else {
  console.log('is not InterfaceA')
}

//使用泛型替代类型谓词
function isOfType<T>(target:unknown,prop:keyof T):target is T{
  return (target as T)[prop]!==undefined
}
let target1:interfaceC = {
  name: '1',
  age: 1
}
if(isOfType<interfaceA>(target1,'age')){
  console.log('isOfType')
}