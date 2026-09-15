// ==========================================
// KELLA Analytics Pro - World Leagues & Global AI Predictor
// Date: September 15, 2026
// ==========================================

class KellaAIPredictor {
    constructor() {
        this.teamStrengths = {
            // الدوريات العربية الإفريقية (المصري، التونسي، المغربي، الجزائري، السعودي)
            "الأهلي المصري": { attack: 91, defense: 88, league: "الدوري المصري" },
            "الزمالك": { attack: 87, defense: 85, league: "الدوري المصري" },
            "بيراميدز": { attack: 88, defense: 86, league: "الدوري المصري" },

            "الترجي الرياضي": { attack: 89, defense: 87, league: "الدوري التونسي" },
            "النجم الساحلي": { attack: 85, defense: 84, league: "الدوري التونسي" },
            "النادي الأفريقي": { attack: 83, defense: 82, league: "الدوري التونسي" },

            "الوداد الرياضي": { attack: 88, defense: 86, league: "الدوري المغربي" },
            "الرجاء الرياضي": { attack: 87, defense: 85, league: "الدوري المغربي" },
            "نهضة بركان": { attack: 84, defense: 84, league: "الدوري المغربي" },

            "مولودية الجزائر": { attack: 82, defense: 84, league: "الدوري الجزائري" },
            "شباب بلوزداد": { attack: 83, defense: 85, league: "الدوري الجزائري" },
            "اتحاد الجزائر": { attack: 82, defense: 83, league: "الدوري الجزائري" },

            "الهلال": { attack: 90, defense: 88, league: "دوري روشن السعودي" },
            "النصر": { attack: 89, defense: 84, league: "دوري روشن السعودي" },

            // الدوريات الأوروبية الكبرى (الإسباني، الإنجليزي، الفرنسي، الألماني، الإيطالي، البلجيكي، التركي، الروسي)
            "ريال مدريد": { attack: 94, defense: 88, league: "الدوري الإسباني" },
            "برشلونة": { attack: 92, defense: 87, league: "الدوري الإسباني" },
            
            "مانشستر سيتي": { attack: 95, defense: 90, league: "الدوري الإنجليزي" },
            "ليفربول": { attack: 93, defense: 88, league: "الدوري الإنجليزي" },

            "باريس سان جيرمان": { attack: 91, defense: 85, league: "الدوري الفرنسي" },
            "مارسيليا": { attack: 84, defense: 83, league: "الدوري الفرنسي" },
            "ليون": { attack: 83, defense: 82, league: "الدوري الفرنسي" },

            "بايرن ميونخ": { attack: 94, defense: 89, league: "الدوري الألماني" },
            "بوروسيا دورتموند": { attack: 88, defense: 83, league: "الدوري الألماني" },
            "باير ليفركوزن": { attack: 89, defense: 87, league: "الدوري الألماني" },

            "إنتر ميلان": { attack: 88, defense: 90, league: "الدوري الإيطالي" },
            "ميلان": { attack: 84, defense: 86, league: "الدوري الإيطالي" },

            "كلوب بروج": { attack: 84, defense: 82, league: "الدوري البلجيكي" },
            "أندرلخت": { attack: 83, defense: 81, league: "الدوري البلجيكي" },

            "غلطة سراي": { attack: 87, defense: 84, league: "الدوري التركي" },
            "فنربخشة": { attack: 86, defense: 83, league: "الدوري التركي" },

            "زينيت سانت بطرسبرغ": { attack: 86, defense: 85, league: "الدوري الروسي" },
            "سبارتاك موسكو": { attack: 83, defense: 81, league: "الدوري الروسي" },

            // الأمريكتين (البرازيلي والأمريكي)
            "فلامينغو": { attack: 87, defense: 85, league: "الدوري البرازيلي" },
            "بالميراس": { attack: 88, defense: 86, league: "الدوري البرازيلي" },

            "إنتر ميامي": { attack: 88, defense: 79, league: "الدوري الأمريكي" },
            "لوس أنجلوس": { attack: 85, defense: 81, league: "الدوري الأمريكي" }
        };
    }

