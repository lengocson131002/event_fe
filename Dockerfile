FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
