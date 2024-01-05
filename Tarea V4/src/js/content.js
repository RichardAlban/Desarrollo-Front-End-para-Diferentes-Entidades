// main.js (o el nombre que hayas elegido)

document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.querySelector('.grid-cols-1');

    // Llamada a la API
    fetch('https://cima.aemps.es/cima/rest/medicamentos?nombre')
        .then(response => response.json())
        .then(data => mostrarResultados(data))
        .catch(error => console.error('Error al obtener datos de la API:', error));

    // Función para mostrar el modal de agradecimiento
    function mostrarModalAgradecimiento() {
        const modalAgradecimiento = document.getElementById('modal-agradecimiento');
        const gifContainer = modalAgradecimiento.querySelector('.gif-container');
    
        // Mostrar el gif
        gifContainer.innerHTML = '<img src="https://media2.giphy.com/media/UqGKWfLR10lWzUFMYD/200w.gif?cid=82a1493bm8yj0rcg3k9g4654xkqmnvfbsa5zi2sm3eztczpp&ep=v1_gifs_related&rid=200w.gif&ct=s" alt="Pago" class="mx-auto">';
    
        modalAgradecimiento.classList.remove('hidden');
    
        setTimeout(() => {
            modalAgradecimiento.classList.add('hidden');
            // Limpiar el contenido del gif después de ocultar el modal
            gifContainer.innerHTML = '';
        }, 2000); // Ocultar el modal después de 2 segundos (ajusta según sea necesario)
    }

    function mostrarResultados(data) {
        const contenedor = document.querySelector('.grid-cols-1');
    
        if (data.resultados && data.resultados.length > 0) {
            data.resultados.forEach(medicamento => {
                const divTarjeta = document.createElement('div');
                divTarjeta.className = 'p-6 border border-gray-200 rounded-lg text-center';
    
                if (medicamento.fotos && medicamento.fotos.length > 0) {
                    const img = document.createElement('img');
                    img.src = medicamento.fotos[0].url;
                    img.className = 'object-cover object-center w-full mb-4 lg:h-48 md:h-36 rounded-xl';
                    divTarjeta.appendChild(img);
                }
    
                const divInfo = document.createElement('div');
                divInfo.className = 'flex justify-between items-center flex-col';
    
                const titulo = document.createElement('h1');
                titulo.className = 'text-xl font-semibold leading-none tracking-tighter text-neutral-600 mb-4';
                titulo.textContent = medicamento.nombre;
                divInfo.appendChild(titulo);
    
                const precio = document.createElement('span');
                precio.className = 'text-lg font-semibold text-green-500 mb-2';
                const precioAleatorio = (Math.random() * 19 + 1).toFixed(2);
                precio.textContent = `$${precioAleatorio}`;
                divInfo.appendChild(precio);
    
                divTarjeta.appendChild(divInfo);
    
                if (medicamento.descripcion) {
                    const descripcion = document.createElement('p');
                    descripcion.className = 'text-base font-medium leading-relaxed text-gray-500 mt-2';
                    descripcion.textContent = medicamento.descripcion;
                    divTarjeta.appendChild(descripcion);
                }
    
                const cantidadInput = document.createElement('input');
                cantidadInput.type = 'number';
                cantidadInput.min = '1';
                cantidadInput.value = '1';
                cantidadInput.className = 'w-1/4 p-2 border border-gray-300 rounded-md text-center mb-4 mr-4';;
                divTarjeta.appendChild(cantidadInput);
    
                const botonComprar = document.createElement('button');
                botonComprar.className = 'bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600';
                botonComprar.textContent = 'Comprar';
                botonComprar.addEventListener('click', () => {
                    const cantidadSeleccionada = parseInt(cantidadInput.value, 10);
                    mostrarModalAgradecimiento(cantidadSeleccionada);
                });
                divTarjeta.appendChild(botonComprar);
    
                contenedor.appendChild(divTarjeta);
            });
        }
    }
    
});
