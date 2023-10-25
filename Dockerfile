#build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

#prod stage
FROM node:18-alpine AS prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
COPY ./.env ./.env
RUN yarn --prod
RUN rm package*.json
EXPOSE 3000

CMD ["node", "dist/main.js"]