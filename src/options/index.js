import Vue from 'vue'
import 'bulma-fluent/bulma.sass'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../global.scss'
import App from './App.vue'
import plugin from '../plugins'

Vue.use(ElementUI)
Vue.use(plugin)

// eslint-disable-next-line
new Vue({
  el: '#app',
  render: h => h(App),
})
