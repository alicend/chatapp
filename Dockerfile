FROM node:20-alpine
WORKDIR /app
RUN [ "npm", "install", "-g", "npm@10.4.0" ]