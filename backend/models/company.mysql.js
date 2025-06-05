// models/company.mysql.js
// Empresa

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nif: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'companies',
    timestamps: true,
  });

  Company.associate = (models) => {
    Company.belongsTo(models.user, { foreignKey: 'user_id' });
    Company.hasMany(models.ad, { foreignKey: 'company_id' });
  };

  return Company;
};

