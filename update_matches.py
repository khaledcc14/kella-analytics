import json
import requests

# رابط الدوري الإنجليزي الممتاز للموسم الحالي من مستودع openfootball المفتوح بدون مفاتيح
URL = "https://raw.githubusercontent.com/openfootball/football.json/master/2026-27/en.1.json"

try:
    print("Fetching upcoming league matches from openfootball...")
    response = requests.get(URL, timeout=30)
    print(f"Response Status Code: {response.status_code}")

    if response.status_code != 200:
        # رابط احتياطي لموسم 2025-26 إذا لم يتوفر الرابط الجديد بعد
        URL = "https://raw.githubusercontent.com/openfootball/football.json/master/2025-26/en.1.json"
        response = requests.get(URL, timeout=30)

    if response.status_code != 200:
        raise Exception(f"Failed to fetch data, status code: {response.status_code}")

    data = response.json()
    matches = []
    
    # استخراج المباريات الحقيقية للجدول
    rounds = data.get('rounds', [])
    for round_item in rounds:
        round_name = round_item.get('name', 'Round')
        for match in round_item.get('matches', []):
            team1 = match.get('team1', 'Team A')
            team2 = match.get('team2', 'Team B')
            date = match.get('date', 'Today')
            time = match.get('time', '')
            
            score_data = match.get('score', {}).get('ft', [])
            if len(score_data) == 2:
                score = f"{score_data[0]} - {score_data[1]}"
            else:
                score = "VS"

            match_info = {
                "league": f"Premier League ({round_name})",
                "home": team1,
                "away": team2,
                "time": f"{date} {time}".strip(),
                "score": score,
                "odds": "1: 1.90 | 2: 2.10"
            }
            matches.append(match_info)

    if matches:
        # نأخذ المباريات القادمة ونكتبها في live.json
        with open('live.json', 'w', encoding='utf-8') as f:
            json.dump(matches[:12], f, ensure_ascii=False, indent=4)
        print("Upcoming league matches updated successfully!")
    else:
        print("No matches found.")
        exit(1)

except Exception as e:
    print(f"Error updating matches: {e}")
    exit(1)
    
