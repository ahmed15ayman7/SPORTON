# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json and lock file
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/shared ./packages/shared

# 4. Install pnpm & dependencies
RUN npm install -g pnpm && pnpm install

# 5. Build the package
RUN pnpm --filter shared build

# 6. Expose port (optional, as this is a shared package)
EXPOSE 3003

# 7. Run prisma generate and db push
CMD ["pnpm", "--filter", "shared", "prisma", "generate"] 