// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Get<Data, "hello">, "world">>,
  Expect<Equal<Get<Data, "foo.bar.count">, 6>>,
  Expect<Equal<Get<Data, "foo.bar">, { value: "foobar"; count: 6 }>>,
  Expect<Equal<Get<Data, "foo.baz">, false>>,

  Expect<Equal<Get<Data, "no.existed">, never>>
];

type Data = {
  foo: {
    bar: {
      value: "foobar";
      count: 6;
    };
    included: true;
  };
  "foo.baz": false;
  hello: "world";
};

// ============= Your Code Here =============
type Split<T extends string, C extends string = "."> = T extends ""
  ? []
  :( T extends `${infer A}${C}${infer B}`
  ? [A, ...Split<B, C>]
  : [T])

type Sarr = Split<"foo.bar.count">;
type Get<T, K> = string;
