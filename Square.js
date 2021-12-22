export default class Square {
  constructor({ id, width, bgImage, position }) {
    this.id = id
    this.width = width
    this.bgImage = bgImage
    this.position = position
  }
  
  get render() { 
    const div = document.createElement('div')
    const index = this.id.split('-')[0].match(/\d+/i)
    
    // div.innerHTML = `<pre style="font-size:30px; background-color:white;">x:${this.position.left}, y:${this.position.top}</pre>`
    
    div.setAttribute('id', this.id)
    div.setAttribute('data-width', this.width)
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
      z-index: ${index};
    `)
    
    return div
  }
}