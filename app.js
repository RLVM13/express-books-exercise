//requerimientos de conexion, express y puertos
const express = require('express')
const app = express()
const port = 3000

//importacion de bbdd que vamos a utilizar
const books = require('./data/books.json');

//MIDDLEWARES
app.use(express.json()); //habilita el body para parsear las peticiones, lo convierte e interpreta

//Ejercicio 1 - http://localhost:3000/
app.get('/all', (req, res) => {
  console.log(req)
  res.status(200).send(books);
})

// Ejercicio 2 - Crea una ruta /first para obtener el primer libro
app.get('/first', (req, res) => {
  res.status(200).send(books[0]);
})

// Ejercicio 3 - Crea una ruta /last para obtener el último libro
app.get('/last', (req, res) => {
  let ultimo = books.length;
  res.status(200).send(books[ultimo - 1]);
})

// Ejercicio 4 - Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
app.get('/middle', (req, res) => {
  let mitad = books.length / 2;
  res.status(200).send(books[mitad]);
})

// Ejercicio 5 - Crea una ruta /author/dante-alighieri para obtener SÓLO EL TÍTULO del libro de Dante Alighieri
app.get('/author/dante-alighieri', (req, res) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i].author == "Dante Alighieri") {
      //quitamos el send por el "json" para respetar los datos, el "send" lo adapta al navegador
      res.status(200).json(books[i].title); 
    }
  }
})

// Ejercicio 6 - Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro de Charles Dickens
app.get('/country/charles-dickens', (req, res) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i].author == "Charles Dickens") {
      res.status(200).json(books[i].country);
    }
  }
})

// Ejercicio 7 - Crea una ruta /year&pages/cervantes para obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes,
// Ejemplo de respuesta: { pages: ..., year: ... }
app.get('/year&pages/cervantes', (req, res) => {
  for (let i = 0; i < books.length; i++) {
    if (books[i].author == "Miguel de Cervantes") {
      res.status(200).json({pages: books[i].pages, year: books[i].year });
    }
  }
})

// Ejercicio 8 - Crea una ruta /country/count/spain para obtener EL NÚMERO DE LIBROS de España
app.get('/country/count/spain', (req, res) => {
  let librosSpain = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].country == "Spain") {
      librosSpain++;
    }
  }
  res.status(200).json(librosSpain);
})

// Ejercicio 9 - Crea una ruta /country/at-least/germany para obtener VERDADERO O FALSO dependiendo de si hay o no un libro de Alemania
// http://localhost:3000/country/at-least/germany
app.get("/country/at-least/germany", (req, res) => {
  const book = books.filter((element) => element.country === "Germany");
  const comparison = book.length > 0;
  res.status(200).json(comparison);
});

app.get("/country/at-least/germany", (req, res) => {
  const comparison = books
                        .some(element => element.country === "Germany");
  res.status(200).json(comparison);
});

// Ejercicio 10 - Crea una ruta /pages/all-greater/200 para obtener VERDADERO O FALSO dependiendo de si 
// todos los libros tienen más de 200 páginas
app.get('/pages/all-greater/200', (req, res) => {
    const comparison = books
                          .every(element => element.pages > 100);
    res.status(200).json(comparison);
  });


//ESTO SIEMPRE VA AL FINAL
//http://localhost:3000
app.listen(port, () => {
  console.log(`Example app listening on  http://localhost:/${port}`)
})