# Use a versão mais recente do Node.js LTS
FROM node:18

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install

# Copie todo o código fonte do aplicativo
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD [ "node", "server.js" ]
