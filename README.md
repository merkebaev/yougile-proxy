# YouGile PM Proxy

Прокси-сервер для интеграции Claude с YouGile API. Решает проблему CORS при работе из браузера.

## Деплой на Railway (5 минут)

### 1. Загрузи на GitHub
```bash
git init
git add .
git commit -m "init"
# создай репозиторий на github.com и запушь
git remote add origin https://github.com/ВАШ_АККАУНТ/yougile-proxy.git
git push -u origin main
```

### 2. Задеплой на Railway
1. Зайди на [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Выбери репозиторий `yougile-proxy`
4. Railway автоматически задеплоит сервер

### 3. Добавь переменную окружения
В Railway → твой проект → Variables:
```
YOUGILE_KEY = твой_ключ_от_yougile
```

### 4. Получи URL
В Railway → Settings → Domains → Generate Domain  
Получишь что-то вроде: `https://yougile-proxy-production.up.railway.app`

Этот URL вставь в интерфейс Claude как адрес прокси.

## Эндпоинты

| Метод | Путь | Описание |
|-------|------|----------|
| GET | / | Проверка работы сервера |
| POST | /tasks | Создать задачу |
| PUT | /tasks | Изменить задачу |
| GET | /tasks/:id | Получить задачу |
| GET | /users | Список пользователей |
| POST | /messages | Сообщение в чат задачи |

## Локальный запуск (для теста)

```bash
npm install
YOUGILE_KEY=твой_ключ npm start
```

Сервер запустится на http://localhost:3000
