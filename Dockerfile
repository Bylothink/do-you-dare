FROM node:20.6-alpine as builder

WORKDIR "/opt/do-you-dare"
COPY . ./

ARG VITE_BACKEND_URL
RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > .env \
 \
 && yarn ci \
 && yarn build

FROM nginx:1.25-alpine

COPY --from=builder /opt/do-you-dare/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG VERSION
ARG COMMIT_SHA
ARG CREATE_DATE

LABEL org.opencontainers.image.title="Do you Dare? - Frontend"
LABEL org.opencontainers.image.description="A web-game based on the original game of \"Truth or Dare?\" with different game modes."
LABEL org.opencontainers.image.licenses="CC BY-NC-ND 4.0"
LABEL org.opencontainers.image.version="${VERSION}"
LABEL org.opencontainers.image.revision="${COMMIT_SHA}"
LABEL org.opencontainers.image.source="https://github.com/Bylothink/do-you-dare"
LABEL org.opencontainers.image.url="https://github.com/Bylothink/do-you-dare"
LABEL org.opencontainers.image.authors="Matteo Bilotta <me@byloth.net>"
LABEL org.opencontainers.image.vendor="Bylothink"
LABEL org.opencontainers.image.created="${CREATE_DATE}"
