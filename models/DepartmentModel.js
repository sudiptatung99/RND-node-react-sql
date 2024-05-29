
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'department',
        {
            department_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
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

    return User;
}