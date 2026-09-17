import json
import urllib.request

# مفتاح الـ API الخاص بك جاهز ومضبوط
API_KEY = "fd08394f2301a78ecb2b0a3ed0b5d3c3"
URL = "https://v3.football.api-sports.io/fixtures?live=all"

headers = {
    'x-apisports-key': API_KEY
}

try:
    req = urllib.request.Request(URL, headers=headers)
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        matches = []
        for fixture in data.get('response', []):
            match_info = {
                "league": fixture['league']['name'],
                "home": fixture['teams']['home']['name'],
                "away": fixture['teams']['away']['name'],
                "time": fixture['fixture']['date'][11:16],
                "score": f"{fixture['goals']['home'] ?? 0} - {fixture['goals']['away'] ?? 0}",
                "odds": "1: 1.90 | 2: 2.10"
            }
            matches.append(match_info)
            
        with open('live.json', 'w', encoding='utf-8') as f:
            json.dump(matches, f, ensure_ascii=False, indent=4)
            
        print("Live matches updated successfully!")
except Exception as e:
    print(f"Error updating matches: {e}")
