# strategy: augur-ui/.dockerignore ignores build and node_modules; we'll build augur-ui in a builder image, as if it were a fresh `git clone`, and then copy the static build artifact into an nginx image.

# For augur UI config, such as augur-node and ethereum node endpoints, the idea is to allow operators to specify these values from env variables when the webserver boots in production. This allows users to have "my-augur.com" without the messy AUGUR_NODE URL params.

# Helpful cmds
#  docker build -f Dockerfile2.dockerfile -t augur-ui:latest .
#  docker run --rm -p 8080:80 augur-ui:latest
# TODO make this work: docker run -e "AUGUR_NODE=ryanamazingaugurnode.com" --rm -p 8080:80 augur-ui:latest

FROM node:10.12.0 as builder
WORKDIR /augur-ui
COPY package.json /augur-ui/package.json
COPY yarn.lock /augur-ui/yarn.lock
RUN yarn install --pure-lockfile
COPY . /augur-ui
RUN ETHEREUM_NETWORK=mainnet-dynamic yarn build --augur-hosted

FROM nginx:1.15.8-alpine

# NEXT UP -- make echoed docker-entrypoint work (it seems to work, but verify with logs). Then add regexp substitution.

RUN echo 'nginx -g "daemon off;"' > /docker-entrypoint.sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]

COPY --from=builder /augur-ui/build /usr/share/nginx/html

### SCRATCH

# find /usr/share/nginx/html

# find -type f /usr/share/nginx/html | xargs -n1 perl -pi -w -e "s/AUGUR_NODE_TO_REPLACE/$AUGUR_NODE/g;"

# CMD ["nginx", "-g", "daemon off;"]
