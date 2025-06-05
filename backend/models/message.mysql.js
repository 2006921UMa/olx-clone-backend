// models/message.mysql.js
// message => Mensagens entre utilizadores

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    ad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ads',
        key: 'id'
      }
    }
  }, {
    tableName: 'messages',
    timestamps: true
  });

    Message.associate = models => {
    Message.belongsTo(models.user, { as: 'Sender', foreignKey: 'sender_id' });
    Message.belongsTo(models.user, { as: 'Receiver', foreignKey: 'receiver_id' });
    Message.belongsTo(models.ad, { foreignKey: 'ad_id' });
  };

  return Message;
};

