FROM node:16 as build
WORKDIR /app
COPY --chown=node:node package.json .
COPY --chown=node:node yarn* .
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
RUN yarn build
RUN yarn install --frozen-lockfile --production=true 
USER node

# test build
FROM node:16 as test 
WORKDIR /app
COPY --chown=node:node package.json .
COPY --chown=node:node yarn* .
RUN yarn install --frozen-lockfile
COPY --chown=node:node . .
ENV CI=true
RUN yarn test

# Production build
FROM node:16
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
CMD ["node", "dist/main"]