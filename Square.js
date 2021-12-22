export default class Square {
  constructor({ id, width, bgImage, position }) {
    this.id = id
    this.width = width
    this.bgImage = bgImage
    this.position = position
  }
  
  get render() { 
    const div = document.createElement('div')
    
    div.setAttribute('id', this.id)
    div.setAttribute('style', `
    width: ${this.width}px;
    height: ${this.width}px;
    background-image: url('${this.bgImage.src}');
    background-position: ${this.bgImage.x}px ${this.bgImage.y}px;
    background-repeat: no-repeat;
    border: 1px solid red;
    position: absolute;
    top: ${this.position.top}px;
    left: ${this.position.left}px;
    `)
    
    // this.updateZindex(div)
    return div
  }

  // updateZindex(item) {
  //  item.addEventListener('mousedown', (_e) => {
  //     _e.preventDefault()
  //     _e.stopPropagation()
      
  //     console.log('mousedown')
      
  //   }, true)
    
  //   item.addEventListener('mouseup', (_e) => {
  //     _e.preventDefault()
  //     _e.stopPropagation()
      
  //     console.log('mouseup')

  //   }, true)
  // }
  
}