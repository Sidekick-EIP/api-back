# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

# Start the server using the development build
CMD npx prisma generate && npx prisma migrate dev && npx prisma db seed && npm run start:dev