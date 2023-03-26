interface ITodo {
  title: string;
  completed: boolean;
  description: string;
  add(): number;
  delete(): number;
  update(): number;
}

class Todo implements ITodo {
  title: string
  completed: boolean
  description: string
  constructor (title: string, completed: boolean, description: string) {
    this.title = title
    this.completed = completed
    this.description = description
  }

  add (): number {
    return 1
  }

  delete (): number {
    return 1
  }

  update (): number {
    return 1
  }
}
// 将对象的方法提取出来,并且将方法名改为do+原首字母大写
type Degree<T extends Record<string, any>> = {
  [K in keyof T as T[K] extends () => any ? `do${Capitalize<K & string>}` : never]: T[K]
}

type DegreeTodo = Degree<ITodo>
