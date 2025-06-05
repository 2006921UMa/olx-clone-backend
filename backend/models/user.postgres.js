// models/user.postgres.js

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define( "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telemovel: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      telefone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      morada: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      foto_perfil: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      genero: {
        type: DataTypes.ENUM("M", "F", "O"),
        allowNull: true,
        comment: "M = Masculino, F = Feminino, O = Outro",
      },
      isAdmin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1, 2, 3]], // 0 = user normal, 1 = operador, 2 = supervisor, 3 = gestor
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "users",
    }
  );

  // Futuras associações
  User.associate = (models) => {
    // Ex: User.hasMany(models.Ad, { foreignKey: 'user_id' });
  };

  return User;
};
