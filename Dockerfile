FROM node:17.4-alpine as builder

ARG VITE_BACKEND_URL

WORKDIR /opt/arderco/frontend/
COPY . ./

RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > .env \
 \
 && yarn ci \
 && yarn build

FROM nginx:1.21-alpine

COPY --from=builder /opt/arderco/frontend/dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ARG NAME="Do you Dare? - Frontend"
ARG AUTHOR="Bilotta Matteo"
ARG COMMIT_REF
ARG COMMIT_SHA
ARG CREATE_DATE

LABEL "net.byloth.doyoudare.frontend.image.name"="${NAME}"
LABEL "net.byloth.doyoudare.frontend.image.author"="${AUTHOR}"
LABEL "net.byloth.doyoudare.frontend.image.commit.ref"="${COMMIT_REF}"
LABEL "net.byloth.doyoudare.frontend.image.commit.sha"="${COMMIT_SHA}"
LABEL "net.byloth.doyoudare.frontend.image.create-date"="${CREATE_DATE}"
