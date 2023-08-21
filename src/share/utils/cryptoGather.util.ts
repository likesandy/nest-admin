import * as crypto from 'crypto'

/**
 * 获取文件hash
 * @param {*} file
 */

export const cryptoFileHash = (file: Buffer) => {
  const md5 = crypto.createHash('md5')
  return md5.update(file).digest('hex')
}
