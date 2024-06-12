FROM --platform=linux/amd64 node:16

RUN apt-get update -y && apt-get install -y openssl && apt-get install libssl-dev

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3344

CMD ["docker", "run", "--memory=512m", "web"]
CMD [ "yarn", "start" ]
