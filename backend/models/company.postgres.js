// models/company.postgres.js

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "company",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
        validate: {
          isEmail: true,
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      tableName: "companies",
      timestamps: true, // createdAt e updatedAt automáticos
    }
  );

  Company.associate = (models) => {
    Company.belongsTo(models.user, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    Company.hasMany(models.ad, {
      foreignKey: "company_id",
    });
  };

  return Company;
};
