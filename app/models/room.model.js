module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("Room", { 
        code: {
            type: Sequelize.STRING,
            allowNull: true,

        },  
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        }
    });
    return Room;
};