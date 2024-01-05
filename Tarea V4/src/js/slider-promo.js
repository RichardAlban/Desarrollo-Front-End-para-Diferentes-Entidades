fetch('https://cima.aemps.es/cima/rest/medicamentos?nombre')
    .then(response => response.json())
    .then(data => {
        const carouselInner = document.querySelector('.carousel-inner');
        console.log(data.resultados)
        if (data.resultados && data.resultados.length > 0) {
            for (let i = 0; i < Math.min(data.resultados.length, 6); i++) {
                const medicamento = data.resultados[i];

                if (medicamento.fotos && medicamento.fotos.length > 0) {
                    const div = document.createElement('div');
                    div.className = 'carousel-item text-center' + (i === 0 ? ' active' : '');

                    const img = document.createElement('img');
                    img.src = medicamento.fotos[0].url;
                    img.className = 'd-block m-auto';
                    img.alt = medicamento.nombre; // Nombre del medicamento como texto alternativo
                    img.style.width = '300px';
                    img.style.height = '200px';
                    img.style.objectFit = 'cover';

                    const nombreMedicamento = document.createElement('h5');
                    nombreMedicamento.textContent = medicamento.nombre;
                    nombreMedicamento.className = 'mt-2'; // Margen superior para separar el texto de la imagen

                    div.appendChild(img);
                    div.appendChild(nombreMedicamento);
                    carouselInner.appendChild(div);
                }
            }
        }
    })
    .catch(error => {
        console.error('Hubo un problema con la operación fetch:', error);
    });
