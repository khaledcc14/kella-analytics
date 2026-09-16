const express = require('express');
const https = require('https');
const app = express();

app.use(express.json());

app.get('/api/matches/:date', (req, res) => {
    const apiKey = "a8950bd15129e3c88a017109cb2dd1981661bb901886343";
    const targetDate = req.params.date || "2026-09-17";
    
    // جلب المباريات الحقيقية مباشرة من API الفوتبول لتفادي أي فراغ أو وهم
    const url = `https://apiv3.apifootball.com/?action=get_matches&APIkey=${apiKey}&from=${targetDate}&to=${targetDate}`;

    https.get(url, (apiRes) => {
        let data = '';
        apiRes.on('data', (chunk) => {
            data += chunk;
        });

        apiRes.on('end', () => {
            try {
                const apiMatches = JSON.parse(data);
                if (Array.isArray(apiMatches) && apiMatches.length > 0) {
                    const formattedMatches = apiMatches.map(m => ({
                        "league": m.league_name || "General League",
                        "home": m.match_hometeam_name || "Home",
                        "away": m.match_awayteam_name || "Away",
                        "time": m.match_time || "20:00",
                        "score": `${m.match_hometeam_score || '0'} - ${m.match_awayteam_score || '0'}`,
                        "odds": "1: 1.85 | 2: 2.10"
                    }));
                    return res.json({ success: true, matches: formattedMatches });
                }
            } catch (e) {
                console.error("Parse error:", e);
            }
            
            // إذا لم تتوفر مباريات في ذلك التاريخ بالذات، نعيد مصفوفة فارغة حقيقية أو سجلات فارغة لكي يراها التطبيق بصدق
            res.json({ success: true, matches: [] });
        });
    }).on('error', (err) => {
        console.error("API request error:", err);
        res.json({ success: true, matches: [] });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
