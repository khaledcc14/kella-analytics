import json
import requests

# رابط الموسم الحالي المحدث للدوري الإنجليزي الممتاز من OpenFootball
URL = "https://raw.githubusercontent.com/openfootball/football.json/master/2026-27/en.1.json"

try:
    print("Fetching current season matches...")
    response = requests.get(URL, timeout=30)
    print(f"Response Status Code: {response.status_code}")

    if response.status_code != 200:
        # رابط بديل لموسم 2025-26 الاحتياطي لضمان عدم توقف السكربت أبداً
        URL = "https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/en.1.json"
        response = requests.get(URL, timeout=30)

    if response.status_code != 200:
        raise Exception("Could not fetch match data from repositories.")

    data = response.json()
    matches = []
    
    rounds = data.get('rounds', [])
    for round_item in rounds:
        round_name = round_item.get('name', 'Round')
        for match in round_item.get('matches', []):
            team1 = match.get('team1', 'Team A')
            team2 = match.get('team2', 'Team B')
            date = match.get('date', 'TBD')
            time = match.get('time', '')
            
            score_data = match.get('score', {}).get('ft', [])
            score = f"{score_data[0]} - {score_data[1]}" if len(score_data) == 2 else "VS"

            matches.append({
                "league": f"Premier League - {round_name}",
                "home": team1,
                "away": team2,
                "time": f"{date} {time}".strip(),
                "score": score,
                "odds": "1: 1.90 | 2: 2.10"
            })

    if matches:
        with open('live.json', 'w', encoding='utf-8') as f:
            json.dump(matches[:15], f, ensure_ascii=False, indent=4)
        print("Matches updated successfully!")
    else:
        print("No matches available.")
        exit(1)

except Exception as e:
    print(f"Error: {e}")
    exit(1)
    
