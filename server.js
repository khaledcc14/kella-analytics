const express = require('express');
const fs = require('fs');
const app = express();

// السماح بالاتصالات الخارجية
app.use(express.json());

// مسار جلب المباريات المباشر والصريح
app.get('/api/matches/:date', (req, res) => {
    try {
        if (fs.existsSync('live.json')) {
            const rawData = fs.readFileSync('live.json', 'utf8');
            const jsonData = JSON.parse(rawData);
            
            // إذا كان الملف عبارة عن قائمة مباشرة أو كائن، نعيده بوضوح
            if (Array.isArray(jsonData)) {
                return res.json({ success: true, matches: jsonData });
            } else if (typeof jsonData === 'object' && jsonData !== null) {
                // تجميع كل المباريات من الكائن مهما كان التاريخ
                let allMatches = [];
                for (let key in jsonData) {
                    if (Array.isArray(jsonData[key])) {
                        allMatches = allMatches.concat(jsonData[key]);
                    }
                }
                return res.json({ success: true, matches: allMatches });
            }
        }
    } catch (err) {
        console.error("Server Error:", err);
    }

    // إرجاع قائمة فارغة أماناً إذا حدث أي خلل
    res.json({ success: true, matches: [] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
