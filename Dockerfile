FROM node:16-alpine

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV MEMORY_CACHE=0

# install chromium, tini and clear cache
RUN apk add --update-cache chromium tini \
 && rm -rf /var/cache/apk/* /tmp/*

USER node
WORKDIR "/home/node"

COPY . .

# install npm packages
RUN yarn install --pure-lockfile

EXPOSE 3010

ENTRYPOINT ["tini", "--"]
CMD ["node", "server.js"]