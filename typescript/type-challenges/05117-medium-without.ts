// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
]


// ============= Your Code Here =============
type Without<T extends any[], U> = 
// U extends any[]?
// (

// ):
T extends [infer First,...infer Rest]?
First extends U ?Without<Rest,U>:[T,...Without<Rest,U>]:T


type Test1=Without<[1, 2], 3>