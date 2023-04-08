class B5Paper {
  size = 'B5'
}

class A4Paper {
  size = 'A4'
}

class GrayInk {
  color = 'gray'
}

class InkPrint {
  paper:B5Paper = new B5Paper()
  ink:GrayInk = new GrayInk()
  print () {
    console.log('InkPrint')
  }
}

class LaserPrint {
  paper:A4Paper = new A4Paper()
  print () {
    console.log('LaserPrint')
  }
}

// 依赖注入本质: 创建与使用分离
