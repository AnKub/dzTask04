# Orders & Products SPA

React + TypeScript односторінковий додаток для обліку замовлень, товарів і груп товарів з Redux Toolkit, React Router і SCSS.

У проєкті є три ключові сторінки: Orders, Products та Groups, а також загальний пошук, блок дати/часу, лівий сайдбар та websocket-лічильник активних сесій.

## Передумови

Для локального запуску потрібні:

1. Node.js 18+ або 20+
2. npm 9+
3. Два термінали для frontend і socket-server

## Live Demo

- Frontend: `https://chic-imagination-production-aa65.up.railway.app`
- Socket server: `https://dztask04-production.up.railway.app`

## Запуск

```bash
npm install
```

У першому терміналі:

```bash
npm start
```

У другому терміналі:

```bash
npm run socket-server
```

Застосунок працює на `http://localhost:3000`, websocket-сервер за замовчуванням на `http://localhost:4000`.

### Перевірка

```bash
npm run build
npm test
```

## Deployment та env

Для production використовується змінна:

```bash
REACT_APP_SOCKET_URL=https://your-socket-server-url
```

Якщо вона не задана, клієнт підключається до `http://localhost:4000`.

## Дані та API

Дані завантажуються через `fetch` з публічного endpoint:

- `public/api/inventory.json`

Сервіс і гідрація store:

- `src/services/inventoryApi.ts`
- `src/store/inventoryThunks.ts`

## Реалізація

Базова функціональність:

- сторінки Orders, Products, Groups з пов’язаними даними через `orderId` і `groupId`
- фільтрація та пошук
- master-detail перегляд груп і товарів
- адаптивна SCSS-стилізація
- централізований стан у Redux Toolkit
- роутинг через React Router

Додаткові фічі:

- lazy loading сторінок та code splitting
- fetch-based service layer замість прямого завантаження моків
- socket.io-лічильник активних сесій
- клієнтська валідація форми додавання товару
- unit-тести для service layer і reducer-логіки
- оптимізації ререндерів: debounce, memoization, контроль оновлення часу в header
- Docker-артефакти для production-like запуску: `Dockerfile`, `Dockerfile.socket`, `docker-compose.yml`, `nginx.conf`
- SQL-схема БД: `database/schema.sql`
