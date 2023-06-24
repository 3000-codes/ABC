import request from 'request'
import cheerio from 'cheerio'
/**@description 获取页面内容 */
const getPage = async url => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) reject(err)
      resolve(body)
    })
  })
}

/**@description 获取m3u8文件地址 */
const getM3u8Url = async html => {
  const $ = cheerio.load(html)
  const configJSON = $('.dplayer').attr('config')
  const config = JSON.parse(configJSON)
  const url = config.video.url
  return url
}
export { getM3u8Url, getM3u8 }
export default getPage
