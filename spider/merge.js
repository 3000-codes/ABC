import fs from 'fs'
import request from 'request'
import path from 'path'
import cheerio from 'cheerio'
import crypto from 'crypto'
const __dirname = path.resolve()

const getKey = async (url) => {}



const mergeTs = async () => {
  const dir = path.resolve(__dirname, '../ts')
  const files = fs.readdirSync(dir)
  // 文件排序后根据文件顺序依次写入
  files.sort((a, b) => {
    const aNum = Number(a.split('.')[0])
    const bNum = Number(b.split('.')[0])
    return aNum - bNum
  })
  const filePath = path.resolve(__dirname, '../video.mp4')
  const stream = fs.createWriteStream(filePath)
  files.forEach(file => {
    stream.write(fs.readFileSync(path.resolve(dir, file)))
  })
  stream.end()
  stream.on('close', function () {
    console.log('文件[' + filePath + ']合并完毕')
  })
}

mergeTs()
