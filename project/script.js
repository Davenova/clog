// Fetch user data when the "fetchData" button is clicked
document.getElementById('fetchData').addEventListener('click', function () {
    fetch('/api/user') // API endpoint for fetching user data
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
const initData = tg.initDataUnsafe;

// Fetch and save user data from Telegram WebApp
const initDataUnsafe = tg.initDataUnsafe || {};

if (initDataUnsafe.user) {
    fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(initDataUnsafe.user),
    })
    .then(res => res.json())
    .then(data => {
        console.log('User data saved:', data);
        document.getElementById('welcome-message').innerText = `Welcome, ${data.firstName}!`;
        document.getElementById('points').innerText = data.points;
    })
    .catch(err => {
        console.error('Failed to fetch user data:', err);
        document.getElementById('output').innerText = 'Error fetching user data.';
    });
} else {
    document.getElementById('output').innerText = 'No user data available.';
}

// Function to increase points
const increasePoints = () => {
  if (!initData.user) {
    document.getElementById('output').innerText = 'No user data available.';
    return;
  }

  const userData = {
    telegramId: initData.user.id,
    username: initData.user.username,
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

// Attach event listener for increasing points
document.getElementById('increase-points-btn').addEventListener('click', increasePoints);
