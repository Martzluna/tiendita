const nombre = document.getElementById('name')
const precio = document.getElementById('price')
const categoria = document.getElementById('category')
const madurez = document.getElementById('madurez')
const image = document.getElementById("image")
const unidad = document.getElementById("unidad")

const BASE_URL = "https://tiendita-martzluna-backend.herokuapp.com/"

const agregar = async (e) => {
     e.preventDefault()
    const file = image.files[0]
    const imagebase64 = file ? await getBase64(file) : null
    const data = {
        nombre: nombre.value,
        precio: precio.value,
        unidad: unidad.value,
        categoria: categoria.value,
        madurez: madurez.value,
        imagen: imagebase64
    }
    const response = await axios.post(`${BASE_URL}products`, data);
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

var form = document.getElementById("agregar");
 
form.addEventListener('submit', agregar);