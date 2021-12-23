export default class Rotate {
  constructor(item) {
    this.item = item
  }

  init() {
    this.item.addEventListener('dblclick', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()

      let rotation = 90
      if (this.item.style.transform) {
        rotation = Number(this.item.style.transform.match(/[0-9]+/g)[0]) + 90
      }

      this.item.style.transform = `rotate(${rotation}deg)`
      }, true)
    }
}