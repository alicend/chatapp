FROM node:20-alpine
WORKDIR /app
RUN [ "npm", "install", "-g", "npm@10.4.0" ]

RUN [ "npm", "install", "firebase"]
RUN [ "npm", "install", "@types/firebase", "--save-dev"]