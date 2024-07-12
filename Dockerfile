FROM node:20.15-alpine AS builder

RUN corepack enable pnpm

WORKDIR "/opt/do-you-dare"
COPY . ./

ARG BACKEND_URL
ARG HCAPTCHA_SITE_KEY
RUN touch .env \
 && echo "VITE_BACKEND_URL=${BACKEND_URL}" >> .env \
 && echo "VITE_HCAPTCHA_SITE_KEY=${HCAPTCHA_SITE_KEY}" >> .env \
 \
 && pnpm run ci \
 && pnpm build

FROM nginx:1.27-alpine

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
