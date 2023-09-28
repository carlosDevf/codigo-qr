import qrcode from 'https://cdn.skypack.dev/qrcode';
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

// en la medida de lo posible tratar de no instalar packetes para todo
const form = document.querySelector('form')
const downloadButton = document.querySelector('#download')
console.log({ downloadButton })

form.addEventListener('submit', async function(e){
  // esto previene que el form actualice
    e.preventDefault();        
    // caputrar la informacion de input con un addEventListener
    const formData = new FormData(e.target)
    let value = formData.get('qr')
    const color1 = formData.get("color1")
    const color2 = formData.get("color2")

    // Object.formEntries    
    const svgCode = await qrcode.toString(value, {
      type: 'image/jpeg',
      quality: 0.3,           
      color: {
        light: color1 || '#3685FF',
        dark: color2 || '#ffffff',
      },
      width: 300,
      height: 300,      
    })

    const picture = document.querySelector('#qr-picture')            
    const newNode = document.createElement('source')    
    newNode.innerHTML = svgCode
      
    picture.replaceChild(newNode, picture.firstElementChild)
    picture.classList.remove('hidden')
    confetti()
})

downloadButton.addEventListener('click', async function(e){  
  const formData = new FormData(form)
  let value = formData.get('qr')
  const color1 = formData.get("color1")
  const color2 = formData.get("color2")

  const svgCode = await qrcode.toString(value, {
    type: 'image/svg',
    quality: 0.3,           
    color: {
      light: color1 || '#3685FF',
      dark: color2 || '#ffffff',
    },
    width: 300,
    height: 300,      
  })
  
  const blob = new Blob([svgCode], { type: 'image/svg'})
  const url = window.URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.setAttribute('href', url)
  a.setAttribute('download', 'codigo.svg')
  a.click()
})



