module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("Movie", { 
        movie: {
            type: Sequelize.JSON,
        },  
        votes: {
            type: Sequelize.BIGINT,
            defaultValue: 0,            
        },   
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Movie;
};