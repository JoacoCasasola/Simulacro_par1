// local-storage.js

// Función para leer del localStorage
export function leer(clave) {
    return JSON.parse(localStorage.getItem(clave));
}
  
// Función para escribir en el localStorage
export function escribir(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}
  
export function limpiar(clave) {
    localStorage.removeItem(clave);
}
  
// Función para convertir de JSON string a objeto
export function jsonToObject(jsonString) {
    return JSON.parse(jsonString);
}
  
// Función para convertir de objeto a JSON string
export function objectToJson(objeto) {
    return JSON.stringify(objeto);
}
