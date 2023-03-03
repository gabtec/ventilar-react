#!/bin/sh

ROOT_DIR=/usr/share/nginx/html/assets

# Replace env vars in files served by NGINX
for file in $ROOT_DIR/*.js*;

do
  sed -i'.original' -e 's|VITE_API_URL_PLACEHOLDER|'${API_URL}'|g' $file
  # Your other variables here...
done

echo "===> Launching http server ... "
# #Starting NGINX
nginx -g 'daemon off;'
