const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// قاعدة بيانات وهمية في السيرفر كمرحلة أولى (يمكن استبدالها لاحقاً بـ API حقيقي)
const matchesDatabase = {
    "2026-09-16": [
        { league: "دوري أبطال أوروبا", home: "مانشستر سيتي", away: "إنتر ميلان", time: "20:00", score: "2 - 1", odds: "1: 1.65 | 2: 4.80", ai: "Value Bet: تسجيل الفريقين BTTS" },
        { league: "دوري أبطال أوروبا", home: "باريس سان جيرمان", away: "جيرونا", time: "20:00", score: "2 - 0", odds: "1: 1.40 | 2: 7.00", ai: "Safe Pick: فوز PSG" }
    ],
    "2026-09-17": [
        { league: "دوري أبطال أوروبا", home: "موناكو", away: "برشلونة", time: "20:00", score: "1 - 3", odds: "1: 4.20 | 2: 1.75", ai: "Safe Pick: فوز برشلونة" }
    ]
};

// نقطة النهاية (API Endpoint) لجلب المباريات حسب التاريخ بشكل صحيح
app.get('/api/matches/:date', (req, res) => {
    const date = req.params.date;
    const matches = matchesDatabase[date] || [];
    res.json({
        success: true,
        date: date,
        count: matches.length,
        matches: matches
    });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`KELLA Backend Server is running on port ${PORT}`);
});
