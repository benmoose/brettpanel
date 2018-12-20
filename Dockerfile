FROM node:8-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build /usr/src/app

RUN apk add --update nodejs-npm \
    && npm install -g serve

EXPOSE 5000
CMD ["serve", "-s", "."]
