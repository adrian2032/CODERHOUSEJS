//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
   

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []; //reseteamos el arreglo
        localStorage.clear();

        limpiarHTML();
    })
}

//funciones
function agregarCurso(e) {
    //e.prevenDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);
    }
}

//elimina un curso del carrito

function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoID = e.target.getAttribute('data-id');

        //ELIMINA DEL ARREGLO de articulosCarrito por data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoID);
        localStorage.removeItem('carrito')
        carritoHTML();
        
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCurso(curso){
    //COMENTADO
    //console.log(curso)

    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
        subtotal: Number(curso.querySelector('.precio span').textContent)
    }

    //revisa si un elemento ya exisste en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe){
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++
                //codigo MIO
                let valor = Number(curso.precio)
            
                curso.subtotal = curso.subtotal + valor
                
                return curso; //retorna objeto actualizado
            }else {
                return curso; //retorna objetos que no son los duplicados
                
            }
        })
        articulosCarrito = [...cursos];
    } else{
             // agrega articulos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))


    //COMENTADO
    //console.log(articulosCarrito)

    console.log(infoCurso)
    carritoHTML();
}


//muestra el carrito de compras en el html



function carritoHTML(){
    //limpiar html
    limpiarHTML();


    let carritoListo = localStorage.getItem('carrito')
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id, subtotal } = curso;
        const row = document.createElement('tr');
        //console.log(subtotal);
        row.innerHTML = `
        <td><img src="${imagen}"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>${subtotal}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">  X </a>
        </td>
        

      
        `;
        //agrega el html del carrito en el body
        contenedorCarrito.appendChild(row);
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
        

    });
}

//elimina los cursos del tbody
function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
}
