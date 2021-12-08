module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    trade: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }

  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // UserId 생김
    db.Post.belongsTo(db.Category); // CategoryId 생김
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Category, {through: 'WantCategory', as:'WantCategorys'});
    // db.Post.belongsTo(db.Category);
  };
  return Post;
}