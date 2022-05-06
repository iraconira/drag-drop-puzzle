import Square from './Square.js'
import Drag from './Drag.js'
import Rotate from './Rotate.js'

const COLUMNS = 20

const getSquareDimensions = (bg, columns) => {
  const ratio = bg.width / bg.height
  const rows = columns / ratio
  const width = Math.floor(bg.width / columns)
  const roundedRows = Math.floor(rows)
  const pieces = columns * roundedRows

  return {
    ratio,
    columns,
    rows,
    roundedRows,
    pieces,
    width
  }
}

const container = document.createElement('div')
container.classList.add('container')
document.querySelector('body').appendChild(container)


// get image dimensions
const background = new Image()
background.src = 'https://deadline.com/wp-content/uploads/2021/10/The-Lion-King-e1635332653876.jpeg'
background.onload = () => {
  const squareDimensions = getSquareDimensions(background, COLUMNS)
  container.setAttribute('style', `position:absolute; width:${squareDimensions.columns*squareDimensions.width}px; height:${squareDimensions.roundedRows*squareDimensions.width}px; border: 1px solid blue`)
  createPuzzle(background, squareDimensions)
}

const createPuzzle = (background, squareDimensions) => {
  let bgX = 0, bgY = 0, index = 0

  for (let y = 0; y < squareDimensions.rows; y++) {
    for (let x = 0; x < squareDimensions.columns; x++) {
      bgX = -(x * squareDimensions.width)
      bgY = -(y * squareDimensions.width)
      index ++

      const piece = new Square({
        id: `p${index}-x${x}y${y}`,
        width: squareDimensions.width,
        bgImage: {
          src: background.src,
          x: bgX,
          y: bgY,
        },
        position: {
          left: -bgX,
          top: -bgY
        }
      }).render

      container.appendChild(piece)

      new Drag(piece, container).init()

      new Rotate(piece).init()
    }
  }
}

