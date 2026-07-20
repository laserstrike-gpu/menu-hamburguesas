const inputNombre = document.querySelector("#inputNombre");
const inputPrecio = document.querySelector("#inputPrecio");
const btnAgregar = document.querySelector("#btnAgregar");
const divListaHamburguesas = document.querySelector("#divListaHamburguesas");

const arrayHamburguesas = [];

const hamburguesasGuardadas = localStorage.getItem("hamburguesas");
if(hamburguesasGuardadas){
    arrayHamburguesas.push(...JSON.parse(hamburguesasGuardadas));
}

let indiceEditando = -1;

btnAgregar.addEventListener("click", sumarHamburguesa);

function sumarHamburguesa(){
    
    const nombre = inputNombre.value;
    const precio = Number(inputPrecio.value);
    
    const menuHamburguesas = {
        nombre: nombre,
        precio: precio,
    }
    
    if(indiceEditando === -1){
        arrayHamburguesas.push(menuHamburguesas);
    }else{
        arrayHamburguesas[indiceEditando] = menuHamburguesas
        indiceEditando = -1;
        btnAgregar.textContent = "Agregar";
    }
    
    mostrarHamburguesas();

    localStorage.setItem("hamburguesas", JSON.stringify(arrayHamburguesas));

    inputNombre.value = "";
    inputPrecio.value = "";
    inputNombre.focus();

}

function mostrarHamburguesas(){
    divListaHamburguesas.innerHTML = "";
    arrayHamburguesas.forEach(function(menuHamburguesas, indice){
        const div = document.createElement("div");
        div.innerHTML = `
            ${menuHamburguesas.nombre} - $${menuHamburguesas.precio}
            <button class="btnEditar" data-indice="${indice}">Editar</button>
            <button class="btnEliminar" data-indice="${indice}">Eliminar</button>
        `;

        const btnEditar = div.querySelector(".btnEditar");
        const btnEliminar = div.querySelector(".btnEliminar");

        btnEditar.addEventListener("click", function(){
            const indice = btnEditar.dataset.indice;
            inputNombre.value = arrayHamburguesas[indice].nombre;
            inputPrecio.value = arrayHamburguesas[indice].precio;
            indiceEditando = indice;
            btnAgregar.textContent = "Guardar Edicion";

        });

        btnEliminar.addEventListener("click", function(){
            const indice = btnEliminar.dataset.indice;
            const confirmar = confirm ("¿Esta seguro de Eliminar?")
            if(confirmar){
            arrayHamburguesas.splice(indice, 1);
            mostrarHamburguesas();
            localStorage.setItem("hamburguesas", JSON.stringify(arrayHamburguesas));
            }
        });
        
        divListaHamburguesas.appendChild(div);
    });
};

mostrarHamburguesas();