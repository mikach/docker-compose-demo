FROM node:13

WORKDIR /usr/server-app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node", "."]
