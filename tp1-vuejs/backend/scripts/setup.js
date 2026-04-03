const { sequelize } = require('../models');

async function setupDatabase() {
  try {
    console.log('🔄 Connexion à la base de données...');
    await sequelize.authenticate();
    console.log('✅ Connexion réussie!');

    console.log('🔄 Synchronisation des modèles...');
    await sequelize.sync({ force: true });
    console.log('✅ Base de données synchronisée!');

    console.log('🔄 Création des données de test...');
    const { User, Course, Module, Lesson, Category, Tag } = require('../models');

    // Créer un utilisateur instructeur
    const instructor = await User.create({
      email: 'instructor@example.com',
      password_hash: '$2b$10$example_hash', // À remplacer avec un vrai hash
      first_name: 'John',
      last_name: 'Doe',
      role: 'instructor'
    });

    // Créer des catégories
    const programmingCategory = await Category.create({
      name: 'Programmation',
      description: 'Cours de programmation'
    });

    const pythonTag = await Tag.create({
      name: 'Python',
      color: '#3776AB'
    });

    // Créer un cours
    const course = await Course.create({
      title: 'Base Python',
      description: 'Apprenez les fondamentaux de la programmation Python',
      status: 'draft',
      created_by: instructor.id,
      difficulty_level: 'beginner',
      estimated_duration: 20
    });

    // Associer le cours à la catégorie et au tag
    await course.setCategories([programmingCategory]);
    await course.setTags([pythonTag]);

    // Créer des modules
    const module1 = await Module.create({
      course_id: course.id,
      title: 'Introduction à Python',
      description: 'Découverte de Python',
      order_index: 1
    });

    const module2 = await Module.create({
      course_id: course.id,
      title: 'Variables et types',
      description: 'Les bases des variables',
      order_index: 2
    });

    // Créer des leçons
    await Lesson.create({
      module_id: module1.id,
      title: "Qu'est-ce que Python ?",
      type: 'doc',
      content: {
        html: '<h1>Introduction à Python</h1><p>Python est un langage de programmation...</p>'
      },
      order_index: 1,
      is_published: true
    });

    await Lesson.create({
      module_id: module1.id,
      title: 'Installation',
      type: 'video',
      content: {
        videoUrl: 'https://example.com/install.mp4',
        description: 'Video d\'installation'
      },
      order_index: 2,
      is_published: true
    });

    console.log('✅ Données de test créées avec succès!');
    console.log('📧 Email instructeur: instructor@example.com');
    console.log('🎓 Cours créé:', course.title);

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
  } finally {
    await sequelize.close();
  }
}

setupDatabase();
