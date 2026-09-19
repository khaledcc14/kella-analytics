import json
import requests

API_KEY = "fd08394f2301a78ecb2b0a3ed0b5d3c3"
URL = "https://v3.football.api-sports.io/fixtures?live=all"

headers = {
    'x-apisports-key': API_KEY
}

try:
    print("Sending request to API-Sports...")
    response = requests.get(URL, headers=headers, timeout=30)
    
    print(f"API Response Status Code: {response.status_code}")
    
    if response.status_code != 200:
        print(f"API Error Response: {response.text}")
        exit(1)
        
    data = response.json()
    
    matches = []
    fixtures = data.get('response', [])
    print(f"Found {len(fixtures)} live matches.")
    
    for fixture in fixtures:
        home_goals = fixture.get('goals', {}).get('home', 0) or 0
        away_goals = fixture.get('goals', {}).get('away', 0) or 0
        
        match_info = {
            "league": fixture['league']['name'],
            "home": fixture['teams']['home']['name'],
            "away": fixture['teams']['away']['name'],
            "time": fixture['fixture']['date'][11:16],
            "score": f"{home_goals} - {away_goals}",
            "odds": "1: 1.90 | 2: 2.10"
        }
        matches.append(match_info)

    with open('live.json', 'w', encoding='utf-8') as f:
        json.dump(matches, f, ensure_ascii=False, indent=4)

    print("Live matches updated successfully!")

except Exception as e:
    print(f"Error updating matches: {e}")
    exit(1)
