import json
import requests
from datetime import datetime

# الرابط المباشر لمباريات الدوري الإنجليزي الممتاز للموسم الحالي من OpenFootball
URL = "https://raw.githubusercontent.com/openfootball/football.json/master/2026-27/en.1.json"

try:
    print("Fetching live match data...")
    response = requests.get(URL, timeout=30)
    
    if response.status_code != 200:
        raise Exception(f"Failed to fetch data, status code: {response.status_code}")

    data = response.json()
    matches = []
    today_str = datetime.now().strftime('%Y-%m-%d')
    
    rounds = data.get('rounds', [])
    for round_item in rounds:
        round_name = round_item.get('name', 'Round')
        for match in round_item.get('matches', []):
            team1 = match.get('team1', 'Home Team')
            team2 = match.get('team2', 'Away Team')
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
                "odds": "1: 1.90 | 2: 2.10",
                "raw_date": date
            })

    # تصفية المباريات القادمة أو أخذ الجولة الحالية
    upcoming_matches = [m for m in matches if m['raw_date'] >= today_str]
    if not upcoming_matches:
        upcoming_matches = matches[-12:] # استخدام آخر الجولات كبديل إذا انتهت المباريات

    for m in upcoming_matches:
        m.pop('raw_date', None)

    if upcoming_matches:
        # كتابة البيانات الحقيقية حصرياً في ملف live.json
        with open('live.json', 'w', encoding='utf-8') as f:
            json.dump(upcoming_matches[:12], f, ensure_ascii=False, indent=4)
        print("live.json updated successfully with real matches!")
    else:
        print("No matches found.")
        exit(1)

except Exception as e:
    print(f"Error executing script: {e}")
    exit(1)
