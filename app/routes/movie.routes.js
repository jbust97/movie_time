module.exports = app => {
    const movie = require("../controllers/moviedao.controller.js");    
    var router = require("express").Router();
    router.post("/", movie.create);
    router.get("/", movie.findAll);
    router.get("/:id", movie.findOne);
    router.put("/:id",movie.vote);
    router.delete("/:id",movie.delete);
    
    app.use('/api/movie', router);
    
};