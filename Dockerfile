FROM node:16

WORKDIR /app
COPY package.json ./

RUN npm install --silent
COPY . .

ENTRYPOINT ["npm", "run", "start:dev"]