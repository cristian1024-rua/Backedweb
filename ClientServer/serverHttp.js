const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let usuarios = [];

// Crear usuario
app.post('/data', (req, res) => {
    const nuevoUsuario = { id: Date.now(), ...req.body };
    usuarios.push(nuevoUsuario);
    
    console.log("Datos recibidos:", { nombre: nuevoUsuario.nombre, email: nuevoUsuario.email });

    res.json({ status: 'Usuario registrado!', usuario: nuevoUsuario });
});

// Obtener usuarios
app.get('/data', (req, res) => {
    res.json(usuarios);
});

// Editar usuario
app.put('/data/:id', (req, res) => {
    const { id } = req.params;
    const index = usuarios.findIndex(u => u.id == id);
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...req.body };
        
        console.log("Usuario editado:", { nombre: usuarios[index].nombre, email: usuarios[index].email });

        res.json({ status: 'Usuario actualizado!', usuario: usuarios[index] });
    } else {
        res.status(404).json({ status: 'Usuario no encontrado' });
    }
});

// Eliminar usuario
app.delete('/data/:id', (req, res) => {
    const { id } = req.params;
    usuarios = usuarios.filter(u => u.id != id);
    
    console.log(`Usuario eliminado`); 

    res.json({ status: 'Usuario eliminado!' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
