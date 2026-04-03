'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create users table
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      last_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      role: {
        type: Sequelize.ENUM('admin', 'instructor', 'student'),
        defaultValue: 'student'
      },
      avatar_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create courses table
    await queryInterface.createTable('courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft'
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      thumbnail_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      difficulty_level: {
        type: Sequelize.ENUM('beginner', 'intermediate', 'advanced'),
        defaultValue: 'beginner'
      },
      estimated_duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0.00
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create modules table
    await queryInterface.createTable('modules', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      order_index: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create lessons table
    await queryInterface.createTable('lessons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      module_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'modules',
          key: 'id'
        }
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('doc', 'video', 'quiz', 'assignment'),
        allowNull: false
      },
      content: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      order_index: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      estimated_duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create categories table
    await queryInterface.createTable('categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create tags table
    await queryInterface.createTable('tags', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      color: {
        type: Sequelize.STRING(7),
        defaultValue: '#6B7280'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Create junction tables
    await queryInterface.createTable('course_categories', {
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      category_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      }
    });

    await queryInterface.createTable('course_tags', {
      course_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id'
        }
      },
      tag_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id'
        }
      }
    });

    // Add foreign key constraints
    await queryInterface.addConstraint('courses', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'courses_created_by_fkey',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('modules', {
      fields: ['course_id'],
      type: 'foreign key',
      name: 'modules_course_id_fkey',
      references: {
        table: 'courses',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('lessons', {
      fields: ['module_id'],
      type: 'foreign key',
      name: 'lessons_module_id_fkey',
      references: {
        table: 'modules',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('course_tags');
    await queryInterface.dropTable('course_categories');
    await queryInterface.dropTable('lessons');
    await queryInterface.dropTable('modules');
    await queryInterface.dropTable('courses');
    await queryInterface.dropTable('categories');
    await queryInterface.dropTable('tags');
    await queryInterface.dropTable('users');
  }
};
