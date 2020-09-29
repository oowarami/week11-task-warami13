FROM node:12-alpine

WORKDIR /tmp/week9

COPY . .

RUN yarn

RUN yarn tsc

EXPOSE 5000

CMD ["yarn", "start"]

