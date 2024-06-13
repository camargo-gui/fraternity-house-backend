FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run migrate
RUN pnpm run generate
RUN pnpm run build
RUN pnpm prune --prod

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3344
CMD [ "pnpm", "start" ]