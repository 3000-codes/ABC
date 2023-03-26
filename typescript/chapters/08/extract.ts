type A = string | number | boolean
type B = Extract<A, string> //= > string
type C = Exclude<A, string> //= > number | boolean

export {}
