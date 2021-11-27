FROM node:16.13 as builder

WORKDIR /opt/arderco/frontend/
COPY . ./
RUN yarn ci \
 && yarn build

FROM nginx:1.21

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /opt/arderco/frontend/dist/ /usr/share/nginx/html

ARG NAME="Do you Dare? - Frontend" \
    AUTHOR="Bilotta Matteo" \
    COMMIT_REF \
    COMMIT_SHA \
    NOW

LABEL "net.byloth.do-you-dare.image.name"="${NAME}"
LABEL "net.byloth.do-you-dare.image.author"="${AUTHOR}"
LABEL "net.byloth.do-you-dare.image.commit.ref"="${COMMIT_REF}"
LABEL "net.byloth.do-you-dare.image.commit.sha"="${COMMIT_SHA}"
LABEL "net.byloth.do-you-dare.image.create-date"="${NOW}"
