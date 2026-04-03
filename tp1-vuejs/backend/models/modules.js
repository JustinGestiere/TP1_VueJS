'use strict';

module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'modules',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Module.associate = function(models) {
    Module.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
    Module.hasMany(models.Lesson, { foreignKey: 'module_id', as: 'lessons' });
  };

  return Module;
};
