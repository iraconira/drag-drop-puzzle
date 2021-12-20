/* {
  id: '',
  height: '',
  viewBox: '',
  d: '',
  stroke: 'black',
  fill: 'none',
  background: {
    src: '',
    width: '',
    height: '',
    x: 0,
    y: 0
  }
} */

export default class createSVG {
  constructor({
    id,
    sizeRatio,
    width,
    height,
    d,
    stroke = 'black',
    rotation,
    background = null,

  }) {
    this.id = id
    this.width = width * sizeRatio
    this.height = height * sizeRatio
    this.viewBox = `0 0 ${width} ${height}`
    this.d = d
    this.stroke = stroke
    this.rotation = rotation

    if (background) {
      this.bgHref = background.href
      this.bgWidth = background.width
      this.bgHeight = background.height
      this.bgX = background.x
      this.bgY = background.y
    }
  }

  get getSVG() {
    // <svg xmlns="http://www.w3.org/2000/svg" width="170" height="198" viewBox="0 0 170 198" fill="none">
    //   <defs xmlns="http://www.w3.org/2000/svg">
    //       <pattern id="img1" patternUnits="userSpaceOnUse" width="600" height="450">
    //           <image href="https://dxgh891opzso3.cloudfront.net/files/5/9/6/9/2/shutterstock_1045743757.jpg" x="0" y="0" width="600" height="450"/>
    //       </pattern>
    //   </defs>
    //   <path d="M79.9383 40.8614C79.9246 40.6432 79.9008 40.4245 79.868 40.2055H79.9363L79.812 39.6043C79.3733 37.4819 78.121 35.2432 76.7916 32.8667L76.7617 32.8132C74.0667 27.9953 70.9567 22.4076 72.4077 15.1511C74.3596 7.77892 79.9257 0.499999 90.5886 0.5C99.7927 0.500001 106.819 6.90693 108.767 15.5336C110.112 22.924 107.43 27.1627 104.874 31.1938L104.844 31.2409C103.098 33.9946 101.371 36.7189 101.221 40.2608H101.189L101.183 40.755C101.183 40.8009 101.182 40.8468 101.182 40.8927C101.182 46.6346 105.854 51.2861 111.612 51.2861H111.624C112.411 51.2861 112.989 51.2861 113.567 51.2513C114.979 51.1661 116.38 50.8728 120.974 49.9105L121.07 49.8903L121.073 49.8898C127.639 48.5145 140.728 45.7732 169.5 40.3094L169.5 197.5H11.5349C6.02591 168.697 3.26417 155.607 1.87978 149.046L1.87938 149.044C0.888676 144.349 0.613558 143.038 0.533165 141.714C0.500181 141.171 0.5 140.624 0.5 139.827C0.5 134.641 4.72017 130.433 9.92991 130.433C13.4214 130.433 16.0564 132.079 18.9972 133.93L19.0061 133.935C23.0868 136.503 27.6256 139.36 35.4396 137.944L35.4496 137.943L35.4596 137.94C44.5258 135.912 51.3411 128.547 51.3411 118.853C51.3411 107.624 43.5609 101.785 35.8745 99.7695L35.86 99.7657L35.8454 99.7628C28.1724 98.2338 22.2669 101.513 17.4569 104.184L17.4192 104.205C15.9893 104.999 14.6669 105.733 13.4097 106.288C12.1591 106.841 11.0053 107.201 9.91426 107.272C4.71172 107.264 0.500003 103.06 0.500004 97.8787C0.500004 97.0811 0.500185 96.5342 0.533169 95.9913C0.613562 94.6678 0.888778 93.3564 1.87948 88.661C3.26242 82.1067 6.01996 69.0375 11.5188 40.2899C40.3656 45.7672 53.4775 48.5135 60.051 49.8903L60.0518 49.8905L60.1487 49.9108C64.7426 50.8729 66.1426 51.1661 67.5544 51.2513C68.1326 51.2861 68.711 51.2861 69.4976 51.2861H69.5093C75.2679 51.2861 79.9393 46.6346 79.9393 40.8927V40.8771L79.9383 40.8614Z" stroke="black" fill="url(#img1)"/>
    // </svg>
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    svg.setAttribute('id', `${this.id}`)
    svg.setAttribute('width', this.width)
    svg.setAttribute('height', this.height)
    svg.setAttribute('viewBox', this.viewBox)
    svg.setAttribute('fill', this.fill)
    svg.setAttribute('style', `transform: rotate(${this.rotation}deg)`)
    
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

    const path = document.createElementNS(svg.namespaceURI, 'path')
    path.setAttribute('d', this.d)
    path.setAttribute('stroke', this.stroke)
    path.setAttribute('fill', `url(#pattern-id-${this.id})`)

    svg.appendChild(path)

    return svg
  }
}