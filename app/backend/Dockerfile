# Base da imagem
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /usr/src/app


# Copiando os arquivos de configuração
COPY package*.json ./

RUN npm install

# Copiando o restante dos arquivos
COPY . .

# Expondo porta
EXPOSE 3000

# Comando para rodar o backend
CMD ["npm", "run", "dev"]