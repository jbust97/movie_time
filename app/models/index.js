var Sequelize = require("sequelize"),sequelize = null;
    if (process.env.HEROKU) {
          
            // the application is executed on Heroku ... use the postgres
                sequelize = new Sequelize(process.env.DATABASE_URL, 
                  {
                    dialect: 'postgres',
                    protocol: 'postgres',
                    logging: false,
                    dialectOptions: {
                      ssl: {
                        require: true,
                        rejectUnauthorized: false 
                      }
                    }
                   }
                );
    }
    else {
          
            // the application is executed on the local machine ... use mysql  
            sequelize =new Sequelize("postgres://movie:party@localhost:5432/movie_party",  {dialect: "postgres"});
   }

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Rooms = require("./room.model.js")(sequelize, Sequelize);
db.Movies = require("./movie.model.js")(sequelize,Sequelize);
db.Movies.belongsTo(db.Rooms);
db.Rooms.hasMany(db.Movies);
module.exports = db;