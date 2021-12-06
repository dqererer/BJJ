(function flexible(window, document) {
  var docEl = document.documentElement
  //dpr 物理像素比
  var dpr = window.devicePixelRatio || 1
  // adjust body font size 设置body字体大小
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    } else {
      //如果页面没有body 这个元素，则只用DOMContentLoaded 监听，等待 DOM 元素加载完毕
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();
  // set 1rem = viewWidth / 10 设置html 元素字体大小
  function setRemUnit() {
    var rem = docEl.clientWidth / 18.999
    docEl.style.fontSize = rem + 'px'
  }
  setRemUnit()
  // reset rem unit on page resize 当页面尺寸大小发生改变时，重新设置一下rem大小。
  window.addEventListener('resize', setRemUnit)
  //pageshow 是我们重新加载页面触发的事件
  window.addEventListener('pageshow', function (e) {
    //e.persisted 返回的是 true 就是如果这个页面从缓存中获取过来，也要重新设置rem大小
    if (e.persisted) {
      setRemUnit()
    }
  })
  // detect 0.5px supports 解决移动端浏览器支持0.5像素
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
