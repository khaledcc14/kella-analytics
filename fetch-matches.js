// جلب البيانات الحية مباشرة من ملف live.json على مستودعك في GitHub
fetch('https://raw.githubusercontent.com/khaledcc14/kella-analytics/main/live.json', {
    cache: 'no-store'
})
.then(response => response.json())
.then(data => {
    console.log("تم جلب المباريات الحية بنجاح:", data);
})
.catch(error => console.error('خطأ في جلب البيانات:', error));
