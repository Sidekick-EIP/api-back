FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV PORT=80

EXPOSE 80

CMD npm run migrate:deploy:prod && npx prisma generate && npm run start:prod