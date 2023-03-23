import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>
]

// @ts-expect-error
type error = MyAwaited<number>

// type MyAwaited<T extends Promise<any>> = T extends Promise<infer R> ? R : never //只需要判断一层时
type MyAwaited<T extends Promise<unknown>> = T extends Promise<infer R> ? (R extends Promise<unknown> ? MyAwaited<R> : R) : never


