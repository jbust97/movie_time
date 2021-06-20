    var Sequelize = require("sequelize"),    
    sequelize = null;
    if (process.env.HEROKU_POSTGRESQL_BRONZE_URL) {
            // the application is executed on Heroku ... use the postgres
            sequelize = sequelize = new Sequelize(process.env.DATABASE_URL, {
                logging: false,
                dialectOptions: {
                  ssl: true /* for SSL config since Heroku gives you this out of the box */
                }
              });
    }
    else {
            // the application is executed on the local machine ... use mysql  
            sequelize =new Sequelize("postgres://movie:party@localhost:5432/movie_party",  {dialect: "postgres"});
   }

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Rooms = require("./room.model.js")(sequelize, Sequelize);
module.exports = db;