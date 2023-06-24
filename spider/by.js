import { getM3u8, parseM3u8, downloadTs } from './index.js'
import fs from 'fs'
import path from 'path'

const url = ``

function limitQueue(urls, cb, limit = 10) {
  // 完成任务数
  let i = 0
  // 填充满执行队列
  for (let excuteCount = 0; excuteCount < limit; excuteCount++) {
    run()
  }
  // 执行一个任务
  function run() {
    // 构造待执行任务 当该任务完成后 如果还有待完成的任务 继续执行任务
    new Promise((resolve, reject) => {
      const url = urls[i]
      i++
      resolve(cb(url))
    }).then(() => {
      if (i < urls.length) run()
    })
  }
}

const main = async () => {
  const m3u8 = await getM3u8(url)
  const tsList = await parseM3u8(m3u8)
  // await Promise.all(tsList.map((ts, index) => downloadTs(ts, index)))
  // console.log(tsList)
  limitQueue(tsList, ts => {
    const name = ts.split('/').pop()
    downloadTs(ts, name)
  })
}
// main()
const __dirname = path.resolve()
const mergeTs = async () => {
  // clearTs()
  const dir = path.resolve(__dirname, '../ts')
  let files = fs.readdirSync(dir)
  files = files
    .filter(file => file.startsWith('out'))
    .sort((a, b) => {
      const num = name => name.match(/\d+/)[0]
      return num(a) - num(b)
    })
  // 文件排序后根据文件顺序依次写入
  const filePath = path.resolve(__dirname, '../video.mp4')
  const writeStream = fs.createWriteStream(filePath)
  files.forEach(file => {
    const data = fs.readFileSync(path.resolve(dir, file))
    writeStream.write(data)
  })
  writeStream.end()
  writeStream.on('close', function () {
    console.log('文件[' + filePath + ']合并完毕')
  })
}

mergeTs()
