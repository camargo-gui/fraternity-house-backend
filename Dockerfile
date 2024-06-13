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

# Adicionando um passo para gerar o Prisma client e verificar se foi gerado com sucesso
RUN pnpm run generate && echo "Prisma client generated successfully" && ls -la node_modules/.prisma/client || { echo 'Prisma client generation failed' ; exit 1; }

# Rodando as migrações
RUN pnpm run migrate

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
