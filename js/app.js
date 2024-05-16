const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarImagenes(terminoBusqueda);

}

function mostrarAlerta(mensaje) {

    const alertaExist = document.querySelector('.bg-red-100');

    if (!alertaExist) {
        const alerta = document.createElement('P');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class"blok sm:inline">${mensaje}</span>
        `;

        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function buscarImagenes(termino) {
    const key = "43918676-fb220a5ea5a13cd3287e3913a";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(imagenes => {
            mostrarImagenes(imagenes.hits);
        });
}

function mostrarImagenes(imagenes) {

    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    //Iterar sobre el arreglo de imagenes y construir el HTML de cada imagen
    imagenes.forEach(imagen => {

        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class"w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4 p-5 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">

                    <div class="p-4>
                        <p class="font-bold"> ${likes} <span class="font-light"> Me gusta </span> </p>
                        <p class="font-bold"> ${views} <span class="font-light"> Veces vista </span> </p>

                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                            href="${largeImageURL}" target="_blank">
                            Ver imagen
                        </a>
                        
                    </div>
                </div>
            </div>
        `
    });

}