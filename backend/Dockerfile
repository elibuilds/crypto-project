# Stage 1: Build dependencies
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package manifest files
COPY package*.json ./

# Install dependencies (only production if building for prod)
RUN npm ci --only=production

# Stage 2: Run the application
FROM node:22-alpine

# Set to production environment
ENV NODE_ENV=production

# Use a non-root user for security (provided by the official node image)
USER node

WORKDIR /usr/src/app

# Copy dependencies and source code from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY . .

# Expose your application port (standard is 3000)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
