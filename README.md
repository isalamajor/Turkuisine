# Turkuisine - Blog API and frontend website

## Montar proyecto

Este proyecto consta de una API construida por mí que permite crear, borrar y consultar artículos e imágenes de un blog o cualquier otro uso que se le quiera dar
Para testear la API, no solo se ha utilizado la herramienta Postman, sino que se ha empleado como servicio para una web programada en Next, cuyo frontend se encuentra en la carpeta "Turkuisine-front"

Estos son los pasos a seguir para montar el proyecto:

  1. Montar MongoDB:
  	En  C:\Program Files\MongoDB\Server\[VERSION]\bin, ejecutar mongod.exe --dbpath="data/db" (este flag es necesario si tienes varias versiones de Mongo, para especificar que data/db usar)
    
  2. Añadir datos con MongoDB Compass. Es una manera sencilla de hacerlo, dejo el archivo json turkuisine.articles con los datos que yo he utilizado. (db: turkuisine, coleccion: articles)
  
  3. Lanzar Servidor Node para poder usar la API:
  	En api-rest-node, instalar dependencias (npm install) + npm start

  3. Lanzar página web blog (front-end):
  	En turkuisine-front, instalar dependencias (npm install) + npm run dev
  
  ## Consultas a API disponibles (en la API está configurado el puerto 3090):

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
http://localhost:3090/api/articles/:id

// POST Upload pics to articles
En postman, añadir archivo con key "file0"
http://localhost:3090/api/upload-pic/:id

// GET pic by its filename
http://localhost:3090/api/:file

// GET pic by its article 
http://localhost:3090/api/articlePictures/:id

// GET search articles by some string
http://localhost:3090/api/searcher/:search


## Resultado Web 
Este es el aspecto de la app ya montada, permite hacer búsquedas y consultar varios artículos

<img width="500" alt="Captura" src="https://github.com/user-attachments/assets/6472a060-6855-404f-928a-b7fe7e433e14">
<img width="500" alt="Captura2" src="https://github.com/user-attachments/assets/85dcd814-8993-4456-b410-bf6261a17373">
<img width="500" alt="Captura3" src="https://github.com/user-attachments/assets/fa88bf21-266e-40c5-b0e6-3f6515966aaa">
<img width="500" alt="Captura4" src="https://github.com/user-attachments/assets/6668f757-0a6e-46a2-ad7f-67a25bb36bc8">

También está disponible este vídeo de cómo queda la web: [Ver vídeo](./resultado_web.webm)



Gracias por pasarte! :)






