const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    'test',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

sequelize.authenticate().catch((error) => {
    console.error('Unable to connect to the database:', error);
});

const UserRegister = sequelize.define("userRegister", {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    mobileNo: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: null,
        validate: {
            isEmail: true
        }
    },
    aboutYou: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: null
    }
});

const UserRelation = sequelize.define('userRelation', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserRegister,
            key: 'userId'
        }
    },
    followingId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserRegister,
            key: 'userId'
        }
    },
});

UserRegister.belongsToMany(UserRegister, {
    as: 'relatedUsers',
    through: UserRelation,
    foreignKey: 'userId',
    otherKey: 'followingId'
});

module.exports = { sequelize, UserRegister, UserRelation };