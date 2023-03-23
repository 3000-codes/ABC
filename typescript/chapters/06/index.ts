export class ArrayList<T=any> {
  private items: T[] = []

  add (item: T) {
    this.items.push(item)
  }

  get (index: number): T {
    return this.items[index]
  }

  get length (): number {
    return this.items.length
  }

  toString (): string {
    return this.items.join(',')
  }

  [Symbol.iterator] (): Iterator<T> {
    let i = 0
    return {
      next: () => {
        if (i < this.items.length) {
          return { value: this.items[i++], done: false }
        } else {
          return { done: true, value: null }
        }
      }
    }
  }
}

interface Ref<T> {
  value: T;
}
function ref<T> (value: T): Ref<T> {
  return { value }
}

const obj = ref({ name: 'John', age: 30 })
console.log(obj.value.age)

class Order {
  orderid!:string|number
  orderName!:string
  static orderStatus:string = 'pending'
  printOrder () {};
  static printOrderStatus () {};
}

type InstanceProps<T extends object> = keyof T;
type OrderProps = InstanceProps<Order>;

const orderProps:OrderProps = 'orderid'

type TypA=string|number
type KeysTyp<K>=K extends TypA?K:never

type TypC=KeysTyp<string|number|boolean>

const c:TypC = '1'
