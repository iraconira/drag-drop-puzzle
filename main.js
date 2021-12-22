import Square from './Square.js'
import Drag from './Drag.js'

const COLUMNS = 2

const getSquareDimensions = (bg, columns) => {
  const ratio = bg.width / bg.height
  const rows = columns / ratio
  const width = bg.width / columns
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

// get image dimensions
const background = new Image()
// background.src = 'https://deadline.com/wp-content/uploads/2021/10/The-Lion-King-e1635332653876.jpeg'
background.src = 'https://c8.alamy.com/compes/2e49eye/vaffanculo-vintage-clasico-american-poster-rosie-el-remachador-flexiona-su-biceps-y-declara-podemos-hacerlo-sufidos-como-un-gesto-italiano-2e49eye.jpg'
background.onload = () => {
  const squareDimensions = getSquareDimensions(background, COLUMNS)
  console.log('imgDimensions; ', background)
  console.log('squareDimensions: ', squareDimensions)

  const container = document.createElement('div')
  container.classList.add('container')
  container.setAttribute('style', `position:absolute; width:${squareDimensions.columns*squareDimensions.width}px; height:${squareDimensions.roundedRows*squareDimensions.width}px; border: 1px solid blue`)

  document.querySelector('body').appendChild(container)
  
  createPuzzle(background, squareDimensions)
}

const createPuzzle = (background, squareDimensions) => {
  let bgX = 0, bgY = 0

  for (let y = 0; y < squareDimensions.rows; y++) {
    
    for (let x = 0; x < squareDimensions.columns; x++) {
      
      bgX = -(x * squareDimensions.width)
      bgY = -(y * squareDimensions.width)
      
      const piece = new Square({
        id: `p-x${x}y${y}`,
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
      
      document.querySelector('.container').appendChild(piece)
      new Drag(piece, document).init()
    }
  }
}