# --- deps ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --no-audit --no-fund || (echo "\nNo lockfile, continuing with package.json only" && npm install --no-audit --no-fund)

# --- build ---
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- run ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
EXPOSE 3000
CMD ["npm","start"]
