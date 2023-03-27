/**
 * 
 * @param target 原型
 * @param propertyKey 方法名
 * @param descriptor 数据描述符: value, writable, enumerable, configurable, get, set
 */
function methodsDecorator(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log("methodsDecorator", this);
    return originalMethod.apply(this, args);
  }

}


class CustomerService {
  name: string = "下单";
  @methodsDecorator
  buy() {
    console.log(this.name + "购买");
  }
  placeOrder(){
    console.log(this.name + "下单购买");
  }
}


new CustomerService().buy()

export{}