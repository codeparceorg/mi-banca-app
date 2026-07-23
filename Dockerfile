FROM nginx:alpine

# Copiar archivos generados por Vite
COPY dist /usr/share/nginx/html

# Configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

LABEL org.opencontainers.image.source https://github.com/codeparceorg/mi-banca-app

CMD ["nginx", "-g", "daemon off;"]