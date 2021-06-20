module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", { 
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },  
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Room;
};