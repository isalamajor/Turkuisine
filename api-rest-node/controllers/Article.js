
const validator = require("validator");
const Article = require("../models/Article");
const fs = require("fs");
const path = require("path");



const create = async (req, res) => {
    // Recoger datos por post
    let parameters = req.body;

    // Validar los datos
    try {
        let validate_title = !validator.isEmpty(parameters.title) &&
                                validator.isLength(parameters.title, { max: 50, min: 5 });
        let validate_content = !validator.isEmpty(parameters.content);

        if (!validate_title || !validate_content) {
            return res.status(400).json({
                status: "error",
                message: "Invalid parameters"
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Error validating parameters"
        });
    }


    // Guardar articulo
    try {
        // Crear el objeto a guardar
        const article = new Article(parameters);

        // Guardar objeto en la BD
        const savedArticle = await article.save();

        // Devolver resultado
        return res.status(200).json({
            status: "success",
            article: savedArticle,
            message: "OK Article saved successfully"
        });

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "Article not saved",
            error: error.message // Incluir el mensaje del error para debugging
        });
    }

};


const getArticles = async (req, res) => {
    try {
        // Ejecuta la consulta directamente
        const articles = await Article.find({}).sort({published_date:-1}); /* Más recientes primero (-1)*/

        // Verifica si no se encontraron artículos
        if (!articles || articles.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No articles found..."
            });
        }

        // Devuelve los artículos si existen
        return res.status(200).json({
            status: "success",
            articles
        });
    } catch (error) {
        // Maneja errores de la consulta
        return res.status(500).json({
            status: "error",
            message: "Error fetching articles",
            error: error.message 
        });
    }
};


const searchArticle = async (req, res) => {
    try {
        // Recoger ID por la url
        let id = req.params.id;

        // Buscar el artículo usando await para esperar la respuesta
        const article = await Article.findById(id);

        // Verificar si el artículo no existe
        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Article not found"
            });
        }

        // Devolver artículo si existe
        return res.status(200).json({
            status: "success",
            article
        });

    } catch (error) {
        // Manejar cualquier otro error
        return res.status(500).json({
            status: "error",
            message: "Error fetching article",
            error: error.message
        });
    }
};



const deleteArticle = async (req, res) => {
    try {
        let id = req.params.id;

        // Usar await para esperar el resultado de la operación de borrado
        const deletedArticle = await Article.findOneAndDelete({ _id: id });

        // Si no se encuentra el artículo, devuelve un error 404
        if (!deletedArticle) {
            return res.status(404).json({
                status: "error",
                message: "Article to delete not found"
            });
        }

        // Devolver el artículo eliminado si se encuentra
        return res.status(200).json({
            status: "success",
            article: deletedArticle
        });

    } catch (error) {
        // Manejar errores de la operación
        return res.status(500).json({
            status: "error",
            message: "Error deleting the article",
            error: error.message
        });
    }
};


const editArticle = async (req, res) => {
    try {
        let id = req.params.id;
        let parameters = req.body;

        // Validación condicional para los parámetros proporcionados
        let validate_title = true;
        let validate_content = true;

        if (parameters.title) {
            validate_title = !validator.isEmpty(parameters.title) &&
                             validator.isLength(parameters.title, { max: 50, min: 5 });
        }
        if (parameters.content) {
            validate_content = !validator.isEmpty(parameters.content);
        }

        if (!validate_title || !validate_content) {
            return res.status(400).json({
                status: "error",
                message: "Invalid parameters"
            });
        }

        // Usar await para esperar el resultado de la operación de actualización
        const editedArticle = await Article.findOneAndUpdate(
            { _id: id },
            parameters,  // Mongoose actualizará solo los campos proporcionados
            { new: true }  // Devuelve el documento actualizado
        );

        // Si no se encuentra el artículo, devuelve un error 
        if (!editedArticle) {
            return res.status(404).json({
                status: "error",
                message: "Article to edit not found"
            });
        }

        // Devolver el artículo editado
        return res.status(200).json({
            status: "success",
            article: editedArticle
        });

    } catch (error) {
        // Manejar errores de la operación
        return res.status(500).json({
            status: "error",
            message: "Error editing the article"
        });
    }
};



