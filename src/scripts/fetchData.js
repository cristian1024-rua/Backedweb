document.getElementById('myForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value
  };

  try {
      const response = await fetch('http://localhost:3000/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      await response.json();
      cargarUsuarios(); // Refrescar la lista
  } catch (error) {
      console.error('Error:', error);
  }
});

// Mostrar usuarios
document.getElementById('btnFetch').addEventListener('click', cargarUsuarios);

async function cargarUsuarios() {
  try {
      const response = await fetch('http://localhost:3000/data');
      const usuarios = await response.json();

      const responseDiv = document.getElementById('response');
      responseDiv.innerHTML = "<h3>Usuarios Registrados:</h3>";

      usuarios.forEach(usuario => {
          responseDiv.innerHTML += `
              <p>
                  <strong>${usuario.nombre}</strong> - ${usuario.email}
                  <button onclick="editarUsuario('${usuario.id}')">Editar</button>
                  <button onclick="eliminarUsuario('${usuario.id}')">Eliminar</button>
              </p>
          `;
      });
  } catch (error) {
      console.error('Error:', error);
  }
}

// Editar usuario
async function editarUsuario(id) {
  const nuevoNombre = prompt('Nuevo nombre:');
  const nuevoEmail = prompt('Nuevo email:');

  if (nuevoNombre && nuevoEmail) {
      try {
          await fetch(`http://localhost:3000/data/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre: nuevoNombre, email: nuevoEmail })
          });

          cargarUsuarios(); // Actualizar la lista
      } catch (error) {
          console.error('Error:', error);
      }
  }
}

// Eliminar usuario
async function eliminarUsuario(id) {
  if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      try {
          await fetch(`http://localhost:3000/data/${id}`, { method: 'DELETE' });
          cargarUsuarios();
      } catch (error) {
          console.error('Error:', error);
      }
  }
}