ARG VARIANT=16-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}
COPY .zshrc /home/node/.zshrc
RUN apt-get update && apt-get install -y --no-install-recommends git nodejs yarn 