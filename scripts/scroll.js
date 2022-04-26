const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
  // console.log(walk);
});

const slider2 = document.querySelector('.items2');
let isDown2 = false;
let startX2;
let scrollLeft2;

slider2.addEventListener('mousedown', (e) => {
  isDown2 = true;
  slider2.classList.add('active');
  startX2 = e.pageX - slider2.offsetLeft;
  scrollLeft2 = slider2.scrollLeft;
});
slider2.addEventListener('mouseleave', () => {
  isDown2 = false;
  slider2.classList.remove('active');
});
slider2.addEventListener('mouseup', () => {
  isDown2 = false;
  slider2.classList.remove('active');
});
slider2.addEventListener('mousemove', (e) => {
  if (!isDown2) return;
  e.preventDefault();
  const x = e.pageX - slider2.offsetLeft;
  const walk = (x - startX2) * 3;
  slider2.scrollLeft = scrollLeft2 - walk;
  // console.log(walk);
});
const slider3 = document.querySelector('.items3');
let isDown3 = false;
let startX3;
let scrollLeft3;

slider3.addEventListener('mousedown', (e) => {
  isDown3 = true;
  slider3.classList.add('active');
  startX3 = e.pageX - slider3.offsetLeft;
  scrollLeft3 = slider3.scrollLeft;
});
slider3.addEventListener('mouseleave', () => {
  isDown3 = false;
  slider3.classList.remove('active');
});
slider3.addEventListener('mouseup', () => {
  isDown3 = false;
  slider3.classList.remove('active');
});
slider3.addEventListener('mousemove', (e) => {
  if (!isDown3) return;
  e.preventDefault();
  const x = e.pageX - slider3.offsetLeft;
  const walk = (x - startX3) * 3;
  slider3.scrollLeft = scrollLeft3 - walk;
  // console.log(walk);
});

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? "-" : ""

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    let j = (i.length > 3) ? i.length % 3 : 0

    return "$ " + negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")
  } catch (e) {
    console.log(e)
  }
}

const templateCard = document.getElementById('item').content;
const cards = document.getElementById('cards-carrousel');
const cards2 = document.getElementById('cards-carrousel2');
const fragment = document.createDocumentFragment()
const fragment2 = document.createDocumentFragment()
const fragment3 = document.createDocumentFragment()

const carritoBoton = document.getElementById("carrito")

//definimos modales
const modalDetalle = document.getElementById("detalleModal")
const modalUbicacion = document.getElementById("ubicacionModal")
const cardsRelated = document.getElementById("cards-carrousel-related")

let allProducts = []

const fetchData = async () => {
  try {
    const res = await fetch('https://tiendita-martzluna-backend.herokuapp.com/products')
    const data = await res.json()
    showList(data)
    allProducts = data
  } catch (error) {
    console.log(error)
  }
}

const showList = (data) => {
  data.filter(item => item.categoria === "ofertas").forEach(element => {
    templateCard.querySelector("h5").textContent = element.nombre;
    templateCard.querySelector("p").textContent = formatMoney(element.precio);
    const image = element.imagen || "../images/imagedefault.png"
    templateCard.querySelector("img").setAttribute("src", image)
    templateCard.querySelector('.agregar').dataset.id = element.id
    templateCard.querySelector("a").dataset.value = JSON.stringify(element)

    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
  });
  data.filter(item => item.categoria === "mas populares").forEach(element => {
    templateCard.querySelector("h5").textContent = element.nombre;
    templateCard.querySelector("p").textContent = formatMoney(element.precio);
    const image = element.imagen || "../images/imagedefault.png"
    templateCard.querySelector("img").setAttribute("src", image)
    templateCard.querySelector('.agregar').dataset.id = element.id
    templateCard.querySelector("a").dataset.value = JSON.stringify(element)

    const clone = templateCard.cloneNode(true)
    fragment2.appendChild(clone)
  });
  cards2.appendChild(fragment2)
  cards.appendChild(fragment)
}

const pintarTotal = () => {
  carrito = JSON.parse(localStorage.getItem('carrito'))
  const total = Object.keys(carrito).length
  carritoBoton.querySelector(".total").textContent = total
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData();
  pintarTotal();
})

const agregar = (objeto) => {
  const localStorageCarrito = localStorage.getItem("carrito")
  console.log(localStorageCarrito);
  const carrito = localStorageCarrito ? JSON.parse(localStorageCarrito) : {}
  console.log(carrito)
  const price = objeto.querySelector('p').textContent
  const producto = {
    id: objeto.querySelector('.agregar').dataset.id,
    title: objeto.querySelector('h5').textContent,
    precio: Number(price.replace(/[^0-9\.]+/g, "")),
    cantidad: 1
  }
  if (carrito && carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1
  }

  carrito[producto.id] = { ...producto }

  localStorage.setItem('carrito', JSON.stringify(carrito))
  pintarTotal()
}

const verDetalle = elemento => {
  var myModal = new bootstrap.Modal(modalDetalle)
  myModal.show()
  const dataDetail = JSON.parse(elemento)
  const bodyModal = modalDetalle.querySelector(".modal-body")
  bodyModal.querySelector("h6").textContent = dataDetail.nombre
  bodyModal.querySelector("span").textContent = `$ ${dataDetail.precio} /${dataDetail.unidad}`
  bodyModal.querySelector("img").setAttribute("src", dataDetail.imagen)
  allProducts.filter(item => item.categoria === dataDetail.categoria).forEach(element => {
    templateCard.querySelector("h5").textContent = element.nombre;
    templateCard.querySelector("p").textContent = formatMoney(element.precio);
    const image = element.imagen || "../images/imagedefault.png"
    templateCard.querySelector("img").setAttribute("src", image)
    templateCard.querySelector('.agregar').dataset.id = element.id
    templateCard.querySelector("a").dataset.value = JSON.stringify(element)

    const clone = templateCard.cloneNode(true)
    fragment3.appendChild(clone)
  });
  cardsRelated.appendChild(fragment3)
}

const actionsButtons = e => {
  if (e.target.classList.contains('agregar')) {
    agregar(e.target.parentElement)
  }

  e.stopPropagation()
}

cards.addEventListener('click', e => {
  actionsButtons(e);
})
cards2.addEventListener('click', e => {
  actionsButtons(e);
})

const openUbicacion = () => {
  const myModal = new bootstrap.Modal(modalUbicacion)
  myModal.show()
}