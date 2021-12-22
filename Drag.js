export default class Drag {

  constructor(draggable, wrapper) {
    this.draggable = draggable
    this.wrapper = wrapper
    this.offset = [0, 0]
    this.initialOffset = [0, 0]
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

      this.updateZindex(100)
      
      this.isDown = true
      this.offset = [
        this.draggable.offsetLeft - _e.clientX,
        this.draggable.offsetTop - _e.clientY,
      ]

      this.initialPosition = [
        this.draggable.style.left,
        this.draggable.style.top 
      ]
    }, true)
  }
  
  addMouseUpListener() {
    this.wrapper.addEventListener('mouseup', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()
      
      this.updateZindex('auto')
      
      if (this.isDown) {
        this.isDown = false
        this.dropInExactPlace()

        // console.log([_e.clientX, _e.clientY])
        // this.draggable.style.left = `${this.initialOffset[0]}px`
        // this.draggable.style.top  = `${this.initialOffset[1]}px`
      }
      
    }, true)
  }
  
  addMouseMoveListener() {
    this.wrapper.addEventListener('mousemove', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()
      
      if (this.isDown) {
        this.draggable.style.left = `${(_e.clientX + this.offset[0])}px`
        this.draggable.style.top  = `${(_e.clientY + this.offset[1])}px`
        
        this.changeOpacity()
        // console.log(this.offset)
      }
      
    }, true)
  }

  isOverlapping(item) {
    return item.offsetLeft < this.draggable.offsetLeft && this.draggable.offsetLeft < item.offsetLeft + item.offsetWidth 
      && item.offsetTop < this.draggable.offsetTop && this.draggable.offsetTop < item.offsetTop + item.offsetHeight
  }

  changeOpacity() {
    this.wrapper.childNodes.forEach((item) => {
        this.isOverlapping(item)
          ? item.style.opacity = 0.5
          : item.style.opacity = 1
    })
  }

  dropInExactPlace() {
    this.wrapper.childNodes.forEach((item) => {
      if (this.isOverlapping(item)) {
        this.draggable.style.left = item.style.left
        this.draggable.style.top  = item.style.top 
        item.style.left = this.initialPosition[0]
        item.style.top = this.initialPosition[1]
      }
  })
  }

}