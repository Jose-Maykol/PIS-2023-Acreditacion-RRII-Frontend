#Imagen node, version 18
FROM node:18.17.1-alpine

# Instalar pm2 administrador de procesos.
RUN npm install -g pm2 

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el proyecto al contenedor
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación para producción
RUN npm run build


# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Ejecutar pm2
CMD ["pm2-runtime", "start", "npm", "--name", "next-app", "--", "run", "start"]
#CMD ["pm2-runtime", "start", "npm", "--", "start"]