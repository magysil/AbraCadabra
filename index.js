const express = require('express');
const app = express();


//Arreglo de nombres
const usuarios =[
    'Juan',
    'María',
    'Pedro',
    'Ana',
    'Alex',
    'Teresa',
    'Nicolás'
];


//2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static("assets"));


//3.Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios.
app.get('/abracadabra/usuarios', (req, res) => {
    res.json({usuarios})
})

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
//usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en
//el servidor.En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario
//devolver la imagen “who.jpeg”.

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const usuario = req.params.usuario;    
    usuarios.includes(usuario) ? next() :res.sendFile(__dirname + '/assets/who.jpeg' ) 
});

app.get('/abracadabra/juego/:usuario',(req, res) => {
    res.sendFile(__dirname + '/index.html' )
});


// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
//número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
//imagen de Voldemort.

app.get('/abracadabra/conejo/:n', (req,res) => {
    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;  
    //console.log('aleatorio',numeroAleatorio) 
    const n = req.params.n;
    //console.log('params',n)
    n==numeroAleatorio ? res.sendFile(__dirname + '/assets/conejito.jpg') : res.sendFile(__dirname + '/assets/voldemort.jpg');
})


    
// 6. rear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
//consultar una ruta que no esté definida en el servidor. 
app.get("*", (req, res) => {      
        res.send("<h1>Esta página no existe😓  </h1>");
}); 

//1. Servidor en el puerto express 3000
app.listen(3000, () => {
    console.log('El Servidor está en el puerto 3000')
})