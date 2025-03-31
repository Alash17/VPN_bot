const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// Настройки платежной системы (например, ЮKassa)
const YOOKASSA_API_KEY = 'YOUR_YOOKASSA_API_KEY';
const YOOKASSA_SHOP_ID = 'YOUR_SHOP_ID';

// Маршрут для создания счета
app.post('/create-payment', async (req, res) => {
  const { price, tariff } = req.body;

  try {
    const paymentResponse = await axios.post(
      'https://api.yookassa.ru/v3/payments',
      {
        amount: {
          value: price,
          currency: 'USD'
        },
        confirmation: {
          type: 'redirect',
          return_url: 'https://your-telegram-bot-url.com/success'
        },
        description: `Покупка VPN (${tariff})`
      },
      {
        auth: {
          username: YOOKASSA_SHOP_ID,
          password: YOOKASSA_API_KEY
        }
      }
    );

    const paymentUrl = paymentResponse.data.confirmation.confirmation_url;
    res.json({ success: true, paymentUrl });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});