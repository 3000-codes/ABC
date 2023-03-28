// ============= Test Cases =============
import type { Alike, Expect } from './test-utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}



// let t:TodoProp='title'
// let a:MyPicks<TodoProp,'title' | 'description'>='description'

// ============= Your Code Here =============
type MyReadonly2<T, K extends keyof T= keyof T> = 
// Readonly<Pick<T, K>> & Omit<T, K>
{
  readonly [P in K]:T[P]
}&
{
  [P in  Exclude<keyof T,K>]:T[P]
}
