const { sequelize } = require('../models');

async function setupProductionDatabase() {
  try {
    console.log('🔄 Setup de la base de données en production...');
    
    // Test de connexion
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à la base de données !');
    
    // Synchronisation des modèles (sans force pour ne pas perdre les données)
    await sequelize.sync({ force: false });
    console.log('✅ Base de données synchronisée !');
    
    // Vérification des tables
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📊 Tables existantes :');
    results.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
    console.log('\n🎯 Base de données prête pour la production !');
    
  } catch (error) {
    console.error('❌ Erreur lors du setup :', error.message);
    console.log('\n🔧 Solutions possibles :');
    console.log('1. Vérifier que la base de données existe sur le VPS');
    console.log('2. Vérifier les identifiants dans .env');
    console.log('3. Vérifier que PostgreSQL est démarré sur le VPS');
  } finally {
    await sequelize.close();
  }
}

setupProductionDatabase();
