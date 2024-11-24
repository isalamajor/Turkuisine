# Turkuisine
# Blog API and frontend website

Este proyecto consta de una API construida por mí que permite crear, borrar y consultar artículos e imágenes de un blog o cualquier otro uso que se le quiera dar
Para testear la API, no solo se ha utilizado la herramienta Postman, sino que se ha empleado como servicio para una web programada en Next, cuyo frontend se encuentra en la carpeta "Turkuisine-front"

Estos son los pasos a seguir para montar el proyecto:

  1. Montar MongoDB:
  	En  C:\Program Files\MongoDB\Server\[VERSION]\bin, ejecutar mongod.exe --dbpath="data8"
    Debes tener una carpeta data8/db/ en tu C: para cargar los datos, en el repositorio te dejo la que yo tengo
    
  2. Lanzar Servidor Node para poder usar la API:
  	En api-rest-node, npm start

  4. Lanzar página web blog (front-end):
  	En turkuisine-front, npm run dev
  
  Consultas a API disponibles (en la API está configurado el puerto 3090):

// POST - guardar un recurso
Añadir nuevo artículo con sus keys correspondientes (title, author, description, content, published_date [default: Date.now])
http://localhost:3090/api/create

// GET articles
http://localhost:3090/api/articles

// GET article by id
http://localhost:3090/api/articles/:id

// DELETE article 
http://localhost:3090/api/articles:id

// PUT article (edit)
http://localhost:3090/api/articles/id

// POST Upload pics to articles
En postman, añadir archivo con key "file0"
http://localhost:3090/api/upload-pic/id

// GET pic by its filename
http://localhost:3090/api/:file

// GET pic by its article 
http://localhost:3090/api/articlePictures/:id

// GET search articles by some string
http://localhost:3090/api/searcher/:search

Desde MongoDB Compass es sencillo añadir nuevos datos y modificar los existentes


