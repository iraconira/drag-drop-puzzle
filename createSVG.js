/* {
  id: '',
  height: '',
  viewBox: '',
  stroke: 'black',
  fill: 'none',
  background: {
    href: '',
    width: '',
    height: '',
    x: 0,
    y: 0
  }
} */

export default class createSVG {
  constructor({
    id,
    width,
    height,
    stroke = 'black',
    background = null,

  }) {
    this.id = id
    this.width = width
    this.height = height
    this.viewBox = `0 0 ${width} ${height}`
    this.stroke = stroke

    if (background) {
      this.bgHref = background.href
      this.bgWidth = background.width
      this.bgHeight = background.height
      this.bgX = background.x
      this.bgY = background.y
    }
  }

  get getSVG() {
    // <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
    // <rect width="100" height="100" stroke="black"/>
    // </svg>
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svg.setAttribute('id', `${this.id}`)
    svg.setAttribute('width', this.width)
    svg.setAttribute('height', this.height)
    svg.setAttribute('viewBox', this.viewBox)
    svg.setAttribute('fill', this.fill)
    
    if (this.bgHref) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
      
      const pattern = document.createElementNS(defs.namespaceURI, 'pattern')
      pattern.setAttribute('id', `pattern-id-${this.id}`)
      pattern.setAttribute('patternUnits', 'userSpaceOnUse')
      pattern.setAttribute('width', this.bgWidth)
      pattern.setAttribute('height', this.bgHeight)
      
      const image = document.createElementNS(defs.namespaceURI, 'image')
      image.setAttribute('href', this.bgHref)
      image.setAttribute('width', this.bgWidth)
      image.setAttribute('height', this.bgHeight)
      image.setAttribute('x', this.bgX)
      image.setAttribute('y', this.bgY)

      pattern.appendChild(image)
      defs.appendChild(pattern)
      svg.appendChild(defs)
    }

    const rect = document.createElementNS(svg.namespaceURI, 'rect')
    rect.setAttribute('d', this.d)
    rect.setAttribute('width', this.width)
    rect.setAttribute('height', this.height)
    rect.setAttribute('stroke', this.stroke)
    rect.setAttribute('fill', `url(#pattern-id-${this.id})`)

    svg.appendChild(rect)

    return svg
  }
}