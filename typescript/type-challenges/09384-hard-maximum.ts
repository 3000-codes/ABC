// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Maximum<[]>, never>>,
  Expect<Equal<Maximum<[0, 2, 1]>, 2>>,
  Expect<Equal<Maximum<[1, 20, 200, 150]>, 200>>,
]


// ============= Your Code Here =============
type  A=[0, 2, 1]

type Maximum<T extends any[],Max extends number=0> = T['length'] extends 0?never:
T extends [infer H,...infer R]?
