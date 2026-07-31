FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

ARG PORT=5000
ENV PORT=${PORT}

CMD ["npm", "start"]
