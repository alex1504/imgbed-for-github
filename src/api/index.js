import { httpFetch } from '../util'

export function uploadQiniu(
  data = {
    file,
    token,
    name,
    type,
    lastModifiedDate,
    size,
    file,
  }
) {
  const API_URL = 'https://up.qiniup.com/'
  const formData = new FormData()
  object.keys(data).forEach(key => {
    formData.append(key, data[key])
  })

  return httpFetch(API_URL, {
    method: 'post',
    body: formData,
  })
}