    generateMatchIntelligence(homeTeam, awayTeam, competition) {
        let home = this.teamStrengths[homeTeam] || { attack: 80, defense: 80 };
        let away = this.teamStrengths[awayTeam] || { attack: 80, defense: 80 };

        let homePower = home.attack + (90 - away.defense) + 4; 
        let awayPower = away.attack + (90 - home.defense);
        let total = homePower + awayPower;

        let homeWin = Math.round((homePower / total) * 75);
        let awayWin = Math.round((awayPower / total) * 75);
        let draw = 100 - (homeWin + awayWin);
        if (homeWin < 15) homeWin = 15;
        if (awayWin < 15) awayWin = 15;
        draw = 100 - (homeWin + awayWin);

        let homeExpectedGoals = (home.attack / 35).toFixed(1);
        let awayExpectedGoals = (away.attack / 38).toFixed(1);
        
        let homePredictedGoalsScore = Math.round(home.attack / 45);
        let awayPredictedGoalsScore = Math.round(away.attack / 50);

        let advice = `توقع تسجيل ${homeTeam} لـ ${homeExpectedGoals} أهداف مقابل ${awayExpectedGoals} لـ ${awayTeam} في منافسات ${competition}. النتيجة التقريبية: (${homePredictedGoalsScore} - ${awayPredictedGoalsScore}).`;

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
            { id: 1, competition: "الدوري المصري", homeTeam: "الأهلي المصري", awayTeam: "الزمالك", time: "20:00", date: "اليوم (15 سبتمبر)" },
            { id: 2, competition: "الدوري التونسي", homeTeam: "الترجي الرياضي", awayTeam: "النجم الساحلي", time: "17:30", date: "اليوم (15 سبتمبر)" },
            { id: 3, competition: "الدوري المغربي", homeTeam: "الوداد الرياضي", awayTeam: "الرجاء الرياضي", time: "21:00", date: "اليوم (15 سبتمبر)" }
        ];
        return matches.map(m => ({ ...m, ...this.generateMatchIntelligence(m.homeTeam, m.awayTeam, m.competition) }));
    }

    getWeeklyMatches() {
        const matches = [
            ...this.getDailyMatches(),
            { id: 4, competition: "الدوري الفرنسي", homeTeam: "باريس سان جيرمان", awayTeam: "مارسيليا", time: "21:00", date: "السبت (19 سبتمبر)" },
            { id: 5, competition: "الدوري الألماني", homeTeam: "بايرن ميونخ", awayTeam: "بوروسيا دورتموند", time: "18:30", date: "السبت (19 سبتمبر)" },
            { id: 6, competition: "الدوري البلجيكي", homeTeam: "كلوب بروج", awayTeam: "أندرلخت", time: "16:00", date: "الأحد (20 سبتمبر)" }
        ];
        return matches.map(m => {
            if (m.homeWinProb) return m;
            return { ...m, ...this.generateMatchIntelligence(m.homeTeam, m.awayTeam, m.competition) };
        });
    }

    getMonthlyMatches() {
        const matches = [
            ...this.getWeeklyMatches(),
            { id: 7, competition: "الدوري التركي", homeTeam: "غلطة سراي", awayTeam: "فنربخشة", time: "20:00", date: "الخميس (24 سبتمبر)" },
            { id: 8, competition: "الدوري البرازيلي", homeTeam: "فلامينغو", awayTeam: "بالميراس", time: "23:00", date: "السبت (26 سبتمبر)" },
            { id: 9, competition: "الدوري الأمريكي", homeTeam: "إنتر ميامي", awayTeam: "لوس أنجلوس", time: "02:00", date: "الأحد (27 سبتمبر)" }
        ];
        return matches.map(m => {
            if (m.homeWinProb) return m;
            return { ...m, ...this.generateMatchIntelligence(m.homeTeam, m.awayTeam, m.competition) };
        });
    }
}

window.kellaPredictor = new KellaAIPredictor();
console.log("KELLA World Analytics Pro Loaded Successfully!");
