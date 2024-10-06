document.getElementById('fetchData').addEventListener('click', function () {
    // Relative path to the backend API deployed on Vercel
    fetch('/api/user') // Updated to correct endpoint
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById('output').innerText = data.message;
            } else {
                document.getElementById('output').innerText = 'No user data found.';
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            document.getElementById('output').innerText = 'Error fetching data.';
        });
});

// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;

// Function to increase points
const increasePoints = () => {
  const userData = {
    telegramId: tg.initDataUnsafe.user.id,
  };

  fetch('/api/increase-points', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      console.log('Points increased:', data.points);
      document.getElementById('points').innerText = data.points;
      document.getElementById('notification').innerText = 'Points increased successfully!';
      document.getElementById('notification').classList.remove('hidden');
      setTimeout(() => document.getElementById('notification').classList.add('hidden'), 3000);
    } else {
      console.error('Failed to increase points:', data.error);
      document.getElementById('notification').innerText = 'Failed to increase points.';
      document.getElementById('notification').classList.remove('hidden');
    }
  })
  .catch(err => {
    console.error('Error increasing points:', err);
    document.getElementById('notification').innerText = 'Error increasing points.';
    document.getElementById('notification').classList.remove('hidden');
  });
};

// Fetch user data when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const userData = {
    id: tg.initDataUnsafe.user.id,
    username: tg.initDataUnsafe.user.username,
  };

  fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
  .then(res => res.json())
  .then(data => {
    console.log('User data:', data);
    document.getElementById('welcome-message').innerText = `Welcome, ${data.username}!`;
    document.getElementById('points').innerText = data.points;
  })
  .catch(err => {
    console.error('Error fetching user data:', err);
    document.getElementById('output').innerText = 'Error fetching user data.';
  });

  // Attach event listener for increasing points
  document.getElementById('increase-points-btn').addEventListener('click', increasePoints);
});