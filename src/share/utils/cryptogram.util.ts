import * as crypto from 'crypto'

/**
 * 获取文件hash
 * @param {*} file
 */

export const cryptoFileHash = (file: Buffer) => {
  const md5 = crypto.createHash('md5')
  return md5.update(file).digest('hex')
}

/**
 * 随机盐  产生随机字符串
 * @param len
 */
export function makeSalt(len = 3) {
  return crypto.randomBytes(len).toString('base64')
}

/**
 *  加密密码
 * @param password
 * @param salt
 * @returns
 */
export function cryptoPassword(password: string, salt: string): string {
  if (!password || !salt) return ''
  const tempSalt = Buffer.from(salt, 'base64')
  return crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
}
