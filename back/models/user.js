module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: true,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
  }
  return User;
}