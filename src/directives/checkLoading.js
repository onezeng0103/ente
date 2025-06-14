import { createApp, h } from 'vue'
import viewLoadingGif from '@/assets/image/viewLoading.gif'

// 加载动画组件（可以替换成你自己的 Loading 组件）
const LoadingComponent = {
  render() {
    return h(
      'div',
      {
        class: 'global-loading',
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '9999999',
          position: 'fixed',
          width: '100vw',
          height: '100vh'
        }
      },
      [
        h('img', {
          src: viewLoadingGif,
          class: 'img',
          style: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }
        })
      ]
    )
  }
}

// 指令实现
const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(LoadingComponent)
    const instance = app.mount(document.createElement('div'))
    el.instance = instance // 保存实例以便卸载
    el.loadingContainer = el.appendChild(instance.$el) // 插入到目标元素

    // 初始状态
    toggleLoading(el, binding.value)
  },
  updated(el, binding) {
    toggleLoading(el, binding.value)
  },
  unmounted(el) {
    if (el.instance) {
      el.instance.$el.remove() // 移除 DOM
      el.instance = null
    }
  }
}

function toggleLoading(el, isLoading) {
  if (isLoading) {
    el.style.position = 'relative' // 确保父元素定位
    el.loadingContainer.style.display = 'flex'
  } else {
    el.loadingContainer.style.display = 'none'
  }
}

// 导出指令
export default loadingDirective
