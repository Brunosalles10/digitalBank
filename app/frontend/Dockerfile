# Imagem base
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Definir a variável de ambiente para o build
ENV VITE_API_URL=/api/

RUN npm run build

# Imagem de produção
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]