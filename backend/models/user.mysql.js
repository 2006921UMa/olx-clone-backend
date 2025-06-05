// models/user.mysql.js
// users is person (utilizadores)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: { type: DataTypes.STRING, allowNull: false,},
    email: { type: DataTypes.STRING,allowNull: false, unique: true, validate: {isEmail: true}},
    password: { type: DataTypes.STRING, allowNull: false, },
    isAdmin: { type: DataTypes.INTEGER, defaultValue: 0, validate: {
        isIn: [[0, 1, 2, 3]] // 0 = utilizador, 1 = operador, 2 = supervisor, 3 = gestor
      }
    },
    telefone: { type: DataTypes.STRING, allowNull: true },
    genero: { type: DataTypes.STRING, allowNull: true, },
    foto_perfil: { type: DataTypes.STRING, allowNull: true},
    telemovel: { type: DataTypes.STRING, allowNull: true},
    morada: { type: DataTypes.STRING, allowNull: true },
    genero: { type: DataTypes.ENUM('M', 'F', 'O'), allowNull: true, comment: 'M = Masculino, F = Feminino, O = Outro' }
  }, {
    tableName: 'users',
    timestamps: true 
  });

  User.associate = models => {
    User.hasMany(models.ad, { onDelete: 'CASCADE', foreignKey: 'user_id' });
    User.hasMany(models.message, { as: 'sentMessages', foreignKey: 'sender_id' });
    User.hasMany(models.message, { as: 'receivedMessages', foreignKey: 'receiver_id' });
    User.hasMany(models.followed_ad, { onDelete: 'CASCADE', foreignKey: 'user_id' });
    User.hasMany(models.rating, { foreignKey: 'user_id', onDelete: 'CASCADE' });
    User.hasMany(models.company, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  };

  return User;
};