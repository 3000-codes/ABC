// 1. 类装饰器(不带参数)
function FirstClassDecorator(targetClass: any) {
  console.log("firstClassDecorator evaluated", targetClass);
  // let targetInstance = new targetClass();
  // targetInstance.buy()
  return targetClass
}

// 2. 类装饰器(带参数)
function SecondClassDecorator(param: string) {
  return function (targetClass: any) {
    console.log("secondClassDecorator evaluated", targetClass,param);
    // let targetInstance = new targetClass();
    // targetInstance.placeOrder()
    return targetClass
  }
}



@FirstClassDecorator
@SecondClassDecorator("参数") // 先执行第二个装饰器，再执行第一个装饰器
class CustomerService {
  name: string = "下单";
  buy() {
    console.log(this.name + "购买");
  }
  placeOrder(){
    console.log(this.name + "下单购买");
  }
}


// new CustomerService().placeOrder()

export{}