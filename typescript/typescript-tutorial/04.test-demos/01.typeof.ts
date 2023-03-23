export { }
class A {
  o: object
  constructor() {
    this.o = {}
  }
  option(key: string, value: unknown) {
    let o = Object.create(null)
    o[key] = value
    Object.assign(this.o, o)
    // this.o[key] = value

    return this
  }
  get() {
    return this.o
  }
}
console.log(typeof A);

let a = new A()
console.log(typeof a)
const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()