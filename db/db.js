const { Sequelize, DataTypes } = require('sequelize');

const db = {};

const sequelize = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
try {
    sequelize.authenticate();
    console.log("connection has been established");
    sequelize.sync({ alter: true })
} catch (err) {
    console.log(`unable to connect database ${err}`);
}

db.sequelizeModel = sequelize;
db.Sequelize = Sequelize;

//declare all models
db.user = require('../models/UserModels')(sequelize, DataTypes);
db.department = require('../models/DepartmentModel')(sequelize, DataTypes);

//declare all relation define
db.user.hasMany(db.department, {
    foreignKey: 'user_id',
    as: 'department'
});  
db.department.belongsTo(db.user, {
    constraints: false,
    onDelete: "CASCADE",
    foreignKey: 'user_id',
    as: 'user'
});



module.exports = db;



