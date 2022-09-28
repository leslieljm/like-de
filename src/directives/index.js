// 把自定义指令逻辑写在这个文件里

// 自定义指令v-imgerror的逻辑：当图片加载不出来时，使用默认图片
export const imgerror = {
  inserted(el, binding) {
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
