# Use a imagem base node:lts-alpine
FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Fase de build
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Construindo o projeto
RUN pnpm run build

# Limpeza para produção
RUN pnpm prune --prod

# Fase final
FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3344
CMD [ "pnpm", "start" ]
