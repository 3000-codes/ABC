type MethodsTy={
  menu:{
    setActiveIndex:(index:string)=>string
    setCollapse:(index:string)=>string
  }
  tabs:{
    setTab:(index:string)=>void
    setTabList:(index:string)=>void
    setCollapse:(index:string)=>string
  }
}

type MB<T, U>=`${T & string}/${U & string}`
/**
 * `${T & string}` 可以将 T 转换为 string 类型
 */
// type MBTest=MB<'menu', 'setActiveIndex'|'setCollapse'> // 'menu/setActiveIndex'|'menu/setCollapse'

type OpTy<T>={
  [key in keyof T]:MB<key, keyof T[key]>
}[ keyof T]

type TestOp=OpTy<MethodsTy>
