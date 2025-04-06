# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and lock file
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/frontend ./apps/frontend
COPY packages ./packages

# 4. Install pnpm & dependencies
RUN npm install -g pnpm && pnpm install

# 5. Build the app
RUN pnpm --filter frontend build

# 6. Expose port and run
EXPOSE 3000

CMD ["pnpm", "--filter", "frontend", "start"] 