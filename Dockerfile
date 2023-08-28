# Utiliza la imagen base de Ubuntu
FROM ubuntu:latest

# Actualiza el índice del repositorio e instala paquetes básicos
RUN apt-get update && \
    apt-get install -y \
    nginx \
    curl \
    wget \
    nano \
    && apt-get clean

# Copia un archivo de configuración personalizado al contenedor
COPY index.html /usr/share/nginx/html/index.html

COPY default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para tráfico HTTP
EXPOSE 80

# Comando por defecto cuando se inicie el contenedor
CMD ["nginx", "-g", "daemon off;"]
