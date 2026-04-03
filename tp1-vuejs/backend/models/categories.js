'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    tableName: 'categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Category.associate = function(models) {
    Category.belongsTo(models.Category, { foreignKey: 'parent_id', as: 'parent' });
    Category.hasMany(models.Category, { foreignKey: 'parent_id', as: 'children' });
    Category.belongsToMany(models.Course, { 
      through: 'course_categories', 
      foreignKey: 'category_id',
      otherKey: 'course_id',
      as: 'courses'
    });
  };

  return Category;
};
