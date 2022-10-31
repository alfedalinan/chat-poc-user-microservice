FROM node:14
WORKDIR /srv
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3500
ENTRYPOINT npm start