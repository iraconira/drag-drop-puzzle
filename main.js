// import anime from './node_modules/animejs/lib/anime.es.js'
// anime({
//   targets: '#testsvg path',
//   strokeDashoffset: [anime.setDashoffset, 0],
//   easing: 'easeInOutQuad',
//   duration: 5000,
//   direction: 'alternate',
//   loop: true
// })

import createSVG from './createSVG.js'
import shapes from './shapes.js'

const COLUMNS = 6

const getSquareDimensions = (imgDimensions, columns) => {
  const ratio = imgDimensions.width / imgDimensions.height
  const rows = columns / ratio
  const width = imgDimensions.width / columns
  const height = imgDimensions.height / rows
  const roundedRows = Math.floor(rows)
  const pieces = columns * roundedRows

  return { 
    ratio, 
    columns, 
    rows, 
    roundedRows, 
    pieces, 
    width, 
    height 
  }
}

// get image dimensions
const imgDimensions = {}
const img = new Image()
img.src = 'https://deadline.com/wp-content/uploads/2021/10/The-Lion-King-e1635332653876.jpeg'
img.onload = () => {
  { imgDimensions.width = img.width, imgDimensions.height = img.height }
  const squareDimensions = getSquareDimensions(imgDimensions, COLUMNS)
  const sizeRatio = squareDimensions.width / 100
  console.log('imgDimensions; ', imgDimensions)
  console.log('squareDimensions: ', squareDimensions)
  
  createPuzzle(sizeRatio, imgDimensions, squareDimensions)
}

const createPuzzle = (sizeRatio, imgDimensions, squareDimensions) => {
  console.log('sizeRatio: ', sizeRatio)
  let index = 0
  
  let piece = 'L0T1R0B1',
    row = 1,
    bgX = 0,
    bgY = 0,
    rotation = 0

  for (let i = 1; i <= squareDimensions.pieces; i++) {
    
    console.log('loop: ', i)
    
    // first row
    if (i <= COLUMNS) {
      bgX = - ((i-1) * squareDimensions.width)
      console.log('bgX: ', bgX)
      console.log('first row: ', i)
      
      // inner pieces are L1R1B0 or L0R0B1 by default
      if (i % 2 === 0) {
        piece = 'L1R1B0'
      } else {
        piece = 'L0R0B1'
      }
      
      // first piece
      if (i === 1) {
        piece = 'R0B1'
      }

      // last piece
      if (i === COLUMNS) {
        piece = 'R0B1'
        rotation = 90
      }

      const shape = shapes[piece]
      const svg = new createSVG({
          id: `${piece}-${i}`,
          sizeRatio,
          width: shape.width,
          height: shape.height,
          d: shape.d,
          stroke: 'black',
          rotation,
          background: {
            href: img.src,
            width: imgDimensions.width,
            height: imgDimensions.height,
            x: bgX,
            y: bgY,
          },
        }).getSVG
        
        const R0B190 = svg.cloneNode()
        R0B190.setAtt 
      
        document.querySelector('body').appendChild(svg)
    }
    


    // // end of row
    // if (i % COLUMNS === 0) {
    //   console.log('end of row: ', i)
    // }
    
    // // last piece
    // if (i === squareDimensions.pieces) {
    //   console.log('last piece: ', i)
    // }
  }

  // for (const item in shapes) {
  //   const shape = shapes[item]
  //   // console.log(shape)
  //   // console.log(index)
    
  //   const svg = new createSVG({
  //       id: `${item}-${index}`,
  //       sizeRatio,
  //       width: shape.width,
  //       height: shape.height,
  //       d: shape.d,
  //       stroke: 'black',
  //       background: {
  //         href: img.src,
  //         width: imgDimensions.width,
  //         height: imgDimensions.height,
  //         x: 0,
  //         y: 0,
  //       },
  //     }).getSVG
      
  //     const R0B190 = svg.cloneNode()
  //     R0B190.setAtt 
    
  //     document.querySelector('body').appendChild(svg)
  //     index++
  // } 
}