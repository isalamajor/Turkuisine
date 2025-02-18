# Turkuisine - Blog API and frontend website

## Set up the project

This project consists of an API built by me that allows creating, deleting, and querying articles and images for a blog or any other use case.  
To test the API, not only was Postman used, but it was also employed as a service for a website programmed in Next.js, with the frontend located in the "Turkuisine-front" folder.

Here are the steps to set up the project:

  1. Set up MongoDB:  
  	In `C:\Program Files\MongoDB\Server\[VERSION]\bin`, run `mongod.exe --dbpath="C:/data/db"` (this flag is necessary if you have multiple versions of MongoDB, to specify which data/db to use).
    
  2. Add data with MongoDB Compass:  
  	This is an easy way to do it. I’ve provided the `turkuisine.articles` JSON file with the data I used. (db: turkuisine, collection: articles)
  
  3. Launch Node server to use the API:  
  	In the `api-rest-node` folder, install dependencies (`npm install`) and run (`npm start`).

  4. Launch blog website (frontend):  
  	In the `turkuisine-front` folder, install dependencies (`npm install`) and run (`npm run dev`).
  
  ## Available API queries (the API is configured on port 3090):

// POST - Save a resource  
Add a new article with its corresponding keys (title, author, description, content, published_date [default: Date.now])  
`http://localhost:3090/api/create`

// GET articles  
`http://localhost:3090/api/articles`

// GET article by id  
`http://localhost:3090/api/articles/:id`

// DELETE article  
`http://localhost:3090/api/articles/:id`

// PUT article (edit)  
`http://localhost:3090/api/articles/:id`

// POST Upload pics to articles  
In Postman, add a file with the key "file0"  
`http://localhost:3090/api/upload-pic/:id`

// GET pic by its filename  
`http://localhost:3090/api/picture/:file`

// GET pic by its article  
`http://localhost:3090/api/articlePictures/:id`

// GET search articles by some string  
`http://localhost:3090/api/searcher/:search`

## Web Result  
Here is how the app looks once set up, it allows searching and viewing several articles.

<img width="40%" alt="Captura" src="https://github.com/user-attachments/assets/6472a060-6855-404f-928a-b7fe7e433e14">  
<img width="40%" alt="Captura2" src="https://github.com/user-attachments/assets/85dcd814-8993-4456-b410-bf6261a17373">  
<img width="40%" alt="Captura3" src="https://github.com/user-attachments/assets/fa88bf21-266e-40c5-b0e6-3f6515966aaa">  
<img width="40%" alt="Captura4" src="https://github.com/user-attachments/assets/6668f757-0a6e-46a2-ad7f-67a25bb36bc8">

Also available is this video showing how the website looks: [Watch video](./resultado_web.webm)

Thank you for stopping by! :)
