const templateProducts = document.getElementById('productosTemplate').content;
const productsList = document.getElementById('contentProducts');
const fragment = document.createDocumentFragment()

const modalEdit = document.getElementById("editarModal")
const modalDelete = document.getElementById("eliminarModal")

let idActive

const nombre = document.getElementById('name')
const precio = document.getElementById('price')
const categoria = document.getElementById('category')
const madurez = document.getElementById('madurez')
const image = document.getElementById("image")
const unidad = document.getElementById("unidad")
const preview = document.getElementById("preview")

const BASE_URL = "https://tiendita-martzluna-backend.herokuapp.com/"


const fetchData = async () => {
    try {
        const res = await fetch('https://tiendita-martzluna-backend.herokuapp.com/products')
        const data = await res.json()
        showProducts(data)
    } catch (error) {
        console.log(error)
    }
}

const showProducts = data => {
    data.forEach(element => {
        templateProducts.querySelector("p").textContent = element.nombre;
        // templateProducts.querySelector("").onclick = element;
        templateProducts.querySelector('.editar').dataset.value = JSON.stringify(element)
        templateProducts.querySelector('.eliminar').dataset.id = element.id
        const clone = templateProducts.cloneNode(true)
        fragment.appendChild(clone)
    })
    productsList.appendChild(fragment)
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
})

const editar = (element) => {
    console.log(element)
    var myModal = new bootstrap.Modal(modalEdit)
    myModal.show()

    const dataLoaded = JSON.parse(element.querySelector(".editar").dataset.value)
    console.log(dataLoaded)
    nombre.value = dataLoaded.nombre;
    precio.value = dataLoaded.precio;
    preview.setAttribute("src", dataLoaded.imagen)
    madurez.value = dataLoaded.madurez
    categoria.value = dataLoaded.categoria
    unidad.value = dataLoaded.unidad
    idActive = dataLoaded.id
}
const eliminar = (element) => {
    var myModal = new bootstrap.Modal(modalDelete)
    myModal.show()
    const dataLoaded = element.querySelector(".eliminar").dataset.id
    idActive = dataLoaded
}

const actionsButtons = e => {
    if (e.target.classList.contains('editar')) {
        editar(e.target.parentElement)
    }
    if (e.target.classList.contains('eliminar')) {
        eliminar(e.target.parentElement)
    }
    e.stopPropagation()
}

productsList.addEventListener('click', e => {
    actionsButtons(e);
})

const handleEdit = async (e) => {
    // e.preventDefault()
    const file = image.files[0]
    const imagebase64 = file ? await getBase64(file) : null
    const data = {
        nombre: nombre.value,
        precio: precio.value,
        categoria: categoria.value,
        madurez: madurez.value,
        unidad: unidad.value
    }
    if(imagebase64) {
        data.imagen = imagebase64
    } else {
        console.log(preview.src);
        data.imagen = preview.src
    }
    console.log(idActive)
    const response = await axios.put(`${BASE_URL}products/${idActive}`, data);
    console.log(response)
}
const handleDelete = async () => {
    // e.preventDefault()
    const response = await axios.delete(`${BASE_URL}products/${idActive}`);
    console.log(response)
}

function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res, rej) => {
        reader.onload = function () {
            res(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            rej(error)
        };
    })
}

var form = document.getElementById("handleEdit");

form.addEventListener('submit', handleEdit);


