#!/bin/bash

# Script de déploiement sur VPS

echo "🚀 Déploiement TP1 VueJS..."

# Variables
DOCKER_REGISTRY="votre-registry.com"  # À modifier
DB_NAME="tp1_vuejs"
DB_USER="vuejs_user"
DB_PASSWORD="votre_password"     # À modifier

# Créer le fichier .env pour production
cat > .env.prod << EOF
DOCKER_REGISTRY=$DOCKER_REGISTRY
DB_NAME=$DB_NAME
DB_USER=$DB_USER
DB_PASSWORD=$DB_PASSWORD
EOF

# Arrêter les services existants
echo "🔄 Arrêt des services existants..."
docker-compose -f docker-compose.prod.yml down

# Pull des nouvelles images
echo "📥 Pull des nouvelles images..."
docker-compose -f docker-compose.prod.yml pull

# Démarrer les services
echo "🚀 Démarrage des services..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Attendre que les services soient prêts
echo "⏳ Attente des services..."
sleep 30

# Vérifier le statut
echo "📊 Vérification du statut..."
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🎯 Actions manuelles requises :"
echo "1. Se connecter au conteneur backend :"
echo "   docker exec -it \$(docker ps -qf 'name=tp1-vuejs-backend-1') sh"
echo ""
echo "2. Lancer le setup de la base de données :"
echo "   npm run setup-prod"
echo ""
echo "3. Vérifier que les tables sont créées :"
echo "   docker exec -it \$(docker ps -qf 'name=tp1-vuejs-database-1') psql -U \$DB_USER -d \$DB_NAME -c '\\dt'"
echo ""

# Nettoyer les anciennes images
echo "🧹 Nettoyage des anciennes images..."
docker image prune -f

echo "✅ Déploiement terminé !"
echo "🌐 Frontend: http://votre-domaine.com"
echo "🔧 Backend API: http://votre-domaine.com/api"
echo "📊 Base de données: Configuration manuelle requise"
