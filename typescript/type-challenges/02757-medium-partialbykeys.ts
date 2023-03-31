// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>
];

// ============= Your Code Here =============
type Copy<T>={
  [K in keyof T]: T[K];
}
type PartialByKeys<T, K ={}> =
  //  Omit<T,K>&Partial<Pick<T,K>>
  // type Test0=Omit<User, 'name' | 'age'>
  // type Test1=Partial<Pick<User, 'name' | 'age'>>
  Copy<
  {
    [P in keyof T as P extends K ? never : P]: T[P];
  } & {
    [P in keyof T as P extends K ? P : never]?: T[P];
  }>

  