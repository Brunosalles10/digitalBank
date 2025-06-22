# Imagem base
FROM node:20-alpine AS build
ARG REACT_APP_BACKEND_URI
ENV REACT_APP_BACKEND_URI=$REACT_APP_BACKEND_URI
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN npm install -g serve
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]