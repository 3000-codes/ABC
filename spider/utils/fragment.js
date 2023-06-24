import { access, mkdir, readdir, stat, rmdir, unlink } from 'fs/promises'
import { createWriteStream } from 'fs'
import path from 'path'
import request from 'request'
import fetch from 'node-fetch'
import headers from './headers.js'
import Decrypter from '../src/crypt/decrypter.js'

const __dirname = path.resolve()
const downloadTs = async (url, name) => {
  const dir = path.resolve(__dirname, '../ts')
  try {
    await access(url)
  } catch (error) {
    console.log('文件夹不存在')
    await mkdir(dir, { recursive: true })
  }
  const filePath = path.resolve(dir, `${name}.ts`)
  const writeStream = createWriteStream(filePath)
  console.log('开始下载文件[' + filePath + ']:', url)
  request(url, { headers }).pipe(writeStream)
  writeStream.on('close', function () {
    console.log('文件[' + filePath + ']下载完毕')
  })
}

const getKey = async keyUrl => fetch(keyUrl, { headers }).then(res => res.arrayBuffer())
const hex2ArrayBuffer = hex => {
  const typedArray = new Uint8Array(hex.match(/[\da-f]{2}/gi).map(h => parseInt(h, 16)))
  const buffer = typedArray.buffer
  return buffer
}
const decryptTs = async (url, op) => {
  const key = await getKey(op.keyUrl)
  const data = await new Decrypter({ enableSoftwareAES: true }).decrypt(
    request(url, { headers }), // 这里肯定要改
    key,
    hex2ArrayBuffer(op.IV)
  )
  return data
}

const mergeTs = async (dirPath, name, op, sortFn) => {
  const dir = path.resolve(__dirname, dirPath)
  let files = await readdir(dir)
  files = sortFn?.(files) || files
  const filePath = path.resolve(dir, `${name}.mp4`)
  const writeStream = createWriteStream(filePath)
  files.forEach(async file => {
    writeStream.write(await decryptTs(path.resolve(dir, file), op))
  })
  writeStream.end()
  writeStream.on('close', function () {
    console.log('文件[' + filePath + ']合并完毕')
  })
}

const deleteFolderRecursive = async folderPath => {
  const isDirectory = await stat(folderPath).then(stat => stat.isDirectory())
  if (isDirectory) {
    const files = await readdir(folderPath)
    for (const file of files) {
      const curPath = path.join(folderPath, file)
      await deleteFolderRecursive(curPath)
    }
    await rmdir(folderPath)
  } else {
    await unlink(folderPath)
  }
}

export { downloadTs, mergeTs, deleteFolderRecursive, getKey, hex2ArrayBuffer }
