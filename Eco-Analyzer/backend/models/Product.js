module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    manufacturingDetails: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    supplyChainInfo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    impactScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100
      }
    },
    analyzedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    indexes: [
      { fields: ['impactScore'] },
      { fields: ['analyzedAt'] }
    ],
    paranoid: true
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Product;
};