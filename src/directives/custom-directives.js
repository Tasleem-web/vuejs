export const inputFocus = {
  mounted(el) {
    el.focus()
  },
}

export const colorChange = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'green';
    el.style.color = !binding.value ? 'white' : 'black';
  }
}