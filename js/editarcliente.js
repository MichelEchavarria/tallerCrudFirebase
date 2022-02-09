import { obtenerCliente, editarCliente } from "./api.js";
import { validar, mostrarAlerta } from './funciones.js';

(()=> {
  // inputs de los campos del formulario
  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const empresaInput = document.querySelector("#empresa");
  const telefonoInput = document.querySelector("#telefono");
  const idInput = document.querySelector("#id");

  document.addEventListener('DOMContentLoaded', async () => {
    const parametroURL = new URLSearchParams(window.location.search);
    const idCliente = parametroURL.get('id');
    const cliente = await obtenerCliente(idCliente);
    cliente.id = idCliente;
    mostrarCliente(cliente);
    const formulario = document.querySelector("#formulario");
    formulario.addEventListener('submit', validarCliente);

  });

  function mostrarCliente(cliente) {
    const {nombre, email, empresa, telefono, id } = cliente;
    nombreInput.value = nombre;
    emailInput.value = email;
    empresaInput.value = empresa;
    telefonoInput.value = telefono;
    idInput.value = id;
    console.log(idInput.value);
  }


  function validarCliente(event) {
    event.preventDefault();

    const cliente = {
      nombre: nombreInput.value,
      email: emailInput.value,
      empresa: empresaInput.value,
      telefono: telefonoInput.value,
      id: idInput.value
    }

    if(validar(cliente)) {
      mostrarAlerta('Todos los campos son obligatorios');
      return;
    }
    editarCliente(cliente);

  }
})()