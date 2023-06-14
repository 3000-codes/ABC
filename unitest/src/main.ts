import { compose } from "lodash/fp"

type FN=(...args:any[])=>any
class IO{
  _value:FN

  static of(value:any){
    return new IO(() => value)
  }
  constructor(fn:FN){
    this._value = fn
  }

  map(fn:FN){
    return new IO(compose(fn,this._value))
  }
}

const io_window = new IO(()=>window);

io_window.map(function(win){ return win.innerWidth }); // IO(() => 1000)
