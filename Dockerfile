# Base for all builds
FROM node:14-alpine as base

ENV TZ=UTC
WORKDIR /app
EXPOSE 80
ENTRYPOINT [""]

# Build environment for dev and keeping prod clean
FROM base as build

COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node ./ .
RUN npm run build

# Prod build
FROM base as app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/

RUN npm install --production

CMD ["npm", "run", "start"]
