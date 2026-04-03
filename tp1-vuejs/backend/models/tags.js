'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    color: {
      type: DataTypes.STRING(7),
      defaultValue: '#6B7280'
    }
  }, {
    tableName: 'tags',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Tag.associate = function(models) {
    Tag.belongsToMany(models.Course, { 
      through: 'course_tags', 
      foreignKey: 'tag_id',
      otherKey: 'course_id',
      as: 'courses'
    });
  };

  return Tag;
};
