// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Last<[3]>, 3>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]


// ============= Your Code Here =============
type CutHead<T extends any[]>=T extends [infer H,...infer Rest ]? Rest:never
// type GetTail<T extends any[]>=T extends [...infer Rest,infer Tail ]? Tail:never
type Last<T extends any[]> = T['length'] extends 1?T[0]: Last<CutHead<T>>

