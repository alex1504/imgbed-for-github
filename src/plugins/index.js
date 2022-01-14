import { httpFetch } from '../util'

export default function(Vue) {
  Vue.prototype.$fetch = httpFetch
  Vue.prototype.$bus = new Vue()
}
