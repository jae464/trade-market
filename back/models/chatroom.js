module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define('ChatRoom', {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  });
  ChatRoom.associate = (db) => {
    // db.ChatRoom.belongsToMany(db.User, {through: 'ChatRoomMember'});
    // db.ChatRoom.hasMany(db.Chat);
    db.ChatRoom.belongsTo(db.User, {as: 'Buyer'});
    db.ChatRoom.belongsTo(db.User, {as: 'Seller'});
    db.ChatRoom.belongsTo(db.Post, {as: 'BuyerPost'});
    db.ChatRoom.belongsTo(db.Post, {as: 'SellerPost'});
    db.ChatRoom.hasMany(db.Chat);
    db.ChatRoom.belongsToMany(db.User, {through: 'ChatRoomMember', as:'ChatRoomMembers'});
  }
  
  return ChatRoom;
}