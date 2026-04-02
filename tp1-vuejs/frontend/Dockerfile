# Use Node.js for development
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Start Vite with --host to allow external access
CMD ["npm", "run", "dev", "--", "--host"]
