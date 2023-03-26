type Ref<T=any>={
  value:T
}

function ref<T> (value:T):Ref<T> {
  return {
    value
  }
}

function isRef (r :any):r is Ref {
  return Boolean(r && r.__v_isRef)
}

function unref<T> (ref:T):T extends Ref<infer V>?V:T {
  return isRef(ref) ? ref.value : ref
}

export {}
