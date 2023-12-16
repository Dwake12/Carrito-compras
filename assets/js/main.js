const autos = [
  {
    id: 1,
    marca: "mazda",
    modelo: 2020,
    color: "azul",
    precio: 2500,
    image: "assets/img/galeria/background_01.jpg",
    cantidad: 1,
  },
  {
    id: 2,
    marca: "lamborghini",
    modelo: 2023,
    color: "azul",
    precio: 3000,
    image: "assets/img/galeria/background_02.jpg",
    cantidad: 1,
  },
  {
    id: 3,
    marca: "mustang",
    modelo: 2021,
    color: "blanco",
    precio: 5000,
    image: "assets/img/galeria/background_03.jpeg",
    cantidad: 1,
  },
  {
    id: 4,
    marca: "vmw",
    modelo: 2019,
    color: "negro",
    precio: 2000,
    image: "assets/img/galeria/background_04.jpg",
    cantidad: 1,
  },
  {
    id: 5,
    marca: "ferrari",
    modelo: 2019,
    color: "negro",
    precio: 2000,
    image: "assets/img/galeria/background_05.jpg",
    cantidad: 1,
  },
  {
    id: 6,
    marca: "mustang",
    modelo: 2022,
    color: "negro",
    precio: 6000,
    image: "assets/img/galeria/background_06.jpg",
    cantidad: 1,
  }
];

const cards = document.getElementById("cards")
const items = document.getElementById("items")
const footer = document.getElementById("footer")
const templateCard = document.getElementById("template-card").content
const templateFooter = document.getElementById("template-footer").content
const templateCart = document.getElementById("template-carrito").content
const fragment = document.createDocumentFragment()
let carrito = {}

cards.addEventListener('click',e => {
  addShoppingCart(e)
})

autos.forEach( auto => {
  templateCard.querySelector('h5').textContent = auto.marca
  templateCard.querySelector('.model').textContent = `Modelo: ${auto.modelo}`
  templateCard.querySelector('.price').textContent = `Precio: ${auto.precio}`
  templateCard.querySelector('img').setAttribute('src',auto.image)
  templateCard.querySelector('button').dataset.id = auto.id

  const clone = templateCard.cloneNode(true)
  fragment.appendChild(clone)
})
cards.appendChild(fragment)

const addShoppingCart = e => {
  if(e.target.classList.contains('btn-dark')){
    setCart(e.target.parentElement)
  }
  e.stopPropagation()
}

const setCart = objeto => {
  const producto = {
    id: objeto.querySelector('.btn-dark').dataset.id,
    model: objeto.querySelector('h5').textContent,
    price: objeto.querySelector('.price').textContent,
    amount: 1
  }

  if(carrito.hasOwnProperty(producto.id)) {
    producto.amount = carrito [producto.id].amount + 1
  }

  carrito[producto.id] = {...producto}
  printCart()
}

const printCart = () => {
  items.innerHTML = ''
  Object.values(carrito).forEach(producto => {
    templateCart.querySelector('th').textContent = producto.id
    templateCart.querySelectorAll('td')[0].textContent = producto.model
    templateCart.querySelectorAll('td')[1].textContent = producto.amount
    templateCart.querySelector('.btn-info').dataset.id = producto.id
    templateCart.querySelector('.btn-danger').dataset.id = producto.id
    templateCart.querySelector('span').textContent = parseInt(producto.amount) * parseInt(producto.price)

    const clone = templateCart.cloneNode(true)
    fragment.appendChild(clone)
  })
  items.appendChild(fragment)
  printFooter()
}

const printFooter = () => {
  footer.innerHTML = ''
  if(Object.keys(carrito).length === 0){
    footer.innerHTML = `
    <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    `
  }
  const nCantidad = Object.values(carrito).reduce((acc, {amount}) => acc + amount,0) 
  const nPrecio = Object.values(carrito).reduce((acc, {amount, price}) => acc + amount * price,0)
  console.log(nCantidad)
  console.log(nPrecio)

  templateFooter.querySelector('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)
  footer.appendChild(fragment)
}

