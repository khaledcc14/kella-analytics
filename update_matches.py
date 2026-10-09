import requests
import json

API_TOKEN = "0ECl34kyfhiNM6tWxd3a0k3mbDzpHFmrYki3UpErwiDTfcUGraHOjzrU8WqH"
URL = f"https://api.sportmonks.com/v3/football/livescores?api_token={API_TOKEN}"

def fetch_and_save_matches():
    print("جاري جلب المباريات الحية من SportMonks API...")
    try:
        response = requests.get(URL, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            
            with open('live.json', 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
                
            print("تم تحديث ملف live.json بنجاح ببيانات حقيقية من SportMonks!")
        else:
            print(f"خطأ في الاتصال بالـ API، رمز الاستجابة: {response.status_code}")
            print(response.text)
            
    except Exception as e:
        print(f"حدث خطأ أثناء الاتصال: {str(e)}")

if __name__ == "__main__":
    fetch_and_save_matches()
    
