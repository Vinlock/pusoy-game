FROM node:latest

ENV NODE_ENV=development

WORKDIR /var/app

RUN yarn global add nodemon

CMD ["nodemon", "--inspect=$NODEMON_DEBUG_PORT"]
