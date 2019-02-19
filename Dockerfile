FROM node:alpine as builder
WORKDIR /app/api
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:alpine
WORKDIR /app/api
COPY --from=builder /app/api/node_modules /app/api/node_modules
COPY --from=builder /app/api/dist /app/api
COPY ./package.json ./

CMD ["yarn", "start"]