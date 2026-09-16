import json
import urllib.request
import datetime

# جلب تاريخ اليوم بتوقيت UTC
today = datetime.datetime.utcnow().strftime('%Y-%m-%d')

# الرابط الشامل لجلب كل مباريات اليوم المتاحة في الـ API
url = f"https://v3.football.api-sports.io/fixtures?date={today}"

api_key = "fd08394f2301a78ecb2b8a3e0db5d3c3"

req = urllib.request.Request(
    url, 
    headers={
        "x-apisports-key": api_key,
        "x-rapidapi-host": "v3.football.api-sports.io"
    }
)

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        
        # حفظ كل المباريات في live.json
        with open('live.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print("تم جلب وتحديث كل مباريات اليوم بنجاح!")
except Exception as e:
    print(f"خطأ في الاتصال بالـ API: {e}")
  
