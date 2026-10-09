import requests
import json

# التوكن الحقيقي الخاص بك المدمج مباشرة في السكربت
API_TOKEN = "0ECl34kyfhiNM6tWxd3a0k3mbDzpHFmrYki3UpErwiDTfcUGraHOjzrU8WqH"
URL = f"https://api.sportmonks.com/v3/football/livescores?api_token={API_TOKEN}"

def update_live_matches():
    print("جاري جلب المباريات الحية من SportMonks باستخدام التوكن الخاص بك...")
    try:
        response = requests.get(URL, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            
            with open('live.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
                
            print("تم تحديث ملف live.json بنجاح وببيانات حقيقية 100%!")
        else:
            print(f"خطأ في الاتصال بالـ API، رمز الاستجابة: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"حدث خطأ أثناء جلب وتحديث البيانات: {str(e)}")

if __name__ == "__main__":
    update_live_matches()
