# Use the official Node.js image as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Install Prisma Client
RUN npx prisma generate

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
