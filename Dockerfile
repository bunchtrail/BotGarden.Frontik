# Build stage
FROM node:18-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем curl для healthcheck и typescript
RUN apk add --no-cache curl && \
    npm install -g typescript

# Устанавливаем аргументы сборки
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM nginx:alpine

# Устанавливаем curl для healthcheck
RUN apk add --no-cache curl

# Копируем собранное приложение из build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Добавляем healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80 || exit 1

# Открываем порт
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"] 