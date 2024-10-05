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
