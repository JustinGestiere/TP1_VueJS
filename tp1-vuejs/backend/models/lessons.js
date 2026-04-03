'use strict';

module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    module_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'modules',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('doc', 'video', 'quiz', 'assignment'),
      allowNull: false
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: 'Structured content (HTML, video URL, questions, etc.)'
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    estimated_duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in minutes'
    }
  }, {
    tableName: 'lessons',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Lesson.associate = function(models) {
    Lesson.belongsTo(models.Module, { foreignKey: 'module_id', as: 'module' });
    Lesson.hasMany(models.UserProgress, { foreignKey: 'lesson_id', as: 'progress' });
    Lesson.hasMany(models.QuizQuestion, { foreignKey: 'lesson_id', as: 'quizQuestions' });
  };

  return Lesson;
};
