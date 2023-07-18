FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
RUN ls
RUN apk --no-cache add postgresql-client
RUN PGPASSWORD=xaRPelCyyYvNgLSWiGYViJKhiPrT3WK2 psql -h dpg-cir5f75gkuvqadoklqhg-a.oregon-postgres.render.com -U postgres_blueocean -d blueocean_xb2h \
    -a -f src/Database/migration.sql -f src/Database/seed.sql
CMD ["node", "src/server.js"]
