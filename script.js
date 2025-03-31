document.querySelectorAll('#tariffs button').forEach(button => {
    button.addEventListener('click', async () => {
      const price = button.getAttribute('data-price');
      const tariff = button.textContent;
  
      // Отправляем запрос на создание счета
      const response = await fetch('/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price, tariff })
      });
  
      const paymentData = await response.json();
  
      if (paymentData.success) {
        // Перенаправляем пользователя на страницу оплаты
        window.location.href = paymentData.paymentUrl;
      } else {
        document.getElementById('payment-status').textContent = 'Ошибка при создании счета.';
      }
    });
  });