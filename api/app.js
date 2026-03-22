const express = require('express');
const { Client } = require('pg');
const clientProm = require('prom-client');

const app = express(); // ✅ PRIMEIRO cria o app

// 🔗 Banco
const client = new Client({
  host: 'postgres',
  user: 'postgres',
  password: '123',
  database: 'postgres',
  port: 5432,
});

client.connect();

// 📊 Prometheus
const register = new clientProm.Registry();
clientProm.collectDefaultMetrics({ register });

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// ❤️ Health checks
app.get('/health', (req, res) => res.send('OK'));
app.get('/ready', (req, res) => res.send('READY'));

// 🚀 Root
app.get('/', (req, res) => {
  res.send('API rodando 🚀');
});

// 🚀 Start
app.listen(3000, () => console.log('Rodando na porta 3000'));
