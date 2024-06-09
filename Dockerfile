FROM node:20 AS uibuilder
WORKDIR /frontend
COPY ./ ./
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384
RUN yarn install
RUN yarn build

FROM nginx:1.25.2-alpine
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=uibuilder /frontend/dist/ /usr/share/nginx/html/

# Copy custom nginx config and static files

