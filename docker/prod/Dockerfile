# --------- Builder Stage ---------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./
RUN if [ -f bun.lock ]; then \
      npm install -g bun && bun install; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

COPY . .

# Build the Nuxt application (Nitro output goes to .output)
RUN npm run build

# --------- Runner Stage ---------
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy production build from builder stage
COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
