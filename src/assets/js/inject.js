function waitForElementToDisplay(
  selector,
  callback,
  checkFrequencyInMs,
  timeoutInMs
) {
  var startTimeInMs = Date.now()
  ;(function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback()
      return
    } else {
      setTimeout(function() {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs) return
        loopSearch()
      }, checkFrequencyInMs)
    }
  })()
}

waitForElementToDisplay(
  '.file-actions',
  function() {
    var el = document.querySelector('.file-actions')
    var node = document.createElement('button')

    /**
     * 获取上传成功后的链接，插入编辑器下一行
     */
    window.addEventListener('message', function(event) {
      console.log('响应数据', event)
      if (event.data.eventName === 'get_upload_data_success') {
        var markdownLink = event.data.data || ''

        updateCodeMirror(markdownLink)
      }
    })

    node.addEventListener('click', e => {
      e.preventDefault()
      window.postMessage({ eventName: 'get_upload_data' }, '*')
    })

    node.innerText = '粘贴链接'
    node.className = 'btn'
    el.insertBefore(node, document.querySelector('.js-code-indent-mode'))
  },
  1000,
  9000
)

/**
 * 插入数据到编辑器鼠标的指针所在下一行
 */
function updateCodeMirror(data) {
  var cm = document.querySelector('.CodeMirror').CodeMirror
  var doc = cm.getDoc()
  var cursor = doc.getCursor()
  var line = doc.getLine(cursor.line)
  var pos = {
    line: cursor.line,
    ch: line.length,
  }
  doc.replaceRange('\n' + data, pos)
}
