FROM node:20-alpine

# set working directory
WORKDIR /usr/src/app

ARG ENV

## Add the wait script to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

COPY ./frontend /usr/src/app/

RUN npm install

# run dev
CMD /wait && npm run dev