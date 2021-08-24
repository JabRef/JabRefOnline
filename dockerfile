FROM node:14-alpine As development

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .
RUN yarn generate

RUN yarn build


FROM node:14-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --only=production --pure-lockfile

COPY . .

COPY --from=development /app/dist ./dist

CMD ["yarn", "start"]
