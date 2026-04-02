'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('roles', {
      id_roles: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      roles_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });

    await queryInterface.createTable('users', {
      id_users: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: Sequelize.STRING(50),
      firstname: Sequelize.STRING(50),
      mail: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      id_roles: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id_roles'
        }
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    });

    await queryInterface.createTable('groups', {
      id_groups: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      groups_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      }
    });

    await queryInterface.createTable('users_groups', {
      id_users_groups: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_users: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id_users'
        }
      },
      id_groups: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id_groups'
        }
      }
    });

    await queryInterface.addConstraint('users_groups', {
      fields: ['id_users', 'id_groups'],
      type: 'unique',
      name: 'users_groups_unique'
    });

    await queryInterface.createTable('courses', {
      id_courses: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      courses_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      id_groups: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id_groups'
        }
      }
    });

    await queryInterface.createTable('groups_courses', {
      id_groups_courses: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_groups: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id_groups'
        }
      },
      id_courses: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id_courses'
        }
      }
    });

    await queryInterface.addConstraint('groups_courses', {
      fields: ['id_groups', 'id_courses'],
      type: 'unique',
      name: 'groups_courses_unique'
    });

    await queryInterface.createTable('contents', {
      id_contents: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_courses: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id_courses'
        }
      },
      code_correction: Sequelize.TEXT,
      result_correction: Sequelize.TEXT
    });

    await queryInterface.createTable('learner_contents', {
      id_learner_contents: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_contents: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'contents',
          key: 'id_contents'
        }
      },
      result: Sequelize.TEXT,
      id_users: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id_users'
        }
      },
      current_contents: Sequelize.TEXT
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('learner_contents');
    await queryInterface.dropTable('contents');
    await queryInterface.dropTable('groups_courses');
    await queryInterface.dropTable('courses');
    await queryInterface.dropTable('users_groups');
    await queryInterface.dropTable('groups');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
  }
};