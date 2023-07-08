FROM node:18-alpine as development
WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .
ENV CI=true
ENV PORT=3000
ENV NODE_OPTIONS=--max_old_space_size=2048

CMD [ "yarn", "start" ]

FROM development as build

RUN yarn build

FROM nginx:alpine
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
