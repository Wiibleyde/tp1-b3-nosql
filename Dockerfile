FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
COPY . . 
RUN bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /usr/src/app /usr/src/app

FROM base AS release
COPY --from=prerelease /usr/src/app /usr/src/app

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "index.ts" ]