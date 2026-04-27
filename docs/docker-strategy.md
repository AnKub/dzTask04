# Docker Strategy

## Goal

Підготувати проєкт до контейнеризації навіть без локального запуску Docker на слабкому ПК.

## Planned containers

1. frontend container
   - base image: node:20-alpine for build stage
   - production image: nginx:alpine
   - responsibility: build React SPA and serve static build files

2. websocket container
   - base image: node:20-alpine
   - responsibility: run session-server.js for active browser tabs counter

## Planned compose topology

docker-compose.yml should include:

1. frontend service
   - builds SPA
   - exposes port 80 or 3000 depending on final decision

2. websocket service
   - runs node session-server.js
   - exposes socket port

3. optional reverse proxy layer
   - can be skipped for the test task if nginx inside frontend container is enough

## Why this strategy

1. Розділяє SPA і websocket server на незалежні сервіси.
2. Дає зрозумілий production-like setup для перевіряючого.
3. Не вимагає локального запуску Docker під час щоденної розробки.

## Local limitation note

Через слабке локальне залізо Docker-конфігурація готується як артефакт для remote/CI validation. Розумний наступний крок — перевірити збірку контейнерів на іншій машині або в CI.