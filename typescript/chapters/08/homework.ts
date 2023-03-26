const data = [
  {
    name: 'John',
    no: 1,
    stuClass: 'class1',
    teacherNo: 1,
    teacherName: 'teacher1'
  }
]

type Student = typeof data[0]

type SubItems<T extends Record<string, any>, S extends keyof T> = (data:T[], ...keys:S[])=>Record<S, string|number>[]

function getSubItems<T extends Record<string, any>, S extends keyof T> (data:T[], ...keys:S[]):Record<S, any>[] {
  return data.map(item => {
    const subItem = {} as Record<S, any>
    keys.forEach(key => {
      subItem[key] = item[key]
    })
    return subItem
  })
}

const subItems = getSubItems(data, 'teacherName')
