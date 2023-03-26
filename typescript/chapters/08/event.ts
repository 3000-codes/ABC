type MouseEvent={
  eventType:'click',
  x:number,
  y:number
}

type KeyEvent={
  eventType:'keyUp',
  code:number
}

type EventFunc<Events extends Record<string, any>, EventKey extends keyof Events>={
  [Event in Events as Event extends Events?Event[EventKey]:never]:(event:Event)=>any
  // [Event in Events as Event[EventKey]]:(event:Event)=>any // 简写,但是不好理解
}
/**
 * 注意点1: KeyEvent|MouseEvent 变成了联合类型,所以遍历 Event in Events 时,Event 为 KeyEvent或MouseEvent,而不是KeyEvent或MouseEvent的子属性
 * 注意点2: as Event extends Events?Event[EventKey]:never 为了让 Event 变成 keyof Events,可以提取
 */
type Rec=EventFunc<KeyEvent|MouseEvent, 'eventType'>

export {}
