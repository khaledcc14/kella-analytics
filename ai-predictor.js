// ==========================================
// KELLA Analytics Pro - Advanced AI & Goals Predictor
// Date: September 15, 2026
// ==========================================

class KellaAIPredictor {
    constructor() {
        this.teamStrengths = {
            "ريال مدريد": { attack: 94, defense: 88 },
            "برشلونة": { attack: 92, defense: 87 },
            "مانشستر سيتي": { attack: 95, defense: 90 },
            "باريس سان جيرمان": { attack: 91, defense: 85 },
            "بايرن ميونخ": { attack: 94, defense: 89 },
            "أرسنال": { attack: 89, defense: 91 },
            "إنتر ميلان": { attack: 88, defense: 90 },
            "أتلتيكو مدريد": { attack: 85, defense: 92 },
            "ميلان": { attack: 84, defense: 86 },
            "تشيلسي": { attack: 83, defense: 83 },
            "ليفربول": { attack: 93, defense: 88 },
            "يوفنتوس": { attack: 84, defense: 89 }
        };
    }

    // خوارزمية توليد النسب، الأهداف المتوقعة، والنتيجة التقريبية
    generateMatchIntelligence(homeTeam, awayTeam) {
        let home = this.teamStrengths[homeTeam] || { attack: 82, defense: 82 };
        let away = this.teamStrengths[awayTeam] || { attack: 82, defense: 82 };

        // حساب نسب الفوز
        let homePower = home.attack + (90 - away.defense) + 5; // عامل الأرض
        let awayPower = away.attack + (90 - home.defense);
        let total = homePower + awayPower;

        let homeWin = Math.round((homePower / total) * 75);
        let awayWin = Math.round((awayPower / total) * 75);
        let draw = 100 - (homeWin + awayWin);
        if (homeWin < 15) homeWin = 15;
        if (awayWin < 15) awayWin = 15;
        draw = 100 - (homeWin + awayWin);

        // توقع الأهداف بدقة بناءً على القوة الهجومية والدفاعية
        let homeExpectedGoals = (home.attack / 35).toFixed(1);
        let awayExpectedGoals = (away.attack / 38).toFixed(1);
        
        // توقع النتيجة التقريبية للأهداف
        let homePredictedGoalsScore = Math.round(home.attack / 45);
        let awayPredictedGoalsScore = Math.round(away.attack / 50);

        let advice = `توقع تسجيل ${homeTeam} لـ ${homeExpectedGoals} هدف مقابل ${awayExpectedGoals} هدف لـ ${awayTeam}. النتيجة المتوقعة: (${homePredictedGoalsScore} - ${awayPredictedGoalsScore}).`;

        return {
            homeWinProb: homeWin,
            drawProb: draw,
            awayWinProb: awayWin,
            predictedScore: `${homePredictedGoalsScore} - ${awayPredictedGoalsScore}`,
            expectedGoals: `xG: ${homeExpectedGoals} - ${awayExpectedGoals}`,
            aiAdvice: advice
        };
    }

    getDailyMatches() {
        const matches = [
            { id: 1, competition: "دوري أبطال أوروبا", homeTeam: "ريال مدريد", awayTeam: "باريس سان جيرمان", time: "20:00", date: "اليوم (15 سبتمبر)" },
            { id: 2, competition: "دوري أبطال أوروبا", homeTeam: "برشلونة", awayTeam: "مانشستر سيتي", time: "20:00", date: "اليوم (15 سبتمبر)" },
            { id: 3, competition: "دوري أبطال أوروبا", homeTeam: "ميلان", awayTeam: "أتلتيكو مدريد", time: "18:00", date: "اليوم (15 سبتمبر)" }
        ];
        return matches.map(m => ({ ...m, ...this.generateMatchIntelligence(m.homeTeam, m.awayTeam) }));
    }

    getWeeklyMatches() {
        const matches = [
            ...this.getDailyMatches(),
            { id: 4, competition: "دوري أبطال أوروبا", homeTeam: "بايرن ميونخ", awayTeam: "إنتر ميلان", time: "20:00", date: "الأربعاء (16 سبتمبر)" },
            { id: 5, competition: "الدوري الإنجليزي", homeTeam: "تشيلسي", awayTeam: "توتنهام", time: "21:00", date: "الخميس (17 سبتمبر)" },
            { id: 6, competition: "الدوري الإنجليزي", homeTeam: "مانشستر يونايتد", awayTeam: "ليفربول", time: "17:30", date: "السبت (19 سبتمبر)" }
        ];
        return matches.map(m => {
            if (m.homeWinProb) return m;
            return { ...m, ...this.generateMatchIntelligence(m.homeTeam, m.awayTeam) };
        });
    }

    getMonthlyMatches() {
        const matches = [
            ...this.getWeeklyMatches(),
            { id: 7, competition: "الدوري الإسباني", homeTeam: "أتلتيكو مدريد", awayTeam: "ريال مدريد", time: "21:00", date: "السبت (26 سبتمبر)" },
            { id: 8, competition: "دوري أبطال أوروبا", homeTeam: "باريس سان جيرمان", awayTeam: "بايرن ميونخ", time: "20:00", date: "الثلاثاء (29 سبتمبر)" }
        ];
        return matches.map(m => {
            if (m.homeWinProb) return m;
            return { ...m, ...this.generateMatchIntelligence(m.homeTeam, m.awayTeam) };
        });
    }
}

window.kellaPredictor = new KellaAIPredictor();
console.log("KELLA Goals & AI Predictor Loaded!");
