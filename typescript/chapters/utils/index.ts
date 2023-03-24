function quickSort (arr:number[]):number[] {
  if (arr.length <= 1) {
    return arr
  }
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  const left:number[] = []
  const right:number[] = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}

function sortChinese (arr:string[]):string[] {
  return arr.sort((a, b) => a.localeCompare(b, 'zh-CN'))
}

function isChineseArr (strs:string[]):boolean {
  const chineseRex = /^[\u4e00-\u9fa5]+$/
  return strs.some((str) => chineseRex.test(str))
}
export {
  quickSort,
  sortChinese,
  isChineseArr
}
