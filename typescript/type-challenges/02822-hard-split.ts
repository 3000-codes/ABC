// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Split<'Hi! How are you?', 'z'>, ['Hi! How are you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ' '>, ['Hi!', 'How', 'are', 'you?']>>,
  Expect<Equal<Split<'Hi! How are you?', ''>, ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']>>,
  Expect<Equal<Split<'', ''>, []>>,
  Expect<Equal<Split<'', 'z'>, ['']>>,
  Expect<Equal<Split<string, 'whatever'>, string[]>>,
]


// ============= Your Code Here =============
type Split<T extends string, C extends string = "."> = 
Equal<T,string>extends true?T[]:
C extends ''?(T extends `${infer A}${infer B}`?[A, ...Split<B, C>]:[]):
T extends
 ""
  ? ['']
  :
  (T extends `${infer A}${C}${infer B}`
  ? [A, ...Split<B, C>]
  : [T])

type T1=Split<string, 'whatever'>