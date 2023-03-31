// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]


// ============= Your Code Here =============
type Whitespace = ' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Whitespace}${infer R}`? TrimLeft<R>: S;
type TrimRight<S extends string> = S extends `${infer R}${Whitespace}`? TrimRight<R>: S;
 
type Trim<S extends string> = 
S extends `${Whitespace}${infer R}`?
Trim<TrimLeft<R>>:
TrimRight<S> 

type T1=Trim<'   \n\t foo bar \t'>