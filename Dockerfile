FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=80

EXPOSE 80

RUN npm run migrate:deploy:prod
RUN npx prisma generate

CMD ["npm", "run", "start:prod"]