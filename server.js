// جلب المباريات الحقيقية المسجلة من ملف live.json مباشرة بلا تعقيد التواريخ
app.get('/api/matches/:date', (req, res) => {
    const date = req.params.date;
    
    // قراءة البيانات من ملف live.json المحدث عبر الـ API
    let matchesDatabase = {};
    try {
        const fs = require('fs');
        if (fs.existsSync('live.json')) {
            const rawData = fs.readFileSync('live.json', 'utf8');
            matchesDatabase = JSON.parse(rawData);
        }
    } catch (err) {
        console.error("Error reading live.json:", err);
    }

    // جلب المباريات الخاصة بالتاريخ المطلوب، أو إرجاع كل المباريات المتاحة كاحتياط لضمان ظهور الحقيقي
    let matches = matchesDatabase[date] || [];
    
    if (matches.length === 0) {
        // إذا لم يتم العثور على تاريخ مطابق حرفياً، اعرض كل المباريات الحقيقية المتاحة حالياً
        for (let d in matchesDatabase) {
            if (Array.isArray(matchesDatabase[d]) && matchesDatabase[d].length > 0) {
                matches = matches.concat(matchesDatabase[d]);
            }
        }
    }

    res.json({
        success: true,
        date: date,
        count: matches.length,
        matches: matches
    });
});
