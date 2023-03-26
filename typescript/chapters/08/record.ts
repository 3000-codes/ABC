const obj = {
  name: 'John',
  age: 30,
  phone: [123, 456, 789],
  roleList: [
    { id: 1, name: 'admin' },
    { id: 2, name: ['user', 'guest'] }
  ]
}

type Omited= Omit<typeof obj, 'name' | 'age'>

type myOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P]
}
