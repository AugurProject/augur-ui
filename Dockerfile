ARG NODE_VERSION=10.15.0
FROM node:${NODE_VERSION}-alpine as builder

ENV PATH /root/.yarn/bin:$PATH
ARG ethereum_network=rinkeby
ENV ETHEREUM_NETWORK=$ethereum_network
ARG build_environment=dev
ENV BUILD_ENVIRONMENT=$build_environment
RUN apk --no-cache add git

# begin create caching layer
COPY package.json yarn.lock /augur/
WORKDIR /augur
RUN yarn install --frozen-lockfile
# end create caching layer

COPY . /augur

RUN set -ex; \
    if [ "$BUILD_ENVIRONMENT" = "dev" ]; then \
        ETHEREUM_NETWORK=$ethereum_network yarn build --dev --augur-hosted --disableMainnet; \
    elif [ "$BUILD_ENVIRONMENT" = "dev-optimized" ]; then \
        ETHEREUM_NETWORK=$ethereum_network yarn build --production --augur-hosted --disableMainnet; \
    elif [ "$BUILD_ENVIRONMENT" = "latest" ]; then \
        ETHEREUM_NETWORK=$ethereum_network yarn build --production --augur-hosted; \
    fi;

# need arg to pass in for augur-ui (production) and augur-dev (dev)
RUN git rev-parse HEAD > /augur/build/git-hash.txt \
  && git log -1 > /augur/build/git-commit.txt

FROM nginx:alpine

COPY --from=builder /augur/build/ /augur/build
COPY support/nginx-default.conf /etc/nginx/conf.d/default.conf
