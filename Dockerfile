# Build stage
FROM node:18 AS builder


# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-workspace.yaml  ./

# Copy shared package
COPY packages/shared ./packages/shared

# تثبيت OpenSSL لـ Prisma
RUN apt-get update && apt-get install -y openssl libssl-dev
# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install 

# Build shared package
RUN pnpm --filter shared build

# Copy backend
COPY apps/backend ./apps/backend
# Install NestJS CLI in backend directory
WORKDIR /app/apps/backend

RUN pnpm add -D @nestjs/cli

# Build backend
RUN pnpm --filter backend build

# # Return to app directory
# WORKDIR /app

# # Copy frontend
# COPY apps/frontend ./apps/frontend

# # Build frontend
# RUN pnpm --filter frontend build

# # Copy admin
# COPY apps/admin ./apps/admin

# # Build admin
# RUN pnpm --filter admin build

# Production stage
FROM node:18

# Set working directory
WORKDIR /app


# نفس مكتبات Prisma
RUN apt-get update && apt-get install -y openssl libssl-dev
# Copy built files from builder stage
COPY --from=builder /app/packages/shared/ ./packages/shared/
COPY --from=builder /app/apps/backend/ ./apps/backend/
# COPY --from=builder /app/apps/frontend/.next ./apps/frontend/.next
# COPY --from=builder /app/apps/admin/.next ./apps/admin/.next

# Copy package files
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install production dependencies
RUN pnpm install 

# Generate Prisma client
RUN pnpm prisma


# Expose ports
EXPOSE 3000 3001 3002 3003

# Start all services
CMD ["pnpm", "start"]

# \"pnpm frontend:start\" \"pnpm admin:start\"