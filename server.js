app.get('/api/matches/:date', (req, res) => {
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

    // إذا كان الملف مصفوفة مباشرة (Array) اعرضها مباشرة
    let matches = [];
    if (Array.isArray(matchesDatabase)) {
        matches = matchesDatabase;
    } else {
        // وإذا كان كائن (Object)، اجمع كل المباريات الموجودة داخله مهما كان تاريخها
        for (let key in matchesDatabase) {
            if (Array.isArray(matchesDatabase[key])) {
                matches = matches.concat(matchesDatabase[key]);
            }
        }
    }

    res.json({
        success: true,
        count: matches.length,
        matches: matches
    });
});
