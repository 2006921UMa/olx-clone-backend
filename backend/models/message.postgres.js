// models/message.postgres.js

module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      ad_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ads",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "messages",
      updatedAt: false,
    }
  );

  message.associate = (models) => {
    message.belongsTo(models.user, { as: "Sender", foreignKey: "sender_id" });
    message.belongsTo(models.user, { as: "Receiver", foreignKey: "receiver_id" });
    message.belongsTo(models.ad, { foreignKey: "ad_id" });
  };

  return message;
};
