FROM node:16

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm start