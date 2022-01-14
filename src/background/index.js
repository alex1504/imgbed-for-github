import store from 'storejs'

chrome.browserAction.onClicked.addListener(function(tab) {
  var w = 510
  var h = 460
  var left = Math.round(screen.width / 2 - w / 2)
  var top = Math.round(screen.height / 2 - h / 2)
  if (!checkOptions()) {
    chrome.tabs.create({
      url: 'options.html',
    })
    return
  }
  chrome.windows.create({
    url: 'popup.html',
    width: w,
    height: h,
    focused: true,
    left: left,
    top: top,
    type: 'popup',
  })
})

function checkOptions() {
  if (!store.get('qiniuSettings') && !store.get('githubSettings')) {
    return false
  }
  return true
}
