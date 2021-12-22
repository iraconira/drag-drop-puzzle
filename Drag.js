export default class Drag {

  constructor(draggable, wrapper) {
    this.draggable = draggable
    this.wrapper = wrapper
    this.offset = [0, 0]
    this.isDown = false
  }
  
  init() {
    this.addMouseDownListener()
    this.addMouseUpListener()
    this.addMouseMoveListener()
  }

  updateZindex(value) {
    this.draggable.style.zIndex = value
  }

  addMouseDownListener() {
    this.draggable.addEventListener('mousedown', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()

      this.updateZindex(1)
      
      this.isDown = true
      this.offset = [
        this.draggable.offsetLeft - _e.clientX,
        this.draggable.offsetTop - _e.clientY,
      ]
    }, true)
  }
  
  addMouseUpListener() {
    this.wrapper.addEventListener('mouseup', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()
      
      this.updateZindex('auto')
      // const innerOffset = [_e.clientX, _e.clientY]
      
      if (this.isDown) {
        // bounce(e.target)
        // this.draggable.style.left = `${innerOffset[0]}px`
        // this.draggable.style.top  = `${innerOffset[1]}px`
        this.isDown = false;
      }
    }, true)
  }
  
  addMouseMoveListener() {
    this.wrapper.addEventListener('mousemove', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()

      if (this.isDown) {
            this.draggable.style.left = (_e.clientX + this.offset[0]) + 'px';
            this.draggable.style.top  = (_e.clientY + this.offset[1]) + 'px';
        }
    }, true)
  }
}