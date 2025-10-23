# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript if needed
RUN npm run build

# Start app
CMD ["node", "dist/index.js"]
