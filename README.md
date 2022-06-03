launch db: docker-compose up  
generate schema: npx prisma generate  
seed: npx prisma db seed     
dev: npm run start:dev
update tables when modifying schema.prisma : npx prisma migrate dev
