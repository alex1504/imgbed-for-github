import { md5 } from 'md5js'

function _parseFilename(filename) {
  const dotIndex = filename.lastIndexOf('.')
  const fileBaseName = filename.slice(0, dotIndex)
  const fileExt = filename.slice(dotIndex, filename.length)

  return [fileBaseName, fileExt]
}

function _getRandomMd5(filename) {
  return md5(
    String(Math.floor(Math.random() * Math.pow(10, 9) + Date.now())) + filename
  )
}

export function hashHandler(filename) {
  const [fileBaseName, fileExt] = _parseFilename(filename)
  const uniqueRandomHash = _getRandomMd5(fileBaseName)

  return uniqueRandomHash + fileExt
}

export function datePrefixHandler(filename) {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const date = today
    .getDate()
    .toString()
    .padStart(2, '0')

  return year + month + date + '_' + filename
}

export function timePrefixHandler(filename) {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const date = today
    .getDate()
    .toString()
    .padStart(2, '0')
  const hours = today
    .getHours()
    .toString()
    .padStart(2, '0')
  const minutes = today
    .getMinutes()
    .toString()
    .padStart(2, '0')
  const seconds = today
    .getSeconds()
    .toString()
    .padStart(2, '0')

  return year + month + date + '_' + hours + minutes + seconds + '_' + filename
}