const uploadPicture = async (req, res) => {
    try {
        // Verificar si se recibió un archivo
        if (!req.file) {
            return res.status(400).json({
                status: "error",
                message: "No file to upload"
            });
        }

        // Obtener nombre del archivo y extensión
        const file = req.file.filename; // Cambiado a filename (nombre generado por Multer)
        const file_extension = file.split('.').pop(); // Extrae la extensión después del último punto

        // Validar la extensión del archivo
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        if (!allowedExtensions.includes(file_extension.toLowerCase())) {
            // Intentar borrar el archivo si tiene una extensión inválida
            try {
                fs.unlinkSync(req.file.path); 
                return res.status(400).json({
                    status: "error",
                    message: "Invalid file type"
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: "Error deleting invalid file",
                    error: error.message
                });
            }
        }

        // Actualizar el artículo con la imagen subida
        const articleId = req.params.id; 
        const updatedArticle = await Article.findByIdAndUpdate(
            articleId,
            { picture: file }, 
            { new: true } 
        );

        // Verificar si el artículo fue encontrado y actualizado
        if (!updatedArticle) {
            return res.status(404).json({
                status: "error",
                message: "Article not found"
            });
        }

        // Respuesta si el archivo es válido y el artículo fue actualizado
        return res.status(200).json({
            status: "success",
            message: "File uploaded and article updated successfully",
            article: updatedArticle
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error uploading file or updating article",
            error: error.message
        });
    }
};


const picture = (req, res) => {
    try {
        // Obtener el nombre del archivo desde los parámetros de la URL y formar el path
        let file = req.params.file;
        let filepath = "./img/articles/" + file;

        // Verificar si el archivo existe
        fs.access(filepath, fs.constants.F_OK, (err) => {
            if (err) {
                // El archivo no existe
                return res.status(404).json({
                    status: "error",
                    message: "Picture not found"
                });
            }

            // Enviar el archivo como respuesta
            return res.sendFile(path.resolve(filepath));
        });
    } catch (error) {
        // Manejar errores
        return res.status(500).json({
            status: "error",
            message: "Error fetching the picture",
            error: error.message
        });
    }
};



const articlePictures = async (req, res) => {
    try {
        // Obtener el id desde los parámetros de la URL y buscar artículo
        let id = req.params.id;
        const article = await Article.findById(id);

        if (!article) {
            return res.status(404).json({
                status: "error",
                message: "Article not found"
            })
        }

        const pic = article.picture;

        if (!pic) {
            return res.status(404).json({
                status: "error",
                message: "No pictures found"
            })
        }

        const picpath = "./img/articles/" + pic;

        return res.sendFile(path.resolve(picpath));

    } catch (error) {
        // Manejar errores
        return res.status(500).json({
            status: "error",
            message: "Error fetching the picture",
            error: error.message
        });
    }
};



const searcher = async (req, res) => {

    try { 
        // Sacar string a buscar
        let search = req.params.search;

        // Buscar en Article (usamos await ya que Article.find() devuelve una promesa)
        const articlesFound = await Article.find({ 
            "$or": [
                { "title": { "$regex": search, "$options": "i" } },  // title i (INCLUYE) search
                { "author": { "$regex": search, "$options": "i" } },
                { "description": { "$regex": search, "$options": "i" } },
                { "content": { "$regex": search, "$options": "i" } }
            ]
        }).sort({ published_date: -1 }); // Ordenar por más recientes

        // Comprobar si hay resultados
        if (articlesFound.length <= 0) {
            return res.status(404).json({
                status: "error",
                message: "No articles found"
            });
        }

        // Devolver los artículos encontrados
        return res.status(200).json({
            status: "success",
            articles: articlesFound
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error fetching articles",
            error: error.message
        });
    }
};



module.exports = {
    create, 
    getArticles,
    searchArticle,
    deleteArticle, 
    editArticle,
    uploadPicture,
    picture,
    searcher,
    articlePictures
}
