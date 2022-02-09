import { obtenerClientes, eliminarCliente } from './api.js';
let arregloClientes = [];

(()=> {
  const listado = document.querySelector('#listado-clientes');
  // cuando se carga el documento html
  document.addEventListener('DOMContentLoaded', mostrarClientes);

  // el llamado a la funcion de eliminar
  listado.addEventListener('click', confirmarEliminar);



  const parametroURL = new URLSearchParams(window.location.search);
  const accionHecha = parametroURL.get('ac');

  function limpia(){
    document.querySelector('#alerta').classList.remove('alert','alert-success');
    document.querySelector('#alerta').innerHTML = '';  
  }

  if (accionHecha == 1) {
    document.querySelector('#alerta').classList.add('alert','alert-success');
    document.querySelector('#alerta').innerHTML = "El cliente fue ingresado correctamente!!"
    setTimeout(limpia,4000);
  }
  if (accionHecha == 2) {
    document.querySelector('#alerta').classList.add('alert','alert-success');
    document.querySelector('#alerta').innerHTML = "El cliente fue editado correctamente!!"
    setTimeout(limpia,4000);
  }
  if (accionHecha == 3) {
    document.querySelector('#alerta').classList.add('alert','alert-danger');
    document.querySelector('#alerta').innerHTML = "El cliente fue eliminado correctamente!!"
    setTimeout(limpia,4000);
  }
  
  async function mostrarClientes() {
    const clientes = await obtenerClientes();
    for (const key in clientes){
      clientes[key].id = key;
      arregloClientes.push(clientes[key]);
    }
    // {}
    arregloClientes.forEach(cliente => {
      const {nombre, email, telefono, empresa, id } = cliente;
      const row = document.createElement('tr'); // <tr></tr>

      row.innerHTML += `
        <td>
          <p>${nombre}</p>
        </td>
        <td>
          <p>${email}</p>
        </td>
        <td>
          <p>${telefono}</p>
        </td>
        <td>
          <p>${empresa}</p>
        </td>
        <td>
          <a href="editar-cliente.html?id=${id}" class="btn btn-primary btn-sm"> <i class="fa-solid fa-pen"></i> Editar</a>
          <a href="#" data-cliente="${id}" class="eliminar btn btn-danger btn-sm"> <i class="fa-solid fa-trash-can"></i> Eliminar</a>
        </td>
      `;
      
    listado.appendChild(row);

    });
  };

  function confirmarEliminar(event) {
    if(event.target.classList.contains('eliminar')) {
      // console.log(event.target.dataset.cliente);
      // Capturamos el id del cliente
      const clienteId = event.target.dataset.cliente;
      Swal.fire({
        title: '¿Deseas eliminar este registro?',
        text: "No podras recuperar la información de este usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si Eliminar!'
      }).then(respuesta => {
        if(respuesta.isConfirmed) {
          eliminarCliente(clienteId);
        }
      });
    }
  }
  }
)();