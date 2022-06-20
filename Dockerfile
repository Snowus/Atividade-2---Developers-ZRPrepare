FROM node:14
WORKDIR /node-express-sequelize-postgresql
COPY package.json .
RUN npm install
COPY . .
CMD npm start