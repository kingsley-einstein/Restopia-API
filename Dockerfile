FROM node:10-alpine
COPY src ./src
COPY package*.json ./
RUN npm install
ENTRYPOINT ["npm", "run", "start:prod"] 