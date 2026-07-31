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

# Use shell form so $PORT is expanded at runtime. Serve expects a listen endpoint;
# providing 0.0.0.0:$PORT ensures it listens on all interfaces.
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:$PORT"]
