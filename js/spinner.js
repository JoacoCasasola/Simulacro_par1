export function mostrarSpinner() {
    action(true);
}

// Función para ocultar el spinner
export function ocultarSpinner() {
    action();
}

function action(visible = false) {
    const display = visible ? 'flex' : 'none';
    document.getElementById('spinner').style.display = display;
}