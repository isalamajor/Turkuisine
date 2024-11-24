const express = require("express");
const router = express.Router();
const ArticleController = require('../controllers/Article');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img/articles/')
    },

    filename: (req, file, cb) => {
        cb(null, "article" + Date.now() + file.originalname)
    }
})

const uploaded = multer({storage: storage});



// POST - guardar un recurso
router.post("/create", ArticleController.create);

// GET articles
router.get("/articles", ArticleController.getArticles);

// GET article by id
router.get("/articles/:id", ArticleController.searchArticle);

// DELETE article 
router.delete("/articles/:id", ArticleController.deleteArticle);

// PUT article (edit)
router.put("/articles/:id", ArticleController.editArticle);

// POST Upload pics to articles
router.post("/upload-pic/:id", [uploaded.single("file0")], ArticleController.uploadPicture);

// GET pic by its filename
router.get("/picture/:file", ArticleController.picture);

// GET pic by its article 
router.get("/articlePictures/:id", ArticleController.articlePictures);

// GET search articles by some string
router.get("/searcher/:search", ArticleController.searcher);



module.exports = router;