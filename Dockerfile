FROM nginx:alpine

COPY dist/registro-libros /usr/share/nginx/html

EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]