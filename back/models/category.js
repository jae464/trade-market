module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING(10),
      allowNull: false,
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
  Category.associate = (db) => {
    // db.Category.belongsTo(db.Post); // PostId 생성?
    // db.Category.belongsToMany(db.Post, {through: 'PostCategory'});
    db.Category.belongsToMany(db.Post, {through: 'WantCategory'});
  }
  return Category;
}