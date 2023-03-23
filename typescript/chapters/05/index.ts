export class Vechile{
    constructor(public color: string){}
    protected honk(): void{
        console.log('beep');
    }
}

export class Car extends Vechile{
    constructor(public wheels: number, color: string){
        super(color);
    }
    private drive(): void{
        console.log('vroom');
    }
    startDrivingProcess(): void{
        this.drive();
        this.honk();
    }
}

export class Truck extends Vechile{
    constructor(public wheels: number, color: string){
        super(color);
    }
    private drive(): void{
        console.log('vroom');
    }
    startDrivingProcess(): void{
        this.drive();
        this.honk();
    }
}

export class Customer{
    constructor(public firstName: string, public lastName: string){}
    rent(vechile: Vechile): void{
        console.log('rented a vechile');
        (vechile as Car).startDrivingProcess()
    }
}

const customer = new Customer('John', 'Doe');
const car = new Car(4, 'red');
customer.rent(car);

let a: any = 'this is a string';
let b = <string>a;


// 自定义类型守卫 is
class Foo {}
class Bar {}

function isFoo(arg: Foo | Bar): arg is Foo {
    return arg instanceof Foo;
}

function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
        // arg is now of type Foo
        arg;
    } else {
        // arg is now of type Bar
        arg;
    }
}

// 字面量类型守卫
const convert = (c: 'a' | 1) => {
  if (c === 1) {
      return c.toFixed()
  } else if (c === 'a') {
      return c.toLowerCase()
  }
}


