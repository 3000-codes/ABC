import fs from 'fs/promises'
import { createReadStream, createWriteStream } from 'fs'
import path from 'path'
import { parseM3u8 } from './utils/m3u8reader.js'
import { downloadTs, getKey, hex2ArrayBuffer } from './utils/fragment.js'
// import getPage, { getM3u8Url } from './utils/page.js'
// import Decrypter from './src/crypt/decrypter.js'
import crypto from 'crypto'
const __dirname = path.resolve()
// let keyUrl = '' // 密钥地址
// let IV = '' //偏移量

// 5. 解析m3u8文件，提取ts文件列表地址
// const parseM3u8 = async m3u8Body => {
//   // keyUrl = m3u8Body.match(/URI="(.*)"/)[1] // 获取key地址
//   // IV = m3u8Body.match(/IV=(.*)/)[1] // 获取偏移量
//   const lines = m3u8Body.split('\n')
//   const tsList = lines.filter(line => line.startsWith('https://'))
//   return tsList
// }

function bufferToArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}

function streamToArrayBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', chunk => {
      chunks.push(chunk)
    })
    stream.on('end', () => {
      const buffer = Buffer.concat(chunks)
      resolve(bufferToArrayBuffer(buffer))
    })
    stream.on('error', reject)
  })
}

const test = async () => {
  const { URI, IV } = await parseM3u8('../m3u8/test.m3u8')
  const key = await getKey(URI)
  const iv = hex2ArrayBuffer(IV)
  const inputFilePath = path.resolve(__dirname, '../ts/0.ts')
  const outputFilePath = path.resolve(__dirname, '../ts/0.mp4')
  const readStream = createReadStream(inputFilePath)
  const writeStream = createWriteStream(outputFilePath)
  streamToArrayBuffer(readStream).then(async buffer => {
    const data = await new Decrypter({ enableSoftwareAES: true }).decrypt(buffer, key, iv)
    writeStream.write(new Uint8Array(data))
    writeStream.end()
    writeStream.on('close', function () {
      console.log('文件[' + outputFilePath + ']合并完毕')
    })
    // const decipher = crypto.createDecipheriv(
    //   'aes-128-cbc',
    //   key.slice(0, 16),
    //   Buffer.from(iv.slice(0, 16))
    // )
    // const data = Buffer.concat([decipher.update(Buffer.from(buffer)), decipher.final()]) // 解密
    // writeStream.write(data)
    // writeStream.end()
  })
}
test()
