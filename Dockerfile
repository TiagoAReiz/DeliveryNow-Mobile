# Dockerfile para rodar o app React Native/Expo
FROM node:20-alpine

# Instalar dependências
RUN apk add --no-cache git bash

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Instalar Expo CLI e ngrok para tunnel
RUN npm install -g @expo/ngrok
RUN npm install expo

# Copiar código
COPY . .

# Expor portas
EXPOSE 8081 19000 19001 19002

CMD ["npx", "expo", "start", "--tunnel"]

