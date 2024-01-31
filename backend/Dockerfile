FROM node:20-alpine

# set working directory
WORKDIR /usr/src/app

ARG ENV

## Add the wait script to the image
COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

COPY ./backend /usr/src/app/

RUN npm install

# seed & run server
CMD /wait && npx prisma migrate reset --force; npm run dev