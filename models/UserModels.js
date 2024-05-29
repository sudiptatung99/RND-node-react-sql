const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
            },
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: 'updated_at',
        },
    );
    User.beforeCreate(async function (user) {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    User.generateToken = function ({ id, name, email }) {
        const token = jwt.sign({ id, name, email }, process.env.JWT_TOKEN, { expiresIn: '24h' });
        return token;
    };

    return User;
}