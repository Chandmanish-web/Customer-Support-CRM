FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
RUN npm install -g serve

COPY --from=build /app/dist ./dist
ARG PORT=4173
ENV PORT=${PORT}

CMD ["serve", "-s", "dist", "-l", "${PORT}"]
