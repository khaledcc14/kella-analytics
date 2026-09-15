// ==========================================
// KELLA Analytics Pro - Dynamic AI Engine
// Automatic Probability & Advice Generator
// Date: September 15, 2026
// ==========================================

class KellaAIPredictor {
    constructor() {
        // قائمة الفرق الكبرى وقوتها الأساسية (تقييم داخلي للخوارزمية)
        this.teamStrengths = {
            "ريال مدريد": 92,
            "برشلونة": 90,
            "مانشستر سيتي": 94,
            "باريس سان جيرمان": 89,
            "بايرن ميونخ": 93,
            "أرسنال": 88,
            "إنتر ميلان": 87,
            "أتلتيكو مدريد": 86,
            "ميلان": 85,
            "تشيلسي": 84,
            "ليفربول": 91,
            "يوفنتوس": 85,
            "مانشستر يونايتد": 83,
            "توتنهام": 83,
            "إشبيلية": 82,
            "فالنسيا": 80
        };
    }

    // دالة توليد التحليل والنسب ذكياً لأي مباراة
    generateAIAnalysis(homeTeam, awayTeam) {
        let homePower = this.teamStrengths[homeTeam] || 80;
        let awayPower = this.teamStrengths[awayTeam] || 80;

        // إضافة عامل الأرض لفريق المضيف
        homePower += 4;

        let total = homePower + awayPower;
        // حساب نسبة الفوز بدقة رياضية
        let homeWin = Math.round((homePower / total) * 75);
        let awayWin = Math.round((awayPower / total) * 75);
        let draw = 100 - (homeWin + awayWin);

        // تصحيح القيم لضمان المنطق الرياضي
        if (homeWin < 15) homeWin = 15;
        if (awayWin < 15) awayWin = 15;
        draw = 100 - (homeWin + awayWin);

        // توليد نص النصيحة والتحليل أوتوماتيكياً بناءً على النسب
        let advice = "";
        if (homeWin > awayWin + 10) {
            advice = `الذكاء الاصطناعي يتوقع سيطرة واضحة لـ ${homeTeam} بناءً على تفوق مؤشرات الأداء، مع احتمالية تسجيل أهداف مبكرة.`;
        } else if (awayWin > homeWin + 10) {
            advice = `تشير خوارزميات التحليل إلى قوة ملحوظة لـ ${awayTeam} خارج قواعده، وفرص خطيرة في الهجمات المرتدة.`;
        } else {
            advice = `مباراة متكافئة للغاية بين الطرفين، التكتيك الدفاعي قد يكون حاسماً مع تقارب حظوظ الحسم.`;
        }

        return {
            homeWinProb: homeWin,
            drawProb: draw,
            awayWinProb: awayWin,
            aiAdvice: advice
        };
    }

    // جلب مباريات اليوم وتوليد تحليلاتها في الحين
    getDailyMatches() {
        const rawMatches = [
            { id: 1, competition: "دوري أبطال أوروبا", homeTeam: "ريال مدريد", awayTeam: "باريس سان جيرمان", time: "20:00", date: "اليوم (15 سبتمبر)" },
            { id: 2, competition: "دوري أبطال أوروبا", homeTeam: "برشلونة", awayTeam: "مانشستر سيتي", time: "20:00", date: "اليوم (15 سبتمبر)" },
            { id: 3, competition: "دوري أبطال أوروبا", homeTeam: "ميلان", awayTeam: "أتلتيكو مدريد", time: "18:00", date: "اليوم (15 سبتمبر)" }
        ];

        return rawMatches.map(m => {
            const analysis = this.generateAIAnalysis(m.homeTeam, m.awayTeam);
            return { ...m, ...analysis };
        });
    }

    // جلب مباريات الأسبوع وتوليد تحليلاتها أوتوماتيكياً
    getWeeklyMatches() {
        const rawMatches = [
            ...this.getDailyMatches(),
            { id: 4, competition: "دوري أبطال أوروبا", homeTeam: "بايرن ميونخ", awayTeam: "إنتر ميلان", time: "20:00", date: "الأربعاء (16 سبتمبر)" },
            { id: 5, competition: "الدوري الإنجليزي الممتاز", homeTeam: "تشيلسي", awayTeam: "توتنهام", time: "21:00", date: "الخميس (17 سبتمبر)" },
            { id: 6, competition: "الدوري الإنجليزي الممتاز", homeTeam: "مانشستر يونايتد", awayTeam: "ليفربول", time: "17:30", date: "السبت (19 سبتمبر)" }
        ];

        return rawMatches.map(m => {
            if (m.homeWinProb) return m; // إذا كانت محسوبة مسبقاً
            const analysis = this.generateAIAnalysis(m.homeTeam, m.awayTeam);
            return { ...m, ...analysis };
        });
    }

    // جلب مباريات الشهر وتوليد تحليلاتها أوتوماتيكياً
    getMonthlyMatches() {
        const rawMatches = [
            ...this.getWeeklyMatches(),
            { id: 7, competition: "الدوري الإسباني", homeTeam: "أتلتيكو مدريد", awayTeam: "ريال مدريد", time: "21:00", date: "السبت (26 سبتمبر)" },
            { id: 8, competition: "دوري أبطال أوروبا", homeTeam: "باريس سان جيرمان", awayTeam: "بايرن ميونخ", time: "20:00", date: "الثلاثاء (29 سبتمبر)" }
        ];

        return rawMatches.map(m => {
            if (m.homeWinProb) return m;
            const analysis = this.generateAIAnalysis(m.homeTeam, m.awayTeam);
            return { ...m, ...analysis };
        });
    }
}

window.kellaPredictor = new KellaAIPredictor();
console.log("KELLA Dynamic AI Predictor Engine Initialized Successfully!");
