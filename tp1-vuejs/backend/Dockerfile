# Use Node.js
FROM node:20-alpine

# Install build dependencies for pg (native modules)
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose backend port
EXPOSE 3000

# Wait for DB, migrate and start
CMD ["sh", "-c", "npx sequelize-cli db:migrate && node index.js"]
