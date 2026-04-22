# Dockerfile - Frontend Bausen
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependencias primero (cache)
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile

# Copiar el resto y construir
COPY . .
RUN yarn build

# Etapa de ejecución
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copiar solo lo necesario para ejecutar
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["yarn", "start"]
