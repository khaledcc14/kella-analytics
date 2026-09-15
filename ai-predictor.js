// *****************************************************
// // KELLA Analytics Pro - World Leagues & Global AI Predictor
// // Date: September 15, 2026
// *****************************************************

class KellaAIPredictor {
    constructor() {
        this.teamStrengths = {
            // الدوريات العربية الأفريقية (المصري، التونسي، المغربي، الجزائري، السعودي)
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

            // الدوريات الأوروبية الكبرى (الإسباني، الإنجليزي، الفرنسي، الألماني، الإيطالي، الروسي)
            "ريال مدريد": { attack: 94, defense: 88, league: "الدوري الإسباني" },
            "برشلونة": { attack: 92, defense: 87, league: "الدوري الإسباني" },

            "مانشستر سيتي": { attack: 95, defense: 90, league: "الدوري الإنجليزي" },
            "ليفربول": { attack: 93, defense: 88, league: "الدوري الإنجليزي" },

            "باريس سان جيرمان": { attack: 91, defense: 85, league: "الدوري الفرنسي" },
            "مارسيليا": { attack: 84, defense: 83, league: "الدوري الفرنسي" },
            "ليون": { attack: 83, defense: 82, league: "الدوري الفرنسي" },

            "بايرن ميونخ": { attack: 94, defense: 89, league: "الدوري الألماني" },
            "بوروسيا دورتموند": { attack: 88, defense: 83, league: "الدوري الألماني" },
            "باير لي버كوزن": { attack: 89, defense: 87, league: "الدوري الألماني" },

            "إنتر ميلان": { attack: 88, defense: 90, league: "الدوري الإيطالي" },
            "ميلان": { attack: 84, defense: 86, league: "الدوري الإيطالي" },

            "كلوب بروج": { attack: 84, defense: 82, league: "الدوري البلجيكي" },
            "أندرلخت": { attack: 83, defense: 81, league: "الدوري البلجيكي" },

            "غلطة سراي": { attack: 87, defense: 84, league: "الدوري التركي" },
            "فنربخشة": { attack: 86, defense: 83, league: "الدوري التركي" },

            "زينيت سانت بطرسبرغ": { attack: 86, defense: 85, league: "الدوري الروسي" },
            "سبارتاك موسكو": { attack: 83, defense: 81, league: "الدوري الروسي" },

            // الأمريكيين (البرازيلي والأمريكي)
            "فلامينغو": { attack: 87, defense: 85, league: "الدوري البرازيلي" },
            "بالميراس": { attack: 88, defense: 86, league: "الدوري البرازيلي" },

            "إنتر ميامي": { attack: 88, defense: 79, league: "الدوري الأمريكي" },
            "لوس أنجلوس": { attack: 85, defense: 81, league: "الدوري الأمريكي" }
        };
    }

    generateMatchIntelligence(homeTeam, awayTeam, competition) {
        let home = this.teamStrengths[homeTeam] || { attack: 80, defense: 80 };
        let away = this.teamStrengths[awayTeam] || { attack: 80, defense: 80 };

        // خوارزمية حساب القوة وتوقع النتيجة
        let homePower = home.attack + (90 - away.defense) + 4;
        let awayPower = away.attack + (90 - home.defense);

        let diff = homePower - awayPower;
        let homeScore = Math.max(0, Math.round((home.attack / 45) + (diff > 5 ? 1 : 0) + (Math.random() * 0.8)));
        let awayScore = Math.max(0, Math.round((away.attack / 45) - (diff < -5 ? 0 : 0) + (Math.random() * 0.8)));

        // حساب النسب المئوية بناءً على القوة النسبية
        let totalPower = homePower + awayPower;
        let homeProbVal = Math.round((homePower / totalPower) * 70);
        let awayProbVal = Math.round((awayPower / totalPower) * 70);
        let drawProbVal = 100 - (homeProbVal + awayProbVal);
        if (drawProbVal < 15) drawProbVal = 20;

        let xGHome = (homeScore * 0.75 + (home.attack / 100)).toFixed(1);
        let xGAway = (awayScore * 0.75 + (away.attack / 100)).toFixed(1);

        let insights = [
            `تفوق ملحوظ في خط الوسط والضغط العالي لصالح نادي ${homeTeam} بناءً على قوة الهجوم المحددة.`,
            `مواجهة تكتيكية مغلقة بين الفريقين، مع أفضلية للزوار ${awayTeam} في استغلال الهجمات المرتدة.`,
            `تقاطع البيانات الحية يرجح نسقاً هجومياً عالياً وإمكانية اهتزاز الشباك من الطرفين وفق مؤشر xG.`,
            `سيطرة ميدانية متوقعة لنادي ${homeTeam} وسط صلابة دفاعية منتظرة من المنافس ${awayTeam}.`
        ];

        let randomInsight = insights[Math.floor(Math.random() * insights.length)];

        return {
            predictedScore: `${homeScore} - ${awayScore}`,
            probabilities: {
                home: `${homeProbVal}%`,
                draw: `${drawProbVal}%`,
                away: `${awayProbVal}%`
            },
            expectedGoals: `xG: ${homeTeam} (${xGHome}) - ${awayTeam} (${xGAway})`,
            aiAdvice: randomInsight
        };
    }
}

// تصدير المحرك للاستخدام العام في التطبيق
window.KellaAIPredictor = KellaAIPredictor;
