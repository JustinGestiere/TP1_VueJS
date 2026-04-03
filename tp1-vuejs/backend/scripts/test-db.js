const { sequelize } = require('../models');

async function testConnection() {
  try {
    console.log('🔄 Test de connexion à la base de données...');
    
    // Test de connexion
    await sequelize.authenticate();
    console.log('✅ Connexion réussie à PostgreSQL !');
    
    // Test de synchronisation
    console.log('🔄 Synchronisation des modèles...');
    await sequelize.sync({ force: false });
    console.log('✅ Base de données synchronisée !');
    
    // Vérification des tables
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('📊 Tables créées :');
    results.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });
    
  } catch (error) {
    console.error('❌ Erreur de connexion :', error.message);
    console.log('\n🔧 Solutions possibles :');
    console.log('1. PostgreSQL est-il installé ?');
    console.log('2. Le service PostgreSQL est-il démarré ?');
    console.log('3. Le fichier .env est-il configuré correctement ?');
    console.log('4. La base de données tp1_vuejs existe-t-elle ?');
  } finally {
    await sequelize.close();
  }
}

testConnection();
