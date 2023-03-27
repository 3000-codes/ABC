// 1. 类装饰器(不带参数)
function LogDecorator<T extends {new (...args:any[]):any}>(target: T) {
  // class LogDecoratorClass extends target {
  //   name: string = "下单";
  //   constructor(...args: any[]) {
  //     super(...args);
  //     console.log("LogDecoratorClass", this);
  //   }
  // }
  // return LogDecoratorClass;
  return class extends target {
    name: string = "下单";
    constructor(...args: any[]) {
      super(...args);
      console.log("LogDecoratorClass", this);
    }
  }
}

@LogDecorator
class CustomerService {
  name: string = "下单";
  buy() {
    console.log(this.name + "购买");
  }
  placeOrder() {
    console.log(this.name + "下单购买");
  }
}

new CustomerService();
