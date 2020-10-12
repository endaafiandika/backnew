FROM node:12.4.0-alpine

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
