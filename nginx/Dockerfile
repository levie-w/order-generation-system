FROM nginx:1.23

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD mkdir -p -m 755 /ogs/logs/nginx && nginx -g "daemon off;"
