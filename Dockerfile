FROM node:14.3.0

WORKDIR /usr/src/app
COPY code/package.json ./

RUN yarn

COPY code/index.js .

EXPOSE 8080
CMD ["node", "index.js"]