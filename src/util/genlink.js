import store from 'storejs'
import normalizeUrl from 'normalize-url'

export function genImageLink(filekey) {
  const qiniuSettings = store.get('qiniuSettings')
  const url = `${qiniuSettings.domain}/${filekey}`

  return normalizeUrl(url)
}

export function genMarkdownLink(fileKey, filename) {
  const imglink = genImageLink(fileKey)

  return `![${filename ? filename : ''}](${imglink})`
}

export function genHtmlLink(fileKey, filename) {
  const imglink = genImageLink(fileKey)

  return `<img src="${imglink}" alt="${filename ? filename : ''}">`
}
