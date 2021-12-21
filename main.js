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
  const height = width
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
  console.log('imgDimensions; ', imgDimensions)
  console.log('squareDimensions: ', squareDimensions)

  const container = document.createElement('div')
  container.classList.add('container')
  container.setAttribute('style', `position:absolute; width:${squareDimensions.columns*squareDimensions.width}px; height:${squareDimensions.roundedRows*squareDimensions.height}px; border: 1px solid red`)

  document.querySelector('body').appendChild(container)
  
  createPuzzle(imgDimensions, squareDimensions)
}

const createPuzzle = (imgDimensions, squareDimensions) => {
  let bgX = 0, bgY = 0

  for(let y = 0; y < squareDimensions.rows; y++) {
    
    for (let x = 0; x < squareDimensions.columns; x++) {
      
        bgX = -(x * squareDimensions.width)
        bgY = -(y * squareDimensions.height)
        
        const svg = new createSVG({
            id: `p-x${x}y${y}`,
            width: squareDimensions.width,
            height: squareDimensions.height,
            stroke: 'black',
            background: {
              href: img.src,
              width: imgDimensions.width,
              height: imgDimensions.height,
              x: bgX,
              y: bgY,
            },
          }).getSVG

          
          document.querySelector('.container').appendChild(svg)
          dragElement(svg);
    }
  }
}


function dragElement(elmnt) {
  console.log(elmnt)
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  // if (document.getElementById(elmnt.id)) {
  //   /* if present, the header is where you move the DIV from:*/
  //   document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  // } else {
  //   /* otherwise, move the DIV from anywhere inside the DIV:*/
  // }
  elmnt.onmousedown = dragMouseDown;
  
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }
  
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}