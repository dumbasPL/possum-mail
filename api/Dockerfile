FROM node:18 as build

WORKDIR /builder/

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY ./ ./

RUN yarn build

FROM node:18

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app/

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY --from=build /builder/dist/ ./dist/

EXPOSE ${PORT}

CMD [ "node", "dist/index.js" ]
