module.exports = app => {
    const room = require("../controllers/roomdao.controller.js");    
    var router = require("express").Router();
    router.post("/", room.create);
    router.get("/", room.findAll);
    router.get("/query",room.query);
    router.get('/query-id',room.queryId);
    router.get("/code/:code",room.findByCode);
    router.get("/:id/get-movies",room.getMovies);
    router.get("/:id", room.findOne);
    router.put("/:id",room.update);
    router.delete("/:id",room.delete);
    
    app.use('/api/room', router);
    
};