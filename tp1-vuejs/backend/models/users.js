'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'instructor', 'student'),
      defaultValue: 'student'
    },
    avatar_url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.associate = function(models) {
    User.hasMany(models.Course, { foreignKey: 'created_by', as: 'createdCourses' });
    User.hasMany(models.UserProgress, { foreignKey: 'user_id', as: 'progress' });
    User.hasMany(models.CourseReview, { foreignKey: 'user_id', as: 'reviews' });
  };

  return User;
};
