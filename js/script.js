import { Registro } from "./registro-auto.js";
import { leer, escribir, limpiar, jsonToObject, objectToJson } from "./local-storage-async.js";
import { mostrarSpinner, ocultarSpinner } from "./spinner.js";


const KEY_STORAGE  = "registro-key";
const items = [];
const form = document.getElementById("form-item");

document.addEventListener("DOMContentLoaded", onInit);

function onInit() {
    loadItems()
    ecucharFormulario();
    escuchandoBtnDeleteAll();
}

async function loadItems() {
    mostrarSpinner();
    let cadena = await leer(KEY_STORAGE);
    ocultarSpinner();

    const objeto = jsonToObject(cadena) || []; 

    objeto.forEach(obj => {
        const model = new Registro(
            obj.id,
            obj.titulo,
            obj.vende,
            obj.alquila,
            obj.puertas,
            obj.kms,
            obj.potencia,
            obj.aclaracion
        );
        items.push(model);
    });
    rellenarTabla();
}

function rellenarTabla(){
    const tabla = document.getElementById("table");
    let tbody = tabla.getElementsByTagName("tbody")[0];

    tbody.innerHTML = '';
    const celdas = [
        "id",
        "titulo",
        "vende",
        "alquila",
        "aclaracion",
        "puertas",
        "kms",
        "potencia",
        "eliminar"
    ]

    items.forEach((item) => {
        let nuevaFila = document.createElement("tr");
        
        celdas.forEach((celda) => {
            let nuevaCelda = document.createElement("td");
            if (celda === "eliminar") {
                let botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.classList.add("btn-eliminar");
                botonEliminar.addEventListener("click", () => eliminarItem(item.id));
                nuevaCelda.appendChild(botonEliminar);
            } else {
                nuevaCelda.textContent = item[celda] !== "" ? item[celda] : " - ";
            }

            nuevaFila.appendChild(nuevaCelda);
        });
        tbody.appendChild(nuevaFila);
    });
}

function ecucharFormulario(){
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        var fechaActual = new Date();

        let vende = form.querySelector("#vende");
        let alquila = form.querySelector("#alquila");

        let valVende = form.querySelector("#vende").value;
        let valAlquila = form.querySelector("#alquila").value;

        if (vende.type === "radio" && alquila.type === "radio"){
            valAlquila = alquila.checked;
            valVende = vende.checked;

            if(valAlquila == true){
                valAlquila = "SI";
            }
            else{
                valAlquila = "NO";
            }

            if(valVende == true){
                valVende = "SI";
            }
            else{
                valVende = "NO";
            }
        } 

        const model = new Registro(
            fechaActual.getTime(),
            form.querySelector("#txtnombre").value,
            valAlquila,
            valVende,
            form.querySelector("#txtpuertas").value,
            form.querySelector("#txtkms").value,
            form.querySelector("#txtpotencia").value,
            form.querySelector("#aclaracion").value,
        );

        const resp = model.verify();

        if(resp.success){
            items.push(model);
            const str = objectToJson(items);
            escribir(KEY_STORAGE, str);
            
            actualizarFormulario();
            rellenarTabla();
        }
        else{
            alert(resp.rta);
        }
    });
}

function actualizarFormulario() {
    form.reset();
}

function eliminarItem(id) {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        const str = objectToJson(items);
        escribir(KEY_STORAGE, str);
        rellenarTabla();
    }
}

function escuchandoBtnDeleteAll() {
    const btn = document.getElementById("btn-delete-all");

    btn.addEventListener("click", async (e) => {
        const rta = confirm('Desea eliminar todos los Items?');

        if(rta) {
            mostrarSpinner();
            items.splice(0, items.length);
      
            try {
              await limpiar(KEY_STORAGE);
              rellenarTabla();
            }
            catch (error) {
                ocultarSpinner(); 
                alert(error);
            }
            ocultarSpinner(); 
        }
    });
}