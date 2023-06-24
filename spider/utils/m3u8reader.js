import request from 'request'
import path from 'path'
import { createReadStream } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import m3u8Parser from 'm3u8-parser'
import m3u8 from 'm3u8'

const __dirname = path.resolve()
/**@description 获取m3u8文件内容 */
const getM3u8 = async url => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    })
  })
}

/**@description 下载m3u8文件 */
const downloadM3u8 = async (url, name) => {
  const m3u8Body = await getM3u8(url)
  const dir = path.resolve(path.resolve(), './m3u8') // 当前目录下的m3u8文件夹
  await mkdir(dir, { recursive: true })
  const filePath = path.resolve(dir, `${name}.m3u8`)
  await writeFile(filePath, m3u8Body)
}

/**@description 解析m3u8文件 */
// const parseM3u8 = async filePath => {
//  filePath = path.resolve(__dirname, filePath)
// const m3u8Body = await fs.readFile(filePath, 'utf-8')
//   const parser = new m3u8Parser.Parser()
//   parser.push(m3u8Body)
//   parser.end()
//   const parsedManifest = parser.manifest
//   console.log(parsedManifest.segments[0].key)
//   const tsList = parsedManifest.segments.map(item => item.uri)
//   return tsList
// }

const parseM3u8 = async filePath => {
  filePath = path.resolve(__dirname, filePath)
  const parser = m3u8.createStream()
  const readStream = createReadStream(filePath)
  readStream.pipe(parser)
  // parser.on('item', function (item) {
  // console.log(item)
  // emits PlaylistItem, MediaItem, StreamItem, and IframeStreamItem
  // })
  return new Promise((resolve, reject) => {
    parser.on('m3u', function (m3u) {
      const tsList = m3u.items.PlaylistItem.map(item => item.properties.uri)
      const EXTXKEY = m3u.properties['EXT-X-KEY']
      const URI = EXTXKEY.match(/URI="(.*)"/)[1]
      const IV = EXTXKEY.match(/IV=(.*)/)[1]
      resolve({ tsList, URI, IV })
    })
  })
}

export { getM3u8, downloadM3u8, parseM3u8 }
