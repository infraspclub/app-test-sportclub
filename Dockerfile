# Utiliza la imagen base de Ubuntu
FROM ubuntu:latest

# Etiqueta de mantenimiento (opcional)
LABEL maintainer="tu_nombre"

# Actualiza el índice del repositorio e instala paquetes básicos
RUN apt-get update && \
    apt-get install -y \
    curl \
    wget \
    nano \
    && apt-get clean

# Comando por defecto cuando se inicie el contenedor
CMD ["bash"]
