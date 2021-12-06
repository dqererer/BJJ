const select = {
  bind (el, binding) {
    // 因为el-select最终会渲染成ul  li  ，所以我们要找到对应的ul元素节点，因为最底层的滚动条就是这个ul的
    const SELECTDOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    // 为对应的ul绑定滚动条滚动事件
    SELECTDOM.addEventListener('scroll', function () {
      const condition = this.scrollHeight - this.scrollTop == this.clientHeight
      // 判断滚动到底部
      if (condition) {
      // binding.value 为自定义指令绑定的值，因为绑定的是个方法，所以这里是方法调用，触发指令后执行加载数据
        binding.value()
      }
    })
  }
}

export default select
