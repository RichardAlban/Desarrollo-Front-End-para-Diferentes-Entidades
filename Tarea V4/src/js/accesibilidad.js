// Función para cambiar el tamaño del texto
function adjustTextSize(delta) {
    document.querySelectorAll('body, body *').forEach(element => {
        const style = window.getComputedStyle(element);
        const fontSize = parseFloat(style.fontSize);
        element.style.fontSize = `${fontSize + delta}px`;
    });
}

// Event listeners para los botones
document.getElementById('increaseTextBtn').addEventListener('click', () => adjustTextSize(1));
document.getElementById('decreaseTextBtn').addEventListener('click', () => adjustTextSize(-1));
