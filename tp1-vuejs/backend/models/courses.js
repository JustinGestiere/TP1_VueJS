'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      defaultValue: 'draft'
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    thumbnail_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    difficulty_level: {
      type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
      defaultValue: 'beginner'
    },
    estimated_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in hours'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    }
  }, {
    tableName: 'courses',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Course.associate = function(models) {
    Course.belongsTo(models.User, { foreignKey: 'created_by', as: 'creator' });
    Course.hasMany(models.Module, { foreignKey: 'course_id', as: 'modules' });
    Course.hasMany(models.CourseReview, { foreignKey: 'course_id', as: 'reviews' });
    Course.belongsToMany(models.Category, { 
      through: 'course_categories', 
      foreignKey: 'course_id',
      otherKey: 'category_id',
      as: 'categories'
    });
    Course.belongsToMany(models.Tag, { 
      through: 'course_tags', 
      foreignKey: 'course_id',
      otherKey: 'tag_id',
      as: 'tags'
    });
  };

  return Course;
};
