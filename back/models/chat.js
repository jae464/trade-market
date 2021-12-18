module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  Chat.associate = (db) => {
    db.Chat.belongsTo(db.User, {as: 'Sender'});
    db.Chat.belongsTo(db.User, {as: 'Receiver'});
    db.Chat.belongsTo(db.ChatRoom);
  }

  return Chat;
}