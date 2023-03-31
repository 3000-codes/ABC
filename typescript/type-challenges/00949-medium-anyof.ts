// ============= Test Cases =============
import type { Equal, Expect,NotEqual } from './test-utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]


// ============= Your Code Here =============
// extends true ?true:false
// extends true ?true:false
// extends true ?true:false
// extends true ?true:false
// extends true ?true:false
type AnyOf<T extends readonly any[]> = 
T extends Array<infer R>?
R extends string?NotEqual<R,''> 
: R extends number?NotEqual<R,0> 
: R extends boolean?NotEqual<R,false> 
: R extends undefined?NotEqual<R,undefined> 
: R extends null?NotEqual<R,null> 
: R extends any[]?R['length'] extends 0?false
: R extends Record<string|number,any>?keyof T extends never
?true:false
:false
:false
:true


type Test1=AnyOf<[0, '',false,1]>
