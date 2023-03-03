# https://v2.vuejs.org/v2/cookbook/dockerize-vuejs-app.html
# build stage
FROM node:18.14.2-slim as builder

WORKDIR /app
COPY package*.json .

RUN npm install --silent

COPY . .

# CMD ["npm", "run", "build"]
RUN npm run build

# production stage with nginx:stable image
FROM nginx:1.21.1-alpine as production-stage

ARG API_URL=api

COPY --from=builder /app/dist /usr/share/nginx/html/

COPY ./deploy/*.sh /
RUN chmod +x /*.sh

EXPOSE 80
ENTRYPOINT ["/load-env-and-start-nginx.sh"]
