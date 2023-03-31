// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]


// ============= Your Code Here =============
type Merge<F, S> ={
  [P in Exclude<keyof F,keyof S> as P extends keyof F? P:never]:P
}
&F

type Keys=Exclude<keyof Foo,keyof Bar>
type Mer=Merge<Foo, Bar>

let mer:Mer={
  a:1,
  b:1,
  // c:true
}