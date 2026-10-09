import json
import requests

# رابط حقيقي ومباشر من مستودع بيانات كرة القدم المفتوحة على GitHub (بدون أي مفتاح API)
URL = "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json"

try:
    print("Fetching real match data from openfootball repository...")
    response = requests.get(URL, timeout=30)
    print(f"Response Status Code: {response.status_code}")

    if response.status_code != 200:
        raise Exception(f"Failed to fetch data, status code: {response.status_code}")

    data = response.json()
    matches = []
    
    # استخراج المباريات الحقيقية من ملف البيانات المفتوحة
    raw_matches = data.get('matches', [])
    for match in raw_matches:
        team1 = match.get('team1', 'Team A')
        team2 = match.get('team2', 'Team B')
        date = match.get('date', 'Today')
        time = match.get('time', '00:00')
        
        # استخراج النتيجة إن وجدت، أو جعلها افتراضية للمباريات المجدولة
        score_data = match.get('score', {}).get('ft', [])
        if len(score_data) == 2:
            score = f"{score_data[0]} - {score_data[1]}"
        else:
            score = "vs"

        match_info = {
            "league": data.get('name', 'World Cup 2026'),
            "home": team1,
            "away": team2,
            "time": f"{date} {time}",
            "score": score,
            "odds": "1: 1.90 | 2: 2.10"
        }
        matches.append(match_info)

    # إذا وجدنا مباريات، نأخذ أول 10 مباريات حقيقية ونكتبها في ملف live.json
    if matches:
        with open('live.json', 'w', encoding='utf-8') as f:
            json.dump(matches[:10], f, ensure_ascii=False, indent=4)
        print("Real matches updated successfully from openfootball!")
    else:
        print("No matches found in the source data.")
        exit(1)

except Exception as e:
    print(f"Error updating matches: {e}")
    exit(1)
    
