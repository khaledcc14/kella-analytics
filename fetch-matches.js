fetch('https://api.football-data.org/v4/matches', {
  headers: {
    'X-Auth-Token': 'e5e40f39fcd24b3d9f5cb78f521d0803'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
