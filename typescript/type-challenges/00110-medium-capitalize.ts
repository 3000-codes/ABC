// ============= Test Cases =============
import type { Equal, Expect } from './test-utils'

type cases = [
  Expect<Equal<MyCapitalize<'foobar'>, 'Foobar'>>,
  Expect<Equal<MyCapitalize<'FOOBAR'>, 'FOOBAR'>>,
  Expect<Equal<MyCapitalize<'foo bar'>, 'Foo bar'>>,
  Expect<Equal<MyCapitalize<''>, ''>>,
  Expect<Equal<MyCapitalize<'a'>, 'A'>>,
  Expect<Equal<MyCapitalize<'b'>, 'B'>>,
  Expect<Equal<MyCapitalize<string>, never>>,
]

// ============= Your Code Here =============
type MyCapitalize<S extends string> =
Equal<S,string> extends true?never:
S extends `${infer H}${infer R}`?`${Uppercase<H>}${R}`:S //已经排除了空串和单个字符

type T1= MyCapitalize<string>

