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
    document.addEventListener('mouseup', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()
      
      this.updateZindex('auto')
      
      if (this.isDown) {
        this.isDown = false
        this.dropInExactPlace()
      }
      
    }, true)
  }
  
  addMouseMoveListener() {
    document.addEventListener('mousemove', (_e) => {
      _e.preventDefault()
      _e.stopPropagation()
      
      if (this.isDown) {
        this.draggable.style.left = `${(_e.clientX + this.offset[0])}px`
        this.draggable.style.top  = `${(_e.clientY + this.offset[1])}px`
        
        this.changeOpacity()
      }
    }, true)
  }

  isOverlapping(item) {
      const fixed = item.getBoundingClientRect()
      const moved = this.draggable.getBoundingClientRect()

      return (fixed.x > moved.x && moved.x+moved.width > fixed.x + fixed.width/2) &&
        (fixed.y+fixed.width/2 > moved.y && moved.y+moved.height > fixed.y + fixed.height/2)
        ||
        (fixed.x < moved.x && fixed.x + fixed.width/2 > moved.x) &&
        (fixed.y < moved.y && fixed.y + fixed.width/2 > moved.y)
        ||
        (fixed.y+fixed.width/2 > moved.y && moved.y+moved.height > fixed.y + fixed.height/2) &&
        (fixed.x < moved.x && fixed.x+fixed.width/2 > moved.x)
      
  }

  changeOpacity() {
    this.wrapper.childNodes.forEach((item) => {
        this.isOverlapping(item)
          ? item.style.opacity = 0.5
          : item.style.opacity = 1
    })
  }

  dropInExactPlace() {
    let initialState = false

    this.wrapper.childNodes.forEach((item) => {
      if (this.isOverlapping(item)) {
        this.draggable.style.left = item.style.left
        this.draggable.style.top = item.style.top 
        item.style.left = this.initialPosition[0]
        item.style.top = this.initialPosition[1]

        initialState = true
      } 
  })
    if (!initialState){
      this.draggable.style.left = this.initialPosition[0]
      this.draggable.style.top = this.initialPosition[1]
    }
  }
}