# Usa una imagen base de NGINX
FROM nginx:latest

# Copia los archivos de la aplicación Angular al contenedor
COPY ./dist/angel-rodriguez /usr/share/nginx/html

# Opcional: configura un archivo personalizado de NGINX
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
