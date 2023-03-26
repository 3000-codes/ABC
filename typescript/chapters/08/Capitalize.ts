interface ITodo {
    title: string;
    completed: boolean;
    description: string;
    add():number;
    delete():number;
    update():number;
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
