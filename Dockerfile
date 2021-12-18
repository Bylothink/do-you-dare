FROM node:16.13 as builder

ARG VITE_BACKEND_URL

WORKDIR /opt/arderco/frontend/
COPY . ./

RUN echo "VITE_BACKEND_URL=${VITE_BACKEND_URL}" > .env \
 \
 && yarn ci \
 && yarn build

FROM nginx:1.21

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/arderco/frontend/dist/ /usr/share/nginx/html

ARG NAME="Do you Dare? - Frontend" \
    AUTHOR="Bilotta Matteo" \
    COMMIT_REF \
    COMMIT_SHA \
    NOW

LABEL "net.byloth.do-you-dare.frontend.image.name"="${NAME}"
LABEL "net.byloth.do-you-dare.frontend.image.author"="${AUTHOR}"
LABEL "net.byloth.do-you-dare.frontend.image.commit.ref"="${COMMIT_REF}"
LABEL "net.byloth.do-you-dare.frontend.image.commit.sha"="${COMMIT_SHA}"
LABEL "net.byloth.do-you-dare.frontend.image.create-date"="${NOW}"
