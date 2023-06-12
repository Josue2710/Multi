const listadoContainer = document.querySelector('.listado');
const nombreInput = document.querySelector('.nombre');
const apellidoInput = document.querySelector('.apellido');
const telefonoInput = document.querySelector('.telefono');
const btnAgregar = document.querySelector('.btnagregar');

function mostrarContacto(contacto) {
  const tarea = document.createElement('div');
  tarea.classList.add('tarea');

  const datos = document.createElement('div');
  datos.classList.add('datos');

  const nombreElement = document.createElement('h3');
  nombreElement.textContent = 'Nombre: ' + contacto.nombre;

  const apellidoElement = document.createElement('h3');
  apellidoElement.textContent = 'Apellido: ' + contacto.apellido;

  const telefonoElement = document.createElement('h3');
  telefonoElement.textContent = 'Teléfono: ' + contacto.telefono;

  datos.appendChild(nombreElement);
  datos.appendChild(apellidoElement);
  datos.appendChild(telefonoElement);

  tarea.appendChild(datos);
  listadoContainer.appendChild(tarea);
}

function obtenerContactos() {
  fetch('https://railway-node-express-production-3b13.up.railway.app/scrape')
    .then(response => response.json())
    .then(data => {
      data.forEach(contacto => {
        mostrarContacto(contacto);
      });
    })
    .catch(error => {
      console.error('Error al obtener los contactos:', error);
    });
}

function guardarContacto() {
  const nombre = nombreInput.value;
  const apellido = apellidoInput.value;
  const telefono = telefonoInput.value;

  const nuevoContacto = {
    nombre,
    apellido,
    telefono
  };

  fetch('https://railway-node-express-production-3b13.up.railway.app/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoContacto)
  })
    .then(response => response.json())
    .then(data => {
      mostrarContacto(data);
      nombreInput.value = '';
      apellidoInput.value = '';
      telefonoInput.value = '';
    })
    .catch(error => {
      console.error('Error al guardar el contacto:', error);
    });
}

btnAgregar.addEventListener('click', guardarContacto);

// Obtener y mostrar los contactos al cargar la página
obtenerContactos();
