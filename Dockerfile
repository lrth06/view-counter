FROM node:16 as builder
LABEL maintainer="Lrth06"
LABEL description="Dockerfile for the nodejs project"
LABEL version="1.0.0"

ARG REDIS_URI ${REDIS_URI}
RUN apt-get update && apt-get install -y nodejs && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY tsconfig.json .
COPY . .

RUN yarn build

FROM gcr.io/distroless/nodejs:16 as runner
WORKDIR /src

COPY --from=builder /app .
EXPOSE 3000
ENV REDIS_URI ${REDIS_URI}

CMD ["./dist/index.js"]