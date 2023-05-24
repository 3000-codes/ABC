function Fn(value) {
    if(! new.target) {
        return new Fn(value)
    }
  this.value = value
}
Fn.prototype.add = function (value) {
    this.value += value
    return this
}

Fn.prototype.res= function () {
    return this.value
}

let a = Fn(1).add(2).add(3).res()
console.log(a) // 6