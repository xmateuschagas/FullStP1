document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  if (response.ok) {
      // Salvar o token JWT no localStorage
      localStorage.setItem('token', data.token);
      window.location.href = 'salas.html'; // Redirecionar para a página de salas
  } else {
      alert(data.message);
  }
});

document.getElementById('register-link').addEventListener('click', () => {
  document.getElementById('register-form').style.display = 'block';
});

document.getElementById('register-btn').addEventListener('click', async () => {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();
  if (response.ok) {
      alert('Registro bem-sucedido. Faça o login.');
      document.getElementById('register-form').style.display = 'none';
  } else {
      alert(data.message);
  }
});
