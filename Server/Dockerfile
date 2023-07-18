FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
RUN ls
RUN apk --no-cache add postgresql-client
RUN PGPASSWORD=6Ysu7M0qKG0CviiUvcJzf2iCDlRgVGdG psql -h dpg-cir7le5gkuvqadp8c0b0-a.oregon-postgres.render.com -U postgres_blueocean -d blueocean_1fgu \
    -a -f src/Database/migration.sql -f src/Database/seed.sql
CMD ["node", "src/server.js"]
