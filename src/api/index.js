import { httpFetch } from '../util'

/**
    token: A-OceKHjP80h7bvq9TE5J0DrKazEw707laHo5jtm:8gEa39Pjhg_fO3cJNVcCkk8ZwBs=:eyJzY29wZSI6ImJsb2ciLCJkZWFkbGluZSI6MTY0MTU0NTQ2ODc1MX0=
    id: WU_FILE_0
    name: 测试.png
    type: image/png
    lastModifiedDate: Tue May 18 2021 11:45:30 GMT+0800 (中国标准时间)
    size: 304048
    file: (binary)
 */
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
