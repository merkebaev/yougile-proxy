const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const YOUGILE_KEY = process.env.YOUGILE_KEY;

app.use(cors());
app.use(express.json());

const headers = () => ({
  'Content-Type': 'application/json',
  'Authorization': `YOUGILE-KEY ${YOUGILE_KEY}`
});

const headersV2 = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${YOUGILE_KEY}`
});

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'YouGile PM Proxy' });
});

// Получить список проектов (v2)
app.get('/projects', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });
  try {
    const response = await fetch('https://ru.yougile.com/api-v2/projects', {
      method: 'GET',
      headers: headersV2()
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Получить список колонок проекта (v2)
app.get('/columns', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });
  try {
    const url = req.query.projectId
      ? `https://ru.yougile.com/api-v2/columns?projectId=${req.query.projectId}`
      : 'https://ru.yougile.com/api-v2/columns';
    const response = await fetch(url, {
      method: 'GET',
      headers: headersV2()
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Создать задачу (v1)
app.post('/tasks', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });
  try {
    const response = await fetch('https://yougile.com/data/api-v1/tasks', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Изменить задачу (v1)
app.put('/tasks', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });
  try {
    const response = await fetch('https://yougile.com/data/api-v1/tasks', {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Получить пользователей (v1)
app.get('/users', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });
  try {
    const response = await fetch('https://yougile.com/data/api-v1/users', {
      method: 'GET',
      headers: headers()
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Сообщение в чат задачи (v1)
app.post('/messages', async (req, res) => {
  if (!YOUGILE_KEY) return res.status(500).json({ error: 'YOUGILE_KEY не задан' });
  try {
    const response = await fetch('https://yougile.com/data/api-v1/messages', {
      method: 'POST',
      headers: headers(),
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
