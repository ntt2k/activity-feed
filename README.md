# Activity Feed

## How to start all services

### 1. Start DB
```
docker-compose up
```

### 2. Start Backend API
```
cd backend
npm install
```

#### Setup the database and apply all migrations + seed data
```
npx prisma migrate reset
```

#### How to run test
```
npm run test
```

#### How to start the API
```
npm run dev
```

### 3. Start Frontend UI
```
cd frontend
npm install
npm run dev
```