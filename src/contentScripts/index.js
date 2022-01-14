import store from 'storejs'

function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject.js'
  var temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  temp.src = chrome.extension.getURL(jsPath)
  temp.onload = function() {
    this.parentNode.removeChild(this)
  }
  document.head.appendChild(temp)
}

injectCustomJs('assets/js/inject.js')

/**
 * 作为inject.js 和 popup.js的桥梁
 */
window.addEventListener('message', function(event) {
  if (event.data.eventName === 'get_upload_data') {
    chrome.runtime.sendMessage({ eventName: 'get_upload_data' }, function(res) {
      window.postMessage({
        eventName: 'get_upload_data_success',
        data: res,
      })
    })
  }
})
