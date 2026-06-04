const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const YOUGILE_KEY = process.env.YOUGILE_KEY;

app.use(cors());
app.use(express.json());

// Проверка что сервер живой
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'YouGile PM Proxy' });
});

// Создать задачу
app.post('/tasks', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан в переменных окружения' });

  try {
    const response = await fetch('https://yougile.com/data/api-v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `YOUGILE-KEY ${YOUGILE_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Изменить задачу
app.put('/tasks', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });

  try {
    const response = await fetch('https://yougile.com/data/api-v1/tasks', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `YOUGILE-KEY ${YOUGILE_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Получить задачу по id
app.get('/tasks/:id', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });

  try {
    const response = await fetch('https://yougile.com/data/api-v1/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `YOUGILE-KEY ${YOUGILE_KEY}`
      },
      body: JSON.stringify({ id: req.params.id })
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Получить пользователей
app.get('/users', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });

  try {
    const response = await fetch('https://yougile.com/data/api-v1/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `YOUGILE-KEY ${YOUGILE_KEY}`
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Отправить сообщение в чат задачи
app.post('/messages', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });

  try {
    const response = await fetch('https://yougile.com/data/api-v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `YOUGILE-KEY ${YOUGILE_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`YouGile proxy запущен на порту ${PORT}`);
});
